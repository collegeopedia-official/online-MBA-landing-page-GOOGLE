export const WHATSAPP_NUMBER = "919999999999";
export const WHATSAPP_MESSAGE = "Hi, I want free guidance for an Online MBA.";

export function getWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
