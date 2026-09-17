export function trackEvent(eventName, payload = {}) {
  if (import.meta.env.DEV) {
    console.info("[tracking]", eventName, payload);
  }
}

export function scrollToElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
