import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ClipboardCheck, GraduationCap, Users, X } from "lucide-react";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ChatBot from "./components/layout/ChatBot.jsx";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp.jsx";
import StickyApplyBar from "./components/layout/StickyApplyBar.jsx";
import Hero from "./components/sections/Hero.jsx";
import Benefits from "./components/sections/Benefits.jsx";
import CourseDetails from "./components/sections/CourseDetails.jsx";
import ProgramCertificate from "./components/sections/ProgramCertificate.jsx";
import Specializations from "./components/sections/Specializations.jsx";
import Curriculum from "./components/sections/Curriculum.jsx";
import CareerOpportunities from "./components/sections/CareerOpportunities.jsx";
import HiringPartners from "./components/sections/HiringPartners.jsx";
import Testimonials from "./components/sections/Testimonials.jsx";
import Audience from "./components/sections/Audience.jsx";
import Conversion from "./components/sections/Conversion.jsx";
import AdmissionProcess from "./components/sections/AdmissionProcess.jsx";
import Faq from "./components/sections/Faq.jsx";
import LeadForm from "./components/ui/LeadForm.jsx";

const LEAD_POPUP_SUBMITTED_KEY = "mbaLeadPopupSubmitted";
const POPUP_REPEAT_LIMIT = 2;
const POPUP_INITIAL_DELAY = 12000;
const POPUP_REPEAT_DELAY = 25000;
const STATIC_FORM_IDS = ["hero-form", "conversion-form"];
const popupBenefits = [
  { label: "Personalized Guidance", icon: GraduationCap },
  { label: "Expert Counsellors", icon: Users },
  { label: "100% Free Counselling", icon: ClipboardCheck }
];

export default function App() {
  const popupRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [closeCount, setCloseCount] = useState(0);
  const [activeStaticFormId, setActiveStaticFormId] = useState(null);
  const [visibleStaticForms, setVisibleStaticForms] = useState({});
  const [hasSubmittedPopup, setHasSubmittedPopup] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(LEAD_POPUP_SUBMITTED_KEY) === "true";
  });
  const shouldPausePopupForStaticForm = Boolean(activeStaticFormId && visibleStaticForms[activeStaticFormId] !== false);

  useEffect(() => {
    if (!hasSubmittedPopup && !shouldPausePopupForStaticForm) {
      const popupTimer = window.setTimeout(() => {
        setIsPopupOpen(true);
      }, POPUP_INITIAL_DELAY);

      return () => window.clearTimeout(popupTimer);
    }

    return undefined;
  }, [hasSubmittedPopup, shouldPausePopupForStaticForm]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    function updateStaticFormVisibility(formId, isVisible) {
      setVisibleStaticForms((current) => {
        if (current[formId] === isVisible) return current;
        return { ...current, [formId]: isVisible };
      });
    }

    if (!("IntersectionObserver" in window)) {
      STATIC_FORM_IDS.forEach((formId) => updateStaticFormVisibility(formId, true));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          updateStaticFormVisibility(entry.target.id, entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    STATIC_FORM_IDS.forEach((formId) => {
      const form = document.getElementById(formId);
      if (form) {
        observer.observe(form);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPopupOpen || isSuccessPopupOpen) {
      document.body.classList.add("lead-popup-open");
      return () => document.body.classList.remove("lead-popup-open");
    }

    document.body.classList.remove("lead-popup-open");
  }, [isPopupOpen, isSuccessPopupOpen]);

  useEffect(() => {
    if (hasSubmittedPopup || shouldPausePopupForStaticForm || isPopupOpen || closeCount === 0 || closeCount > POPUP_REPEAT_LIMIT) {
      return undefined;
    }

    const popupTimer = window.setTimeout(() => {
      setIsPopupOpen(true);
    }, POPUP_REPEAT_DELAY);

    return () => window.clearTimeout(popupTimer);
  }, [closeCount, hasSubmittedPopup, isPopupOpen, shouldPausePopupForStaticForm]);

  useEffect(() => {
    if (!isPopupOpen) return undefined;

    function handlePopupKeyDown(event) {
      if (event.key === "Escape") {
        handlePopupClose();
        return;
      }

      if (event.key !== "Tab" || !popupRef.current) {
        return;
      }

      const focusableElements = popupRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    const focusTimer = window.setTimeout(() => {
      popupRef.current?.querySelector("input, select, button")?.focus();
    }, 0);

    window.addEventListener("keydown", handlePopupKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handlePopupKeyDown);
    };
  }, [isPopupOpen]);

  function handlePopupClose() {
    setIsPopupOpen(false);
    setCloseCount((current) => current + 1);
  }

  function handleCounsellingPopupOpen() {
    if (hasSubmittedPopup) return;
    setIsPopupOpen(true);
  }

  function handleStaticFormActive(formId) {
    setActiveStaticFormId(formId);
  }

  function handleStaticFormInactive(formId) {
    setActiveStaticFormId((currentFormId) => (currentFormId === formId ? null : currentFormId));
  }

  function handleLeadFormSubmitSuccess() {
    localStorage.setItem(LEAD_POPUP_SUBMITTED_KEY, "true");
    setHasSubmittedPopup(true);
    setActiveStaticFormId(null);
    setIsPopupOpen(false);
    setIsSuccessPopupOpen(true);
  }

  function handleSuccessPopupClose() {
    setIsSuccessPopupOpen(false);
  }

  return (
    <>
      <Header />
      <main>
        <Hero
          onStaticFormActive={handleStaticFormActive}
          onStaticFormInactive={handleStaticFormInactive}
          onStaticFormSubmitSuccess={handleLeadFormSubmitSuccess}
        />
        <Benefits />
        <CourseDetails />
        <Specializations />
        <Curriculum />
        <CareerOpportunities onCounsellingClick={handleCounsellingPopupOpen} />
        <HiringPartners />
        <Testimonials />
        <Conversion
          onStaticFormActive={handleStaticFormActive}
          onStaticFormInactive={handleStaticFormInactive}
          onStaticFormSubmitSuccess={handleLeadFormSubmitSuccess}
        />
        <AdmissionProcess />
        <Faq />
      </main>
      <Footer />
      <StickyApplyBar onApply={handleCounsellingPopupOpen} isModalOpen={isPopupOpen} />
      <ChatBot />
      {isSuccessPopupOpen && (
        <div className="submit-success-popup" role="dialog" aria-modal="true" aria-label="Form submission confirmation">
          <div className="submit-success-panel">
            <button className="submit-success-close" type="button" onClick={handleSuccessPopupClose} aria-label="Close confirmation">
              <X size={22} aria-hidden="true" />
            </button>
            <span className="submit-success-icon" aria-hidden="true">
              <CheckCircle2 size={36} />
            </span>
            <h2>Your query has been submitted</h2>
            <p>Thank you for sharing your details. Our admission counsellor will contact you as soon as possible.</p>
            <button className="submit-success-action" type="button" onClick={handleSuccessPopupClose}>
              Okay
            </button>
          </div>
        </div>
      )}
      {isPopupOpen && !hasSubmittedPopup && (
        <div className="lead-popup" role="dialog" aria-modal="true" aria-label="MBA counselling form">
          <div className="lead-popup-panel" ref={popupRef}>
            <aside className="lead-popup-promo" aria-hidden="true">
              <div className="lead-popup-promo-content">
                <h2>
                  Get Free
                  <span>MBA</span>
                  Guidance
                </h2>
                <p>Share your details and our admission counsellor will contact you.</p>
                <div className="popup-benefits">
                  {popupBenefits.map(({ label, icon: Icon }) => (
                    <div className="popup-benefit" key={label}>
                      <span>
                        <Icon size={23} />
                      </span>
                      <strong>{label}</strong>
                    </div>
                  ))}
                </div>
                <blockquote>
                  Take the next step
                  <br />
                  towards a brighter future
                </blockquote>
              </div>
              <div className="lead-popup-campus">
                <span>BETTER PEOPLE</span>
                <span>BRIGHTER TOMORROW</span>
              </div>
            </aside>
            <section className="lead-popup-form-panel">
              <button className="lead-popup-close" type="button" onClick={handlePopupClose} aria-label="Close">
                <X size={24} aria-hidden="true" />
              </button>
              <LeadForm
                id="lead-popup-form"
                title="Get Free MBA Guidance"
                subtitle="Share your details and our admission counsellor will contact you."
                variant="popup"
                onSubmitSuccess={handleLeadFormSubmitSuccess}
              />
            </section>
          </div>
        </div>
      )}
    </>
  );
}
