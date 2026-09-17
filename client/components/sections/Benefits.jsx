import Section from "../common/Section.jsx";
import { benefits } from "../../data/landingPageData.js";

export default function Benefits() {
  return (
    <Section id="benefits" title="A flexible management degree path built around real life">
      <div className="benefits-bento">
        {benefits.map(({ icon: Icon, title, description }) => (
          <article className="feature-card" key={title}>
            <Icon size={26} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
