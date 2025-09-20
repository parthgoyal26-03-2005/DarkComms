import { useState } from "react";

export default function LandingFeedback() {
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: send feedback to backend
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setFeedback("");
  };

  return (
    <div className="max-w-4xl sm:mx-auto mx-3 mt-8 mb-8 bg-[#101c13] bg-opacity-80 rounded-xl p-6 shadow-lg border border-green-900">
      <h3 className="text-green-400 font-mono text-xl mb-4">Feedback / Bug Report</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          placeholder="Type your feedback or bug report here..."
          className="rounded-lg bg-[#181818] text-green-300 font-mono p-3 resize-none min-h-[60px] border border-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="self-end px-4 py-2 rounded-lg bg-green-900 text-green-300 font-mono hover:bg-green-700 hover:text-white transition-colors duration-150"
        >
          {sent ? "Thank you!" : "Send"}
        </button>
      </form>
    </div>
  );
}
