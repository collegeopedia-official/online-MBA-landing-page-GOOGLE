import { useRef } from "react";
import { ArrowLeft, ArrowRight, Play, Star } from "lucide-react";
import { testimonials } from "../../data/landingPageData.js";
import Section from "../common/Section.jsx";

export default function Testimonials() {
  const scrollerRef = useRef(null);

  function scrollTestimonials(direction) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.min(520, scroller.clientWidth),
      behavior: "smooth"
    });
  }

  return (
    <Section id="testimonials" title="Student Testimonials" className="testimonials-section">
      <div className="testimonial-carousel-wrap">
        <button type="button" className="testimonial-nav testimonial-nav-prev" onClick={() => scrollTestimonials(-1)} aria-label="Previous testimonial">
          <ArrowLeft size={22} aria-hidden="true" />
        </button>

        <div className="testimonial-carousel" ref={scrollerRef}>
          {testimonials.map(({ name, role, avatar, type, media, quote, action }) => (
            <article className="testimonial-card" key={name}>
              <header className="testimonial-card-header">
                <img src={avatar} alt="" loading="lazy" />
                <div>
                  <h3>{name}</h3>
                  <p>{role}</p>
                  <div className="testimonial-stars" aria-label="5 star rating">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star key={item} size={14} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </header>

              {type === "video" ? (
                <div className="testimonial-video">
                  <img src={media} alt="" loading="lazy" />
                  <span aria-hidden="true">
                    <Play size={22} fill="currentColor" />
                  </span>
                </div>
              ) : (
                <p className="testimonial-copy">{quote}</p>
              )}

              <button type="button" className="testimonial-action">
                {action}
              </button>
            </article>
          ))}
        </div>

        <button type="button" className="testimonial-nav testimonial-nav-next" onClick={() => scrollTestimonials(1)} aria-label="Next testimonial">
          <ArrowRight size={22} aria-hidden="true" />
        </button>
      </div>
    </Section>
  );
}
