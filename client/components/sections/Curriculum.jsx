import { curriculum } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";
import Accordion from "../ui/Accordion.jsx";

export default function Curriculum() {
  return (
    <Section id="curriculum" title="A four-semester sample structure" className="soft-band curriculum-section">
      <div className="narrow">
        <Accordion items={curriculum} />
      </div>
    </Section>
  );
}
