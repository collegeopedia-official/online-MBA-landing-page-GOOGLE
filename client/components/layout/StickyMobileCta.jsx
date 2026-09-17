import Button from "../ui/Button.jsx";
import { scrollToElement, trackEvent } from "../../utils/tracking.js";

export default function StickyMobileCta() {
  function handleClick() {
    trackEvent("sticky_mobile_cta_click");
    scrollToElement("hero-form");
  }

  return (
    <div className="sticky-mobile-cta">
      <span>Interested in Online MBA?</span>
      <Button onClick={handleClick} icon={false}>
        FILL THE FORM
      </Button>
    </div>
  );
}
