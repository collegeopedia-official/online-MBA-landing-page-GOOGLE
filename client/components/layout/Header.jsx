import { PhoneCall } from "lucide-react";
import WhatsAppIcon from "../ui/WhatsAppIcon.jsx";
import { getPhoneUrl, getWhatsAppUrl, PHONE_DISPLAY } from "../../utils/contact.js";
import { trackEvent } from "../../utils/tracking.js";

export default function Header() {
  function handleCta() {
    trackEvent("header_counsellor_click");
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
          <a className="btn btn-secondary header-cta" href={getPhoneUrl()} onClick={handleCta} aria-label={`Call ${PHONE_DISPLAY}`}>
            <PhoneCall size={17} aria-hidden="true" />
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
