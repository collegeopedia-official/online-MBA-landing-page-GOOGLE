import LeadForm from "../ui/LeadForm.jsx";

export default function Conversion() {
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
            title="Request Personalised Counselling"
            subtitle="Tell us a little more so we can guide you better."
            includeExperience
            buttonText="REQUEST COUNSELLING"
          />
        </div>
      </div>
    </section>
  );
}
