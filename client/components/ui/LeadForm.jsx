import { useState } from "react";
import { BookOpen, GraduationCap, Lock, Mail, Phone, User } from "lucide-react";
import Button from "./Button.jsx";
import { trackEvent } from "../../utils/tracking.js";

const initialFields = {
  name: "",
  phone: "",
  email: "",
  qualification: "",
  specialization: "",
  experience: ""
};

const qualifications = ["Graduate", "Post Graduate", "Final Year Student", "Working Professional"];
const specializations = ["Marketing", "Finance", "HR", "Operations", "Business Analytics", "Not sure yet"];
const experienceOptions = ["0-1 years", "2-4 years", "5-8 years", "8+ years"];

function validate(values, includeExperience, includeEmail) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Full name is required.";
  if (!/^[6-9]\d{9}$/.test(values.phone.trim())) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (includeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.qualification) errors.qualification = "Select your highest qualification.";
  if (!values.specialization) errors.specialization = "Select a preferred specialization.";
  if (includeExperience && !values.experience) errors.experience = "Select your work experience.";
  return errors;
}

export default function LeadForm({
  id,
  title,
  subtitle,
  includeExperience = false,
  includeEmail = true,
  buttonText = "GET FREE COUNSELLING",
  variant = "default",
  onSubmitSuccess
}) {
  const [values, setValues] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const isPopup = variant === "popup";
  const hasIconFields = isPopup || variant === "hero";

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSuccess(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values, includeExperience, includeEmail);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      trackEvent("lead_form_submit", { formId: id, specialization: values.specialization });
      setSuccess(true);
      setValues(initialFields);
      onSubmitSuccess?.();
    }
  }

  function renderTextField({ name, label, type = "text", icon: Icon, ...inputProps }) {
    return (
      <label>
        <span>{label}</span>
        {hasIconFields ? (
          <div className={`${isPopup ? "popup" : "hero"}-field-control`}>
            <span className={`${isPopup ? "popup" : "hero"}-field-icon`} aria-hidden="true">
              <Icon size={21} />
            </span>
            <input name={name} value={values[name]} onChange={updateField} type={type} {...inputProps} />
          </div>
        ) : (
          <input name={name} value={values[name]} onChange={updateField} type={type} {...inputProps} />
        )}
        {errors[name] && <small>{errors[name]}</small>}
      </label>
    );
  }

  function renderSelectField({ name, label, icon: Icon, options, placeholder }) {
    return (
      <label>
        <span>{label}</span>
        {hasIconFields ? (
          <div className={`${isPopup ? "popup" : "hero"}-field-control`}>
            <span className={`${isPopup ? "popup" : "hero"}-field-icon`} aria-hidden="true">
              <Icon size={21} />
            </span>
            <select name={name} value={values[name]} onChange={updateField}>
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <select name={name} value={values[name]} onChange={updateField}>
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {errors[name] && <small>{errors[name]}</small>}
      </label>
    );
  }

  return (
    <form id={id} className={`lead-form ${isPopup ? "lead-form-popup" : ""} ${variant === "hero" ? "lead-form-hero" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      {renderTextField({ name: "name", label: "Full Name", icon: User, placeholder: "Enter your full name", autoComplete: "name" })}

      {renderTextField({
        name: "phone",
        label: "Mobile Number",
        icon: Phone,
        placeholder: "Enter your mobile number",
        inputMode: "numeric",
        autoComplete: "tel",
        maxLength: "10"
      })}

      {includeEmail &&
        renderTextField({
          name: "email",
          label: "Email Address",
          icon: Mail,
          placeholder: "Enter your email address",
          type: "email",
          autoComplete: "email"
        })}

      {renderSelectField({
        name: "qualification",
        label: "Highest Qualification",
        icon: GraduationCap,
        options: qualifications,
        placeholder: "Select qualification"
      })}

      {renderSelectField({
        name: "specialization",
        label: "Preferred Specialization",
        icon: BookOpen,
        options: specializations,
        placeholder: "Select specialization"
      })}

      {includeExperience && (
        <label>
          <span>Work Experience</span>
          <select name="experience" value={values.experience} onChange={updateField}>
            <option value="">Select experience</option>
            {experienceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.experience && <small>{errors.experience}</small>}
        </label>
      )}

      <Button type="submit" className="form-submit">
        {buttonText}
      </Button>

      {success && <p className="success-message">Thank you. Our admission counsellor will contact you shortly.</p>}
      <p className="form-trust">
        {isPopup && <Lock size={16} aria-hidden="true" />}
        <span>Your information is secure. No spam.</span>
      </p>
    </form>
  );
}
