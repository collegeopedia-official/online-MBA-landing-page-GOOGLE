import { trustItems } from "../../data/landingPageData.js";
import LeadForm from "../ui/LeadForm.jsx";
import Button from "../ui/Button.jsx";
import { scrollToElement, trackEvent } from "../../utils/tracking.js";

export default function Hero() {
  function handleHeroCta() {
    trackEvent("hero_primary_cta_click");
    scrollToElement("hero-form");
  }

  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy" data-reveal>
          <h1>
            An Online <span>MBA</span>
            <br />
            for a Bigger You.
          </h1>
          <Button onClick={handleHeroCta}>Get Free Counselling</Button>
          <div className="trust-strip">
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label}>
                <Icon size={18} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-image-wrap" data-reveal>
          <div className="hero-metric hero-metric-top">
            <strong>2 Years</strong>
            <span>Online MBA Path</span>
          </div>
          <img src="/mba-professional.png" alt="Professional learner exploring an Online MBA" />
          <div className="hero-metric hero-metric-bottom">
            <strong>Free</strong>
            <span>Admission Counselling</span>
          </div>
        </div>

        <div className="hero-form-panel" data-reveal>
          <LeadForm
            id="hero-form"
            title="Get Free MBA Guidance"
            subtitle="Share your details and our admission counsellor will contact you."
          />
        </div>
      </div>
    </section>
  );
}
