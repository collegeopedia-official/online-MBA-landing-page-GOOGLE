export const WHATSAPP_NUMBER = "919999999999";
export const WHATSAPP_MESSAGE = "Hi, I want free guidance for an Online MBA.";
export const PHONE_NUMBER = "+919999999999";
export const PHONE_DISPLAY = "+91 9999999999";

export function getWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getPhoneUrl() {
  return `tel:${PHONE_NUMBER}`;
}
