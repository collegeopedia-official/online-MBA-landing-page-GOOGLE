import { PhoneCall } from "lucide-react";
import Button from "../ui/Button.jsx";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import { getWhatsAppUrl } from "../../utils/contact.js";
import { scrollToElement, trackEvent } from "../../utils/tracking.js";

export default function Header() {
  function handleCta() {
    trackEvent("header_counsellor_click");
    scrollToElement("hero-form");
  }

  function handleWhatsAppClick() {
    trackEvent("header_whatsapp_click");
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="Collegepedia home">
          <img src="/collegepedia-logo.png" alt="Collegepedia" className="brand-logo" />
        </a>
        <div className="header-actions">
          <a
            className="header-whatsapp"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsAppClick}
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={21} />
          </a>
          <Button variant="secondary" onClick={handleCta} className="header-cta" icon={false}>
            <PhoneCall size={17} aria-hidden="true" />
            <span>Talk to Counsellor</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
