import { useState } from "react";
import { BadgeCheck, GraduationCap, RotateCw, ShieldCheck } from "lucide-react";
import certificateFront from "../../certificate/front.jpeg";
import certificateBack from "../../certificate/back.jpeg";

const certificateHighlights = [
  { icon: GraduationCap, label: "Recognised online degree format" },
  { icon: BadgeCheck, label: "Sample certificate preview" },
  { icon: ShieldCheck, label: "Guidance before you apply" }
];

export default function ProgramCertificate() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="section certificate-section" id="certificate">
      <div className="container certificate-layout">
        <div className="certificate-copy">
          <span className="eyebrow">Program Certificate</span>
          <h2>Preview the certificate before you choose your MBA path</h2>
          <p>
            Get clarity on the programme outcome, sample certificate format, and key academic documents before you take the next step.
          </p>

          {/* <div className="certificate-highlights">
            {certificateHighlights.map(({ icon: Icon, label }) => (
              <span key={label}>
                <Icon size={18} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div> */}
        </div>

        <button
          type="button"
          className={`certificate-flip ${isFlipped ? "is-flipped" : ""}`}
          onClick={() => setIsFlipped((current) => !current)}
          aria-label={`Show ${isFlipped ? "front" : "back"} side of sample certificate`}
        >
          {/* <span className="certificate-flip-hint">
            <RotateCw size={16} aria-hidden="true" />
            Click to flip
          </span> */}
          <span className="certificate-card" aria-hidden="true">
            <span className="certificate-face certificate-front">
              <img src={certificateFront} alt="" />
            </span>
            <span className="certificate-face certificate-back">
              <img src={certificateBack} alt="" />
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
