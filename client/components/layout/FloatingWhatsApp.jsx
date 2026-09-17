import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import { getWhatsAppUrl } from "../../utils/contact.js";
import { trackEvent } from "../../utils/tracking.js";

export default function FloatingWhatsApp() {
  function handleClick() {
    trackEvent("floating_whatsapp_click");
  }

  return (
    <a
      className="floating-whatsapp"
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={27} />
    </a>
  );
}
