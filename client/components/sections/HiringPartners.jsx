import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { hiringPartners } from "../../data/landingPageData.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function HiringPartners() {
  const scrollerRef = useRef(null);
  useScrollReveal();

  function scrollPartners(direction) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.min(620, scroller.clientWidth),
      behavior: "smooth"
    });
  }

  return (
    <section className="hiring-section" data-reveal>
      <div className="container">
        <div className="hiring-header">
          <div className="section-heading hiring-heading">
            <h2>Our Top Recruiters</h2>
          </div>
          <div className="hiring-controls" aria-label="Hiring partners carousel controls">
            <button type="button" onClick={() => scrollPartners(-1)} aria-label="Previous hiring partners">
              <ArrowLeft size={23} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollPartners(1)} aria-label="Next hiring partners">
              <ArrowRight size={23} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hiring-grid" ref={scrollerRef} aria-label="Top recruiters and hiring partners">
          {hiringPartners.map(({ name, logo }) => (
            <article className="hiring-logo-card" key={name}>
              <img
                src={logo}
                alt={`${name} logo`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.hidden = true;
                  event.currentTarget.nextElementSibling.hidden = false;
                }}
              />
              <span hidden>{name}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
