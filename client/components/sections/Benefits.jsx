import Section from "../common/Section.jsx";
import { benefits } from "../../data/landingPageData.js";

export default function Benefits() {
  return (
    <Section id="benefits" title="A flexible management degree path built around real life">
      <div className="benefits-bento">
        {benefits.map(({ icon: Icon, title, description }, index) => (
          <article className="feature-card" key={title}>
            <div className="benefit-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={24} aria-hidden="true" />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
