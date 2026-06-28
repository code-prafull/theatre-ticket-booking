const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

router.post("/", protect, admin, createMovie);
router.put("/:id", protect, admin, updateMovie);
router.delete("/:id", protect, admin, deleteMovie);