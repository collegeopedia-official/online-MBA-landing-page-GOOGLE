import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Cog,
  HeartPulse,
  Landmark,
  Laptop,
  Lock,
  Monitor,
  MoreHorizontal,
  PieChart,
  ShoppingBag,
  ShoppingCart,
  Target,
  Users
} from "lucide-react";
import Button from "../ui/Button.jsx";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

const careers = [
  {
    number: "01",
    title: "Marketing Manager",
    description: "Build brands, lead campaigns and drive business growth.",
    tags: ["Marketing", "Brand Strategy", "Growth"],
    icon: BarChart3
  },
  {
    number: "02",
    title: "Financial Analyst",
    description: "Analyse financial performance and support strategic decisions.",
    tags: ["Finance", "Analytics", "Investment"],
    icon: PieChart
  },
  {
    number: "03",
    title: "HR Manager",
    description: "Build high-performing teams and manage talent strategy.",
    tags: ["Human Resources", "Leadership", "Talent"],
    icon: Users
  },
  {
    number: "04",
    title: "Operations Manager",
    description: "Improve processes, manage supply chains and ensure business efficiency.",
    tags: ["Operations", "Process Improvement", "Strategy"],
    icon: Cog
  },
  {
    number: "05",
    title: "Product Manager",
    description: "Connect technology, customers and business to build impactful products.",
    tags: ["Product", "Technology", "User Experience"],
    icon: Laptop
  },
  {
    number: "06",
    title: "Business Consultant",
    description: "Help organisations solve complex problems and drive transformation.",
    tags: ["Consulting", "Strategy", "Business Growth"],
    icon: Target
  }
];

const industries = [
  { label: "Banking & Finance", icon: Landmark },
  { label: "IT & Technology", icon: Monitor },
  { label: "Consulting", icon: BarChart3 },
  { label: "FMCG", icon: ShoppingBag },
  { label: "E-commerce", icon: ShoppingCart },
  { label: "Healthcare", icon: HeartPulse },
  { label: "and more", icon: MoreHorizontal }
];

export default function CareerOpportunities({ onCounsellingClick }) {
  useScrollReveal();

  return (
    <section className="career-section" data-reveal>
      <div className="container career-container">
        <header className="career-header">
          <h2>
            Career Opportunities After an <span>MBA</span>
          </h2>
          <div className="career-note" aria-hidden="true">
            <span>
              Build a
              <br />
              Future You&apos;ll
              <br />
              Be Proud Of
            </span>
          </div>
        </header>

        <div className="career-grid" aria-label="Career opportunities after an MBA">
          {careers.map(({ number, title, description, tags, icon: Icon }) => (
            <article className="career-card" key={number}>
              <div className="career-card-top">
                <span className="career-icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="career-number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="career-card-footer">
                <div className="career-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="career-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="career-cta">
          <div>
            <h3>
              Get personalised <span>MBA &amp; career</span> guidance from our counsellors.
            </h3>
          </div>
          <div className="career-cta-action">
            <Button onClick={onCounsellingClick} className="career-cta-button">
              GET FREE COUNSELLING
            </Button>
            <p>
              <Lock size={15} aria-hidden="true" />
              <span>Your information is secure. No spam.</span>
            </p>
          </div>
        </div>

        <div className="industry-strip">
          <div className="industry-heading">
            <span>Industries Hiring MBA Graduates</span>
          </div>
          <div className="industry-row" aria-label="Industries hiring MBA graduates">
            {industries.map(({ label, icon: Icon }) => (
              <div className="industry-item" key={label}>
                <Icon size={22} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
