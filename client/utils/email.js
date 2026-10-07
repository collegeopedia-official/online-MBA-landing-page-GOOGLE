import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ADMIN_EMAIL = "admincollegeopedia@gmail.com";

export function isEmailJsConfigured() {
  return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

export async function sendLeadEmail(values, formId) {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS environment variables are missing.");
  }

  const leadDetails = [
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Qualification: ${values.qualification}`,
    `Specialization: ${values.specialization}`,
    `Experience: ${values.experience || "Not provided"}`,
    `Form: ${formId}`
  ].join("\n");

  const templateParams = {
    form_id: formId,
    to_name: "Collegeopedia Admin",
    to_email: ADMIN_EMAIL,
    admin_email: ADMIN_EMAIL,
    recipient_email: ADMIN_EMAIL,
    destination_email: ADMIN_EMAIL,
    subject: "New MBA counselling form submission",
    name: values.name,
    user_name: values.name,
    phone: values.phone,
    user_phone: values.phone,
    email: values.email,
    user_email: values.email,
    reply_to: values.email,
    qualification: values.qualification,
    specialization: values.specialization,
    experience: values.experience || "Not provided",
    lead_details: leadDetails,
    message: leadDetails
  };

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
    publicKey: EMAILJS_PUBLIC_KEY
  });
}
