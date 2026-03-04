import { Heart, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type KeyboardEvent, useCallback, useRef, useState } from "react";
import { getNehaResponse } from "./lib/nehaResponses";

/* ─── Types ─────────────────────────────────────────────── */
interface Message {
  id: string;
  sender: "neha" | "user";
  text: string;
  timestamp: Date;
}

/* ─── Helpers ────────────────────────────────────────────── */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

let msgCounter = 0;
function makeId(): string {
  return `msg-${++msgCounter}-${Date.now()}`;
}

/* ─── Initial welcome messages ───────────────────────────── */
const initialMessages: Message[] = [
  {
    id: makeId(),
    sender: "neha",
    text: "Heyy! Main Neha hoon! 🌸 Aapka swagat hai! Main yahaan hoon aapki baat sunne ke liye, aapko khush karne ke liye, aur aapka din thoda behtar banane ke liye. Kaise ho aap? 😊",
    timestamp: new Date(),
  },
];

/* ─── Typing Indicator ───────────────────────────────────── */
function TypingIndicator() {
  return (
    <motion.div
      data-ocid="neha.loading_state"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-2 mb-3"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-bubble">
        <img
          src="/assets/generated/neha-avatar-transparent.dim_200x200.png"
          alt="Neha"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Bubble */}
      <div className="bubble-neha rounded-3xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full inline-block" />
      </div>
    </motion.div>
  );
}

/* ─── Message Bubble ─────────────────────────────────────── */
interface BubbleProps {
  message: Message;
  index: number;
}

function MessageBubble({ message, index }: BubbleProps) {
  const isNeha = message.sender === "neha";

  return (
    <motion.div
      data-ocid={`chat.item.${index + 1}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-end gap-2 mb-3 ${isNeha ? "justify-start" : "justify-end"}`}
    >
      {/* Neha's avatar (left side) */}
      {isNeha && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-bubble self-end">
          <img
            src="/assets/generated/neha-avatar-transparent.dim_200x200.png"
            alt="Neha"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Bubble content */}
      <div
        className={`flex flex-col max-w-[75%] sm:max-w-[65%] ${isNeha ? "items-start" : "items-end"}`}
      >
        <div
          className={`
            px-4 py-3 text-sm leading-relaxed
            ${
              isNeha
                ? "bubble-neha text-neha-bubble-foreground rounded-3xl rounded-bl-sm"
                : "bubble-user text-user-bubble-foreground rounded-3xl rounded-br-sm"
            }
          `}
        >
          {message.text}
        </div>
        <span className="text-[10px] text-muted-foreground mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {/* User avatar (right side) */}
      {!isNeha && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-user-bubble flex items-center justify-center text-user-bubble-foreground text-xs font-semibold shadow-bubble self-end">
          Aap
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main App ───────────────────────────────────────────── */
export default function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Send message */
  const sendMessage = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: makeId(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Scroll after user message renders
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    // Random delay 400–900ms for "thinking"
    const delay = 400 + Math.random() * 500;

    setTimeout(() => {
      const response = getNehaResponse(text);
      const nehaMsg: Message = {
        id: makeId(),
        sender: "neha",
        text: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, nehaMsg]);
      setIsTyping(false);
      // Scroll after Neha's response renders
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }, delay);
  }, [inputValue, isTyping]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen chat-bg flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Chat Window */}
      <div
        className="w-full max-w-lg flex flex-col bg-card rounded-[2rem] overflow-hidden chat-card"
        style={{ height: "min(680px, calc(100dvh - 2rem))" }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="chat-header flex-shrink-0 px-5 py-4 flex items-center gap-3">
          {/* Avatar with online ring */}
          <div className="relative flex-shrink-0">
            <div
              className="w-13 h-13 rounded-full overflow-hidden avatar-glow"
              style={{ width: "3.25rem", height: "3.25rem" }}
            >
              <img
                src="/assets/generated/neha-avatar-transparent.dim_200x200.png"
                alt="Neha"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator — pulsing */}
            <span className="online-dot absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-online border-2 border-white" />
          </div>

          {/* Name and status */}
          <div className="flex-1">
            <h1 className="font-display font-semibold text-lg text-white leading-tight tracking-wide">
              Neha
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="online-dot w-2 h-2 rounded-full bg-online" />
              <p className="text-xs text-white/80 font-medium tracking-wide">
                Online · Aapki dost 🌸
              </p>
            </div>
          </div>

          {/* Heart decoration */}
          <div className="flex-shrink-0">
            <Heart className="w-5 h-5 text-white/60 fill-white/30" />
          </div>
        </header>

        {/* ── Message List ─────────────────────────────────────── */}
        <main
          data-ocid="chat.list"
          className="flex-1 overflow-y-auto px-4 py-4 chat-scroll"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <MessageBubble key={msg.id} message={msg} index={idx} />
            ))}

            {isTyping && <TypingIndicator key="typing" />}
          </AnimatePresence>

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </main>

        {/* ── Input Bar ────────────────────────────────────────── */}
        <footer className="input-bar flex-shrink-0 px-4 py-3">
          <div className="flex items-center gap-2.5">
            {/* Text input */}
            <div className="flex-1">
              <input
                ref={inputRef}
                data-ocid="chat.input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Kuch bhi bolo... main sun rahi hoon 🌸"
                disabled={isTyping}
                className="chat-input w-full rounded-full px-5 py-3 text-sm text-foreground font-medium"
              />
            </div>

            {/* Send button */}
            <button
              type="button"
              data-ocid="chat.submit_button"
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Message bhejo"
              className="send-btn flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
            >
              <Send className="w-4 h-4 text-white translate-x-0.5" />
            </button>
          </div>
        </footer>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="mt-4 text-center">
        <p className="text-xs text-muted-foreground/70">
          © {currentYear}. Built with{" "}
          <Heart className="inline w-3 h-3 fill-current text-primary/60 mx-0.5" />{" "}
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
