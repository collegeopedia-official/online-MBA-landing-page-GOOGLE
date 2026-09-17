import { useState } from "react";
import { BookOpenCheck, ChevronDown, GraduationCap } from "lucide-react";
import { curriculum } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";

const semesterSubtitles = ["Build the Fundamentals", "Expand Your Knowledge", "Specialize and Apply", "Lead with Confidence"];

export default function Curriculum() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="curriculum" title="A four-semester sample structure" className="soft-band curriculum-section">
      <div className="curriculum-showcase">
        {curriculum.map((semester, index) => {
          const isOpen = openIndex === index;

          return (
            <article className={`semester-card ${isOpen ? "open" : ""}`} key={semester.title}>
              <button className="semester-trigger" type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                <span className="semester-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="semester-title">
                  <strong>{semester.title}</strong>
                  <small>{semesterSubtitles[index]}</small>
                </span>
                <span className="semester-toggle" aria-hidden="true">
                  <ChevronDown size={20} />
                </span>
              </button>

              {isOpen && (
                <div className="semester-content">
                  <ul>
                    {semester.content.map((subject) => (
                      <li key={subject}>{subject}</li>
                    ))}
                  </ul>

                  <div className="semester-visual" aria-hidden="true">
                    <div>
                      <span>Strong</span>
                      <span>Foundations</span>
                      <span>Brighter Futures</span>
                    </div>
                    <BookOpenCheck size={34} />
                  </div>
                </div>
              )}
            </article>
          );
        })}

        <div className="curriculum-summary">
          <span className="curriculum-summary-icon">
            <GraduationCap size={28} aria-hidden="true" />
          </span>
          <strong>A Curriculum Designed for Real-World Success</strong>
          <div>
            <b>100+</b>
            <small>Electives & Specializations</small>
          </div>
          <div>
            <b>Industry-Aligned</b>
            <small>Updated Regularly</small>
          </div>
          <div>
            <b>Holistic Growth</b>
            <small>Beyond Classroom Learning</small>
          </div>
        </div>
      </div>
    </Section>
  );
}
