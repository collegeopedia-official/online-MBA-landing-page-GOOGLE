import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { scrollToElement, trackEvent } from "../../utils/tracking.js";

const quickReplies = ["MBA fees?", "Am I eligible?", "Best specialization?"];

const answers = {
  "MBA fees?": "Fees depend on university and specialization. Share your details and our counsellor will guide you with current options.",
  "Am I eligible?": "Most Online MBA programs require graduation from a recognised university. A counsellor can verify your profile quickly.",
  "Best specialization?": "It depends on your background and career goal. Popular choices include Marketing, Finance, HR, Operations, and Analytics."
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I can help with Online MBA eligibility, fees, specialization, and admissions."
    }
  ]);
  const [input, setInput] = useState("");

  function toggleChat() {
    trackEvent(isOpen ? "chatbot_close" : "chatbot_open");
    setIsOpen((current) => !current);
  }

  function addMessage(text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    trackEvent("chatbot_message", { text: trimmedText });
    setMessages((current) => [
      ...current,
      { from: "user", text: trimmedText },
      {
        from: "bot",
        text: answers[trimmedText] ?? "Great question. Please fill the form and our admission counsellor will guide you personally."
      }
    ]);
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    addMessage(input);
  }

  function handleCounsellorClick() {
    trackEvent("chatbot_counsellor_click");
    scrollToElement("hero-form");
    setIsOpen(false);
  }

  return (
    <div className={`chatbot-widget ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label="Online MBA chatbot">
          <div className="chatbot-header">
            <span>
              <Bot size={19} aria-hidden="true" />
            </span>
            <div>
              <strong>MBA Assistant</strong>
              <small>Ask about admissions</small>
            </div>
            <button type="button" onClick={toggleChat} aria-label="Close chatbot">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <p className={`chatbot-message ${message.from}`} key={`${message.from}-${index}`}>
                {message.text}
              </p>
            ))}
          </div>

          <div className="chatbot-quick-replies" aria-label="Suggested questions">
            {quickReplies.map((reply) => (
              <button type="button" key={reply} onClick={() => addMessage(reply)}>
                {reply}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Online MBA"
              aria-label="Ask about Online MBA"
            />
            <button type="submit" aria-label="Send message">
              <Send size={17} aria-hidden="true" />
            </button>
          </form>

          <button type="button" className="chatbot-counsellor" onClick={handleCounsellorClick}>
            Talk to Counsellor
          </button>
        </div>
      )}

      <button type="button" className="chatbot-toggle" onClick={toggleChat} aria-label="Open chatbot">
        <Bot size={25} aria-hidden="true" />
      </button>
    </div>
  );
}
