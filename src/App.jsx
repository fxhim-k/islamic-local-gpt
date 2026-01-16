import { useState } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Assalāmu ʿalaykum! 👋 Ask an Islamic question and I will search through the PDF books in our library."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendQuestion(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;

    setMessages(prev => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });

      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            text: "I could not find a matching passage in the PDF library."
          }
        ]);
        setLoading(false);
        return;
      }

      const formatted = data.results
        .map(
          (r) =>
            `📖 <b>${r.pdf}</b> — Page ${r.page}<br><br>${r.snippet
              .replace(/\n/g, "<br>")}...`
        )
        .join("<br><br>────────────────────────<br><br>");

      setMessages(prev => [...prev, { role: "assistant", text: formatted }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "❌ Error connecting to backend." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="app">
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            <div dangerouslySetInnerHTML={{ __html: m.text }} />
          </div>
        ))}

        {loading && (
          <div className="bubble assistant">⏳ Searching PDFs...</div>
        )}
      </div>

      <form className="input-area" onSubmit={sendQuestion}>
        <input
          type="text"
          placeholder="Ask an Islamic question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
