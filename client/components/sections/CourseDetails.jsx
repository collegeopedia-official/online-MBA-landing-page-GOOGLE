import { detailIcons, courseDetails } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";
import Button from "../ui/Button.jsx";
import { scrollToElement, trackEvent } from "../../utils/tracking.js";

export default function CourseDetails() {
  return (
    <Section id="course" title="Know the essentials before you apply" className="soft-band course-overview">
      <div className="course-details-strip">
        {courseDetails.map((item, index) => {
          const Icon = detailIcons[index];
          return (
            <article className="detail-card" key={item.title}>
              <Icon size={24} aria-hidden="true" />
              <span>{item.title}</span>
              <strong>{item.value}</strong>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
      <div className="section-action">
        <Button
          onClick={() => {
            trackEvent("check_eligibility_click");
            scrollToElement("conversion-form");
          }}
        >
          CHECK ELIGIBILITY
        </Button>
      </div>
    </Section>
  );
}
