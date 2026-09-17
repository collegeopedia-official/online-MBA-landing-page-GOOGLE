import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function Section({ id, title, children, className = "" }) {
  useScrollReveal();

  return (
    <section id={id} className={`section ${className}`} data-reveal>
      <div className="container">
        {title && (
          <div className="section-heading">
            <h2>{title}</h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
