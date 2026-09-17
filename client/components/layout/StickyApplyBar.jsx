import { useEffect, useState } from "react";
import { ArrowRight, GraduationCap, Hourglass, ShieldCheck, Users, X } from "lucide-react";
import { trackEvent } from "../../utils/tracking.js";

const DISMISS_KEY = "mbaStickyApplyDismissed";

export default function StickyApplyBar({ onApply, isModalOpen = false }) {
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const shouldShow = window.scrollY >= Math.min(360, window.innerHeight * 0.35);

      setHasReachedThreshold((current) => (current === shouldShow ? current : shouldShow));
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");

    if (!footer) {
      return undefined;
    }

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    footerObserver.observe(footer);

    return () => footerObserver.disconnect();
  }, []);

  function handleDismiss() {
    trackEvent("sticky_apply_dismiss");
    sessionStorage.removeItem(DISMISS_KEY);
    setIsDismissed(true);
  }

  function handleApply() {
    trackEvent("sticky_apply_click");
    onApply();
  }

  if (!hasReachedThreshold || isDismissed || isModalOpen || isFooterVisible) {
    return null;
  }

  return (
    <aside className="sticky-apply-bar" aria-label="Apply now">
      <div className="sticky-apply-primary">
        <span className="sticky-apply-icon">
          <Hourglass size={24} aria-hidden="true" />
        </span>
        <div>
          <strong>Apply in 2 mins</strong>
          <span>2026 Intake Filling Fast</span>
        </div>
      </div>

      <div className="sticky-apply-separator" aria-hidden="true" />

      <div className="sticky-apply-benefits" aria-label="Application benefits">
        <div>
          <GraduationCap size={23} aria-hidden="true" />
          <span>
            <strong>Expert Guidance</strong>
            <small>From Admission Experts</small>
          </span>
        </div>
        <div>
          <ShieldCheck size={23} aria-hidden="true" />
          <span>
            <strong>100% Free Support</strong>
            <small>No Hidden Charges</small>
          </span>
        </div>
        <div>
          <Users size={23} aria-hidden="true" />
          <span>
            <strong>Trusted by Students</strong>
            <small>Across India</small>
          </span>
        </div>
      </div>

      <button type="button" className="sticky-apply-button" onClick={handleApply}>
        <span>Apply Now</span>
        <ArrowRight size={22} aria-hidden="true" />
      </button>

      <button type="button" className="sticky-apply-close" onClick={handleDismiss} aria-label="Dismiss application banner">
        <X size={19} aria-hidden="true" />
      </button>
    </aside>
  );
}
