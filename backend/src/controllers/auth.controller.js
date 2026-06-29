// File Path: controllers/auth.controller.js
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const jwt = require("jsonwebtoken");

// Helper logic to build synchronized JWT Token matrices parameters
const createJwtTokenInstance = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET || "CU_SECRET_MOCK_SALT_8821",
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

// 1. REGISTER NEW SECURED ACCOUNT CONTROLLER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, college, degree } = req.body;

    // Base inputs Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user records mapping
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password parameters safely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user inside collection documents parameters
    // 🔥 FIX: Saving dynamic contextual campus attributes directly from form payload body
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      college: college || "Shri Ram Group Jabalpur (SRIT)",
      degree: degree || "Computer Science Engineering"
    });

    // 🔥 FIX: Generating direct JWT response token straight during registration actions
    const token = createJwtTokenInstance(user);

    // Set secure cookie layer so your protect middleware passes user entry seamlessly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set true if running inside live deployment https records
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token, // Returning to frontend client states explicitly
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        degree: user.degree
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. AUTHORIZE ACCOUNT LOGIN GATEWAY CONTROLLER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user inside database cluster matching email keys
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare encrypted passwords strings parameters
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate authenticated user session jsonwebtoken payload token
    const token = createJwtTokenInstance(user);

    // Send cookie standard triggers
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college || "Shri Ram Group Jabalpur (SRIT)",
        degree: user.degree || "Computer Science Engineering"
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. GET PROFILE LIVE DATASETS MODULE FROM CURRENT TOKEN HANDSHAKE
// File Path: controllers/auth.controller.js
// getProfile function check kijiye exact is syntax me hona chahiye:

const getProfile = async (req, res) => {
  try {
    // req.user direct aapke protect middleware database match array document se load ho raha hai
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User document not found inside active database records context",
      });
    }

    // Returning uniform signature response matching frontend parser triggers
    return res.status(200).json({
      success: true,
      data: req.user, 
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. CLEAR SESSION REMOVE TOKEN CONTROLLER
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// 5. Wishlist: get all saved movies for current user
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user.wishlist || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 6. Wishlist: toggle movie in wishlist
const toggleWishlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "movieId is required",
      });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const user = await User.findById(req.user._id);
    const existsIndex = user.wishlist.findIndex(
      (id) => id.toString() === movieId
    );

    let action = "added";
    if (existsIndex >= 0) {
      user.wishlist.splice(existsIndex, 1);
      action = "removed";
    } else {
      user.wishlist.push(movieId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Movie ${action} to wishlist`,
      data: user.wishlist,
      action,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  getWishlist,
  toggleWishlist,
};