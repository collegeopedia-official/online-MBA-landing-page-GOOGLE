import { ShieldCheck } from "lucide-react";
import LeadForm from "../ui/LeadForm.jsx";

export default function Conversion({ onStaticFormActive, onStaticFormInactive, onStaticFormSubmitSuccess }) {
  return (
    <section className="conversion-section" data-reveal>
      <div className="container conversion-grid">
        <div className="conversion-copy">
          <h2>Take the First Step Toward Your MBA</h2>
          <div className="conversion-points" aria-label="Counselling includes">
            <span>Eligibility check</span>
            <span>Specialization fit</span>
            <span>Fee guidance</span>
          </div>
          <div className="conversion-flow" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="conversion-form-panel">
          <LeadForm
            id="conversion-form"
            title={
              <>
                Request <span>Personalised</span> Counselling
              </>
            }
            subtitle="Share a few details and we'll help you with the best options, completely free."
            includeEmail={false}
            buttonText="Request Counselling"
            variant="hero"
            onFormActive={onStaticFormActive}
            onFormInactive={onStaticFormInactive}
            onSubmitSuccess={onStaticFormSubmitSuccess}
          />
          <div className="hero-form-trust conversion-form-trust">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>100% Free Guidance</span>
            <span>No Spam</span>
            <span>Confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
}
