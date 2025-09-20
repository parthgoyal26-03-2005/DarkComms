export default function LandingFlow() {
  return (
    <div className="max-w-5xl sm:mx-auto mx-3 mt-10 mb-8 bg-[#101c13] bg-opacity-80 rounded-xl p-6 shadow-lg border border-green-900">
      <h3 className="text-green-400 font-mono text-xl mb-4">How to Use DarkComms</h3>
      <ol className="list-decimal list-inside text-green-200 font-mono space-y-4 text-left">
        <li>
          <span className="text-green-400">Sign In:</span> Click the <span className="bg-green-900 px-2 py-1 rounded text-white">Sign in</span> button at the top right to authenticate securely.
        </li>
        <li>
          <span className="text-green-400">Create or Join a Room:</span> After signing in, choose to <span className="bg-green-900 px-2 py-1 rounded text-white">Create Room</span> (enter a room name) or <span className="bg-green-900 px-2 py-1 rounded text-white">Join Room</span> (enter a room ID).
        </li>
        <li>
          <span className="text-green-400">Invite Others:</span> Share your <span className="bg-green-900 px-2 py-1 rounded text-white">Room ID</span> with friends so they can join your chat room instantly.
        </li>
        <li>
          <span className="text-green-400">Start Chatting:</span> Everyone in the room can now chat in real time. Enjoy secure, encrypted conversations!
        </li>
      </ol>
      <div className="mt-6 text-green-300 font-mono text-center text-sm opacity-80">
        <span>Tip: You can always copy the Room ID from the chat room header to invite more friends.</span>
      </div>
    </div>
  );
}
