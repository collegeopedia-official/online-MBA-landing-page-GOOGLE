import { process } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";

export default function AdmissionProcess() {
  return (
    <Section id="process" title="A simple path from enquiry to enrolment" className="process-section">
      <div className="process-timeline">
        {process.map((step, index) => (
          <article className="process-card" key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
