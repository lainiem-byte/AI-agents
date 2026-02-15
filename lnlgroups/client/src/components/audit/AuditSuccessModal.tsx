import { useEffect, useCallback, useState } from "react";

interface AuditSuccessModalProps {
  industry?: string;
  onClose: () => void;
}

const industryLabels: Record<string, string> = {
  medspa: "Med Spa",
  realtor: "Real Estate",
  law: "Law",
  "home-services": "Home Services",
};

export default function AuditSuccessModal({ industry, onClose }: AuditSuccessModalProps) {
  const [fading, setFading] = useState(false);

  const handleClose = useCallback(() => {
    setFading(true);
    setTimeout(onClose, 500);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(handleClose, 15000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  const label = industryLabels[industry || ""] || "your industry";

  return (
    <div
      className={`fixed inset-0 bg-black/95 flex justify-center items-center z-[9999] transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-[#0a0a0a] border border-[#333] p-10 max-w-[500px] relative mx-4">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />

        <h2 className="text-[#D4AF37] text-xl tracking-[2px] font-display font-bold mb-4">
          AUDIT DATA RECEIVED
        </h2>
        <p className="text-gray-300 mb-8">
          Our architects are now cross-referencing your content against{" "}
          <strong className="text-white">{label}</strong> industry benchmarks.
        </p>

        <div className="space-y-5">
          <div className="flex gap-4 text-left">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-1.5 shrink-0" />
            <p className="text-gray-300">
              <strong className="text-white">Step 1: Intake Analysis</strong>
              <br />
              Reviewing your tech stack for immediate "leakage."
            </p>
          </div>
          <div className="flex gap-4 text-left">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-1.5 shrink-0" />
            <p className="text-gray-300">
              <strong className="text-white">Step 2: Auditor Assignment</strong>
              <br />
              Preparing your custom 30-minute growth roadmap.
            </p>
          </div>
          <div className="flex gap-4 text-left">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-1.5 shrink-0" />
            <p className="text-gray-300">
              <strong className="text-white">Step 3: Priority Connection</strong>
              <br />
              Check your inbox in &lt; 10 mins for your booking link.
            </p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="w-full bg-[#D4AF37] text-black font-bold py-4 mt-8 cursor-pointer hover:bg-[#c9a432] transition-colors tracking-wider"
        >
          ACKNOWLEDGED
        </button>
      </div>
    </div>
  );
}
