export default function LandingHowItWorks() {
  return (
    <div className="max-w-5xl sm:mx-auto mx-3 mt-10 mb-8 bg-[#101c13] bg-opacity-80 rounded-xl p-6 shadow-lg border border-green-900">
      <h3 className="text-green-400 font-mono text-xl mb-4">How It Works</h3>
      <ol className="list-decimal list-inside text-green-200 font-mono space-y-2">
        <li>
          <span className="text-green-400">Create Room:</span> Start a new secure chat room with one click.
        </li>
        <li>
          <span className="text-green-400">Share Id:</span> Invite friends by sharing the room Id.
        </li>
        <li>
          <span className="text-green-400">Start Chatting:</span> Enjoy encrypted, real-time conversation.
        </li>
      </ol>
    </div>
  );
}
