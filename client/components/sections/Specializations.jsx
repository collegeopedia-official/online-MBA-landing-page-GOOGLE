import { specializations } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";
import Button from "../ui/Button.jsx";
import { scrollToElement, trackEvent } from "../../utils/tracking.js";

export default function Specializations() {
  return (
    <Section id="specializations" title="Choose a direction that fits your next move" className="specializations-section">
      <div className="specialization-grid">
        {specializations.map(({ icon: Icon, title }) => (
          <article className="specialization-card" key={title}>
            <Icon size={25} aria-hidden="true" />
            <h3>{title}</h3>
          </article>
        ))}
      </div>
      <div className="section-action">
        <Button
          onClick={() => {
            trackEvent("specialization_counsellor_click");
            scrollToElement("hero-form");
          }}
        >
          TALK TO A COUNSELLOR
        </Button>
      </div>
    </Section>
  );
}
