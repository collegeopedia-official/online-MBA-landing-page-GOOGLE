import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Bot, CalendarDays, Headphones, MoreVertical, Paperclip, Send, X } from "lucide-react";
import { trackEvent } from "../../utils/tracking.js";
import { getPhoneUrl } from "../../utils/contact.js";
import { faqItems } from "../../data/faqData.js";

const fallbackAnswer = "I'm not completely sure about that based on the information available to me.\n\nOur admission counsellor can help you with the correct information.";
const stopWords = new Set(["a", "an", "and", "are", "as", "can", "do", "does", "for", "i", "in", "is", "it", "my", "of", "or", "that", "the", "to", "what", "will", "with", "you", "your"]);
const thinkingText = ["Checking information for you...", "Searching our course data...", "Finding the best answer...", "Preparing your answer..."];
const humanSupportTerms = ["call me", "talk to", "counsellor", "counselor", "human", "admission help", "personal advice", "best for me", "contact me"];
const admissionGuidanceTerms = ["admission", "admissions", "apply", "application", "enroll", "enrol", "enrollment", "enrolment", "documents", "process", "join", "register", "registration"];

const quickQuestions = [
  { query: "Will people take my online degree seriously?" },
  { query: "Does the diploma actually say 'ONLINE' in huge letters?" },
  { query: "Will my boss care that I did it online?" },
  { query: "How many hours a week am I actually going to lose?" },
  { query: "Is online tuition actually cheaper?" },
  { query: "Are there secret scholarships for online folks?" }
];

function createMessage(role, content, options = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
    timestamp: new Date(),
    type: options.type ?? "text"
  };
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchTerms(value) {
  return normalizeText(value)
    .split(" ")
    .filter((term) => term.length > 1 && !stopWords.has(term));
}

function scoreFaqItem(query, faqItem) {
  const normalizedQuery = normalizeText(query);
  const normalizedQuestion = normalizeText(faqItem.question);
  const normalizedAnswer = normalizeText(faqItem.answer);
  const terms = getSearchTerms(query);

  if (!normalizedQuery) return 0;
  if (normalizedQuestion === normalizedQuery) return 100;
  if (normalizedQuestion.includes(normalizedQuery)) return 80;

  return terms.reduce((score, term) => {
    if (normalizedQuestion.includes(term)) return score + 8;
    if (normalizedAnswer.includes(term)) return score + 3;
    return score;
  }, 0);
}

function findFaqMatches(query, limit = 5) {
  return faqItems
    .map((faqItem) => ({ ...faqItem, score: scoreFaqItem(query, faqItem) }))
    .filter((faqItem) => faqItem.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function shouldRouteToCounsellor(question) {
  const normalizedQuestion = normalizeText(question);
  return humanSupportTerms.some((term) => normalizedQuestion.includes(term));
}

function shouldSuggestCounsellor(question) {
  const normalizedQuestion = normalizeText(question);
  return admissionGuidanceTerms.some((term) => normalizedQuestion.includes(term));
}

function answerQuestion(question) {
  if (shouldRouteToCounsellor(question)) {
    return { content: fallbackAnswer, type: "fallback" };
  }

  const [bestMatch] = findFaqMatches(question, 1);
  if (bestMatch && bestMatch.score >= 8) {
    const needsCounsellorCta = shouldSuggestCounsellor(question);
    return {
      content: needsCounsellorCta
        ? `${bestMatch.answer}\n\nFor admission-related guidance, our counsellor can help you with the right next step.`
        : bestMatch.answer,
      type: needsCounsellorCta ? "cta" : "text"
    };
  }

  if (shouldSuggestCounsellor(question)) {
    return {
      content: "For admission-related questions, our counsellor can guide you better with the exact process, documents, eligibility, and next steps.",
      type: "fallback"
    };
  }

  return { content: fallbackAnswer, type: "fallback" };
}

function MessageText({ content }) {
  return content.split("\n").map((line, index) => {
    if (!line.trim()) return null;
    return <span key={`${line}-${index}`}>{line}</span>;
  });
}

function CounsellorActions() {
  return (
    <div className="chatbot-response-actions" aria-label="Counsellor actions">
      <a className="chatbot-response-action primary" href={getPhoneUrl()} onClick={() => trackEvent("chatbot_fallback_counsellor_click")}>
        <Headphones size={17} aria-hidden="true" />
        <span>Talk to our Counsellor</span>
        <Send size={15} aria-hidden="true" />
      </a>
      <a className="chatbot-response-action secondary" href={getPhoneUrl()} onClick={() => trackEvent("chatbot_book_call_click")}>
        <CalendarDays size={17} aria-hidden="true" />
        <span>Book a Free Call</span>
      </a>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    createMessage(
      "assistant",
      "Hi there!\n\nI'm your Collegepedia AI assistant.\n\nI can help you with Online MBA courses, universities, fees, eligibility, admissions, scholarships, placements, and specialisations.\n\nWhat would you like to know?"
    )
  ]);
  const [input, setInput] = useState("");
  const [suggestionQuery, setSuggestionQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const messagesRef = useRef(null);
  const responseTimerRef = useRef(null);
  const suggestedQuestions = useMemo(() => {
    const query = input.trim() || suggestionQuery.trim();
    return query ? findFaqMatches(query, 6).map((item) => item.question) : quickQuestions.map((item) => item.query);
  }, [input, suggestionQuery]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isThinking]);

  useEffect(() => {
    if (!isThinking) return undefined;

    const intervalId = window.setInterval(() => {
      setThinkingIndex((current) => (current + 1) % thinkingText.length);
    }, 1700);

    return () => window.clearInterval(intervalId);
  }, [isThinking]);

  useEffect(() => {
    return () => {
      if (responseTimerRef.current) window.clearTimeout(responseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    function handleExternalOpen(event) {
      setIsOpen(true);
      if (event.detail?.question) {
        submitQuestion(event.detail.question);
      }
    }

    window.addEventListener("openCollegepediaChatbot", handleExternalOpen);
    return () => window.removeEventListener("openCollegepediaChatbot", handleExternalOpen);
  }, [isThinking]);

  function toggleChat() {
    trackEvent(isOpen ? "chatbot_close" : "chatbot_open");
    setIsOpen((current) => !current);
  }

  function submitQuestion(question) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isThinking) return;

    trackEvent("chatbot_message", { text: trimmedQuestion });
    setMessages((current) => [...current, createMessage("user", trimmedQuestion)]);
    setInput("");
    setSuggestionQuery(trimmedQuestion);
    setIsThinking(true);
    setThinkingIndex(0);

    responseTimerRef.current = window.setTimeout(() => {
      const answer = answerQuestion(trimmedQuestion);
      setIsThinking(false);
      setMessages((current) => [...current, createMessage("assistant", answer.content, { type: answer.type })]);
    }, 420);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitQuestion(input);
  }

  function handleCounsellorClick() {
    trackEvent("chatbot_counsellor_click");
    window.location.href = getPhoneUrl();
    setIsOpen(false);
  }

  return (
    <div className={`chatbot-widget ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <section className="chatbot-panel" role="dialog" aria-label="Collegepedia AI assistant">
          <header className="chatbot-header">
            <span className="chatbot-avatar">
              <Bot size={24} aria-hidden="true" />
              <i aria-hidden="true" />
            </span>
            <div className="chatbot-title">
              <div>
                <strong>Collegepedia AI</strong>
                <span className="chatbot-status"><b />Online</span>
              </div>
              <small>Your personal admission assistant</small>
            </div>
            <div className="chatbot-header-actions">
              <button type="button" aria-label="More chatbot options">
                <MoreVertical size={19} aria-hidden="true" />
              </button>
              <button type="button" onClick={toggleChat} aria-label="Close chatbot">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="chatbot-messages" ref={messagesRef}>
            {messages.map((message) => (
              <article className={`chatbot-message-row ${message.role}`} key={message.id}>
                {message.role === "assistant" && (
                  <span className="chatbot-message-avatar" aria-hidden="true">
                    <Bot size={17} />
                  </span>
                )}
                <div className="chatbot-message-wrap">
                  <p className={`chatbot-message ${message.role}`}>
                    <MessageText content={message.content} />
                  </p>
                  {(message.type === "fallback" || message.type === "cta") && <CounsellorActions />}
                  <small className="chatbot-message-time">
                    {formatTime(message.timestamp)}
                    {message.role === "user" && " ✓"}
                  </small>
                </div>
              </article>
            ))}

            <div className="chatbot-quick-replies" aria-label="Suggested FAQ questions">
              {suggestedQuestions.map((question) => (
                <button type="button" key={question} onClick={() => submitQuestion(question)} disabled={isThinking}>
                  <BookOpen size={16} aria-hidden="true" />
                  <span>{question}</span>
                </button>
              ))}
            </div>

            {isThinking && (
              <article className="chatbot-message-row assistant">
                <span className="chatbot-message-avatar" aria-hidden="true">
                  <Bot size={17} />
                </span>
                <div className="chatbot-thinking" role="status" aria-live="polite">
                  <span><i /><i /><i /></span>
                  <em>{thinkingText[thinkingIndex]}</em>
                </div>
              </article>
            )}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <button type="button" className="chatbot-attach" aria-label="Attachment options">
              <Paperclip size={20} aria-hidden="true" />
            </button>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Online MBA, fees, eligibility..."
              aria-label="Ask about Online MBA, fees, eligibility"
              disabled={isThinking}
            />
            <button type="submit" className="chatbot-send" aria-label="Send message" disabled={isThinking || !input.trim()}>
              <Send size={18} aria-hidden="true" />
            </button>
          </form>

          <button type="button" className="chatbot-counsellor" onClick={handleCounsellorClick}>
            <Headphones size={17} aria-hidden="true" />
            <span>Talk to Counsellor</span>
          </button>
        </section>
      )}

      <button type="button" className="chatbot-toggle" onClick={toggleChat} aria-label="Open Collegepedia AI Assistant">
        <Bot size={27} aria-hidden="true" />
      </button>
    </div>
  );
}
