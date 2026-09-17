import { audience } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";

export default function Audience() {
  return (
    <Section id="audience" title="Built for people who need business depth without campus disruption" className="audience-section">
      <div className="audience-layout">
        {audience.map(({ icon: Icon, title, description }) => (
          <article className="feature-card" key={title}>
            <Icon size={26} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <p className="highlight-note">
        If you're unsure whether an Online MBA fits your career goals, speak with an admission counsellor before
        applying.
      </p>
    </Section>
  );
}
