import { faqs } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";
import Accordion from "../ui/Accordion.jsx";

export default function Faq() {
  return (
    <Section id="faq" className="soft-band faq-section">
      <div className="faq-layout">
        <div className="faq-copy">
          <h2>Questions before you register</h2>
        </div>
        <Accordion items={faqs} />
      </div>
    </Section>
  );
}
