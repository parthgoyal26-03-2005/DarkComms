import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LandingRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/rooms", { params: { public: true } })
      .then(res => {
        if (res.data.success) setRooms(res.data.roomnames || []);
      })
      .catch(() => setRooms([]));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-[#101c13] bg-opacity-80 rounded-xl p-6 shadow-lg border border-green-900">
      <h3 className="text-green-400 font-mono text-xl mb-4">Active Public Rooms</h3>
      <div className="flex flex-col gap-2">
        {rooms.length > 0 ? rooms.map(room => (
          <button
            key={room.roomid}
            onClick={() => navigate(`/room/${room.roomid}`)}
            className="w-full text-left px-4 py-2 rounded-lg bg-[#181818] text-green-300 font-mono hover:bg-green-900 hover:text-white transition-colors duration-150 cursor-pointer"
          >
            {room.roomname}
          </button>
        )) : (
          <div className="text-gray-400 font-mono">No public rooms online right now.</div>
        )}
      </div>
    </div>
  );
}
