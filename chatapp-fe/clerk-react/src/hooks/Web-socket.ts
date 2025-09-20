import { useEffect, useRef, useState } from "react";

export const useSocket = (url: string, onmessage: (data: any) => void) => {
  const socketRef = useRef<WebSocket | null>(null);
const [ready,setready]=useState(false);
  useEffect(() => {
    //@ts-ignore
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setready(true);
      console.log("✅ WebSocket connected");
    };

    socketRef.current.onmessage = (ev: any) => {
      try {
        const data = JSON.parse(ev.data);
        onmessage(data);
      } catch (error) {
        console.log(error);
      }
    };

    socketRef.current.onclose = () => {
      console.log("❌ Disconnected");
    };

    return () => socketRef.current?.close();
  }, [url]);

  const sendmessage = (msg: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));

    } else {
      console.log("⚠️ Socket is not ready");
    }
  };

  return { sendmessage ,ready};
};
