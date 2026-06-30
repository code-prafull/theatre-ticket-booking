import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import toast from "react-hot-toast";

import QRCode from "qrcode";
import jsPDF from "jspdf";

const formatDate = (dateLike) => {
  if (!dateLike) return "";
  try {
    const d = new Date(dateLike);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "";
  }
};

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const qrText = useMemo(() => {
    if (!booking) return "";
    const movieTitle = booking?.show?.movie?.title || "Movie";
    const theatreName = booking?.show?.theatre?.name || "Theatre";
    return `BOOKING:${booking._id}|${movieTitle}|${theatreName}|SEATS:${booking.seats?.join(",")}`;
  }, [booking]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        
        // 🔥 DUMMY FLOW: Check if booking data is passed via location.state
        const locationState = window.history.state?.state || window.history.state;
        if (locationState?.booking) {
          setBooking(locationState.booking);
          setLoading(false);
          return;
        }

        // Fallback: Fetch from API for real bookings
        const { data } = await API.get(`/bookings/${id}`);
        const fetched = data?.data || data;
        setBooking(fetched);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load ticket.");
        navigate("/my-bookings", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  useEffect(() => {
    const genQr = async () => {
      if (!booking?._id) return;
      try {
        const dataUrl = await QRCode.toDataURL(qrText || booking._id, {
          errorCorrectionLevel: "M",
          margin: 1,
          width: 220,
        });
        setQrDataUrl(dataUrl);
      } catch {
        // QR render fail is non-fatal; ticket details still show.
        setQrDataUrl(null);
      }
    };
    genQr();
  }, [booking, qrText]);

  const downloadPdf = async () => {
    if (!booking) return;

    try {
      const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

      doc.setFontSize(16);
      doc.text("Movie Ticket", 40, 50);

      doc.setFontSize(10);
      doc.setTextColor(60);
      const movieTitle = booking?.show?.movie?.title || "-";
      const theatreName = booking?.show?.theatre?.name || "-";
      const showDate = formatDate(booking?.show?.showDate);
      const showTime = booking?.show?.showTime || "";
      const seats = booking?.seats?.join(", ") || "";

      const lines = [
        `Booking ID: ${booking._id}`,
        `Movie: ${movieTitle}`,
        `Theatre: ${theatreName}`,
        `Date: ${showDate}`,
        `Time: ${showTime}`,
        `Seats: ${seats}`,
        `Total: ₹${booking?.totalAmount ?? 0}`,
      ];

      doc.setFontSize(11);
      lines.forEach((line, idx) => {
        doc.text(line, 40, 75 + idx * 16);
      });

      // QR image
      if (qrDataUrl) {
        doc.addImage(qrDataUrl, "PNG", 440, 60, 120, 120);
      }

      doc.save(`Ticket-${booking._id}.pdf`);
      toast.success("Ticket PDF downloaded");
    } catch (_err) {
      toast.error("PDF generation failed");
    }
  };

  if (loading) return <Loader />;

  if (!booking) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-between bg-[#07070A] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Ticket not found.</p>
        </div>
      </div>
    );
  }

  const movieTitle = booking?.show?.movie?.title || "-";
  const theatreName = booking?.show?.theatre?.name || "-";
  const showDate = formatDate(booking?.show?.showDate);
  const showTime = booking?.show?.showTime || "";

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased">
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      <div className="w-full flex-1 pt-24 lg:pt-28 px-4 sm:px-6">
        <div className="w-full max-w-3xl mx-auto bg-[#111116]/90 border border-white/[0.05] p-6 sm:p-8 rounded-3xl shadow-2xl">
          <div className="border-b border-white/5 pb-4 mb-6 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black font-mono text-[#5B50E6] uppercase tracking-widest">
                Ticket Confirmation
              </span>
              <h2 className="text-xl font-black text-white tracking-tight mt-0.5">#{booking._id}</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/my-bookings")}
              className="text-xs font-black px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
            >
              Back
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-3 text-left">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider font-mono">
                  Movie
                </p>
                <p className="text-sm font-black text-white mt-1">{movieTitle}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider font-mono">
                  Theatre
                </p>
                <p className="text-sm font-black text-white mt-1">{theatreName}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider font-mono">
                  Date / Time
                </p>
                <p className="text-sm font-bold text-white mt-1">
                  {showDate} {showTime ? `• ${showTime}` : ""}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider font-mono">
                  Seats
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {booking.seats?.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-xl font-mono text-xs font-black text-[#5B50E6]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider font-mono">
                  Total Paid
                </p>
                <p className="text-sm font-black text-white mt-1">₹{booking.totalAmount ?? 0}</p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Ticket QR" className="w-52 h-52 object-contain" />
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center text-gray-400 text-xs font-bold">
                    QR loading...
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={downloadPdf}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-[#5B50E6]/20"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-[#07070A] border-t border-white/[0.05] flex items-center justify-around px-4">
        <Navbar />
      </div>
    </div>
  );
};

export default Ticket;

