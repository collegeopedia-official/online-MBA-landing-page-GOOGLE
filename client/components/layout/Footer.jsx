import { Mail, Phone } from "lucide-react";
import { footerLinks } from "../../data/landingPageData.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a href="#top" className="brand footer-brand" aria-label="Collegepedia home">
            <img src="/collegepedia-logo.png" alt="Collegepedia" className="brand-logo" />
          </a>
          <p>
            Collegepedia offers counselling support for Online MBA admission decisions. Programme details,
            eligibility, fees, and recognition may vary by university and should be verified before enrolment.
          </p>
        </div>
        <address>
          <a href="tel:+919999999999">
            <Phone size={17} aria-hidden="true" /> +91 99999 99999
          </a>
          <a href="mailto:admissions@collegepedia.in">
            <Mail size={17} aria-hidden="true" /> admissions@collegepedia.in
          </a>
        </address>
        <nav aria-label="Footer links">
          {footerLinks.map((link) => (
            <a href="#top" key={link}>
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
