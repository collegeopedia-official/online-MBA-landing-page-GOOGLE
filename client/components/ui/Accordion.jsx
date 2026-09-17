import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article className={`accordion-item ${isOpen ? "open" : ""}`} key={item.title}>
            <button
              className="accordion-trigger"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.title}</span>
              <ChevronDown size={20} aria-hidden="true" />
            </button>
            <div className="accordion-panel" hidden={!isOpen}>
              {Array.isArray(item.content) ? (
                <ul>
                  {item.content.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.content}</p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
