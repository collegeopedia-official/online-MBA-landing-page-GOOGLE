import { ArrowUpRight, BarChart3, GraduationCap, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { trustItems } from "../../data/landingPageData.js";
import LeadForm from "../ui/LeadForm.jsx";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-shell">
        <div className="hero-copy">
          <div className="hero-kicker">
            <GraduationCap size={20} aria-hidden="true" />
            <span>Your MBA Journey Starts Here</span>
          </div>

          <h1>
            Build a Bigger Future
            with an <span>Online MBA</span>
          </h1>

          <p className="hero-subtitle">Compare top universities, explore the right program and get expert guidance - all in one place.</p>

          

          <div className="hero-stats" aria-label="Online MBA guidance statistics">
            <div>
              <strong>
                <span>1Lakh</span>+
              </strong>
              <small>MBA Aspirants Guided</small>
            </div>
            <div>
              <strong>500+</strong>
              <small>Universities</small>
            </div>
            <div>
              <strong>95%</strong>
              <small>Student Satisfaction</small>
            </div>
          </div>
        </div>

        <div className="hero-image-wrap" aria-label="Online MBA professional">
          <div className="hero-image-shape" aria-hidden="true" />
          <img src="/hero-mba-woman.png" alt="Professional learner holding a laptop for Online MBA counselling" />
          <div className="hero-script" aria-hidden="true">
            <span>More</span>
            <span>Than a</span>
            <span>Degree</span>
          </div>
          <div className="hero-check" aria-hidden="true" />
          <div className="hero-career-card">
            <span>
              <BarChart3 size={24} aria-hidden="true" />
            </span>
            <div>
              <strong>Better Careers</strong>
              <small>Brighter Tomorrows</small>
            </div>
            <ArrowUpRight size={22} aria-hidden="true" />
          </div>
        </div>

        <div className="hero-form-panel">
          

          <LeadForm
            id="hero-form"
            title={
              <>
                Find the <span>Right MBA</span> for You
              </>
            }
            subtitle="Share a few details and we'll help you with the best options, completely free."
            includeEmail={false}
            buttonText="Get Free Counselling"
            variant="hero"
          />

          <div className="hero-form-trust">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>100% Free Guidance</span>
            <span>No Spam</span>
            <span>Confidential</span>
          </div>
        </div>

        <div className="hero-university-row" aria-label="Trusted by top universities">
          <span className="hero-university-title">Trusted by top universities</span>
          <strong>IIM Ahmedabad</strong>
          <strong>IIM Bangalore</strong>
          <strong>IIM Calcutta</strong>
          <strong>XLRI</strong>
          <strong>FMS</strong>
          <strong>ISB</strong>
          <span>and more...</span>
        </div>

        
      </div>
    </section>
  );
}
