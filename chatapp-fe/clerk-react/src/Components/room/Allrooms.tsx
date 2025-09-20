import React, { useEffect, useRef, useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from '../app-sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Copy, CopyCheck, LogOut, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Input } from "@/Components/ui/input"
import { useSocket } from '@/hooks/Web-socket'
import { Mymessg } from './Mymessg'
import { Othersmessg } from './Othersmessg'
import { useUser } from "@clerk/clerk-react"
import ScrambledText from '../ScrambledText'
import Dither from '../Dither'
import { toast, Toaster } from 'sonner'
import TextType from '../TextType'

export const Allrooms = () => {
  const [roomname, setroomname] = useState();
  const [click, setclick] = useState(false);
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [message, setmessage] = useState<any>([]);
  const [textmessg, settextmessg] = useState("");
  const userid = localStorage.getItem("user")
  const username = localStorage.getItem("firstname")
  const { isSignedIn, isLoaded } = useUser();
  const { sendmessage, ready } = useSocket(`${import.meta.env.VITE_WS_API_URL}`, (ev) => {

    try {
      if (ev.type == "history") {
        setmessage(ev.messages)
      }
      else if (ev.type == "chat") {
        setmessage((prev: any) => [...prev, ev.messages])
      }
      else {
        toast("incorrect roomid");
        setTimeout(() => {
          navigate("/chat-room");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  })

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      localStorage.clear();
      navigate("/");
    }
  }, [navigate, isSignedIn, isLoaded])

  useEffect(() => {
    findroomname();
    if (isLoaded && isSignedIn && ready) {
      sendmessage({ type: "join", roomId: id, userid: userid })
    }
    // eslint-disable-next-line
  }, [id, ready, isLoaded]);

  const findroomname = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HTTP_API_URL}/api/auth/roomname`, {
        params: { roomid: id }
      });
      if (response.data.success) {
        setroomname(response.data.roomname.roomname);
      }
    } catch (error) {
      console.log(`cant find the rooms ${error}`);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(id);
      toast("✅ Room ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlechat = () => {
    if (textmessg == "") return;
    sendmessage({ type: "chat", text: textmessg, username: username });
    settextmessg("");
  }

  const pressedenter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlechat();
    }
  }

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to bottom when messages change
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className='min-h-screen '>
      <Toaster theme="dark" position='top-center' duration={2000} />
      <SidebarProvider >
        <div className="flex w-full min-h-screen bg-transparent">
          <AppSidebar />
          <main className="flex flex-col flex-1 min-h-0">

            {/* ✅ Header */}
            <div className="flex items-center justify-between w-full bg-black text-white px-4 sm:px-8 py-3 sm:py-4 shadow-md sticky top-0 left-0 right-0 z-40">
              <div className="flex items-center gap-2 sm:gap-4">
                <SidebarTrigger className="dark text-white hover:bg-neutral-900 hover:text-green-600 cursor-pointer" />
                <Users className="text-green-500" style={{ width: "22px", height: "22px" }} strokeWidth={2.5} />
                <h3 className="font-bold text-green-500 text-lg sm:text-2xl">{roomname ? roomname : "loading..."}</h3>
              </div>
              <div className="flex flex-col pl-3 sm:pl-0 lg:flex-row items-center gap-2 sm:gap-4">
                <span className="ring-1 px-2 sm:px-4 py-1 flex items-center gap-2 ring-[#2f2c2c] rounded-xl bg-[#232323]">
                  <span className="text-xs sm:block  hidden text-green-600 font-mono">{id?.slice(0, 10) + "..."}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="hover:bg-[#2f2c2c] cursor-pointer transition-all p-1"
                        onClick={() => {
                          setclick(true);
                          copyToClipboard();
                          setTimeout(() => setclick(false), 2000);
                        }}>
                        {click ? <CopyCheck className="w-4 text-green-500 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#2f2c2b] ring-1 rounded-sm ring-[#4d4848] p-1 mb-2 text-xs">
                      <p>Copy the Room Id</p>
                    </TooltipContent>
                  </Tooltip>
                </span>
                <Button className="dark cursor-pointer w-13 h-10 sm:w-auto sm:h-auto flex items-center bg-[#222222] justify-center gap-2 hover:bg-black hover:text-green-500 py-2"
                  onClick={() => navigate("/chat-room")}>
                    <div className='hidden sm:block '>
                  <ScrambledText
                    style={{ fontSize: "16px", color: "#2ebf4b", margin: "0 8px" }}
                    duration={1.2}
                    speed={0.5}
                    scrambleChars={".:"}>
                    Exit Room
                  </ScrambledText>
                  </div>
                  <LogOut className="w-8 h-8 text-green-500" />
                </Button>
              </div>
            </div>

            {/* ✅ Messages */}
            <div className="min-h-0 relative flex-1">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Dither waveColor={[0, 0.4, 0.1]} disableAnimation={false} enableMouseInteraction={true}
                  mouseRadius={0.3} colorNum={10} waveAmplitude={0.30} waveFrequency={4.5} waveSpeed={0.09} />
              </div>

              <div
                ref={messagesContainerRef}
                className="min-h-0 p-3 sm:p-6 space-y-3 bg-transparent backdrop-blur- absolute inset-0 flex flex-col overflow-y-auto z-20"
              >
                {message && message.length > 0 ? (
                  message.map((item: any, index: number) => {
                    const ismine = item.senderId == userid;
                    return (
                      <div key={index} className={`flex ${ismine ? "justify-end" : "justify-start"}`}>
                        {ismine ? (
                          <Mymessg username={"You"} messg={item.message} />
                        ) : (
                          <Othersmessg username={item.username} messg={item.message} />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-white text-lg sm:text-2xl font-mono">
                    <TextType
                      text={["No Messages Yet!", "No Messages Yet!"]}
                      typingSpeed={95}
                      pauseDuration={2000}
                      showCursor={true}
                      cursorCharacter="|"
                    />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* ✅ Input Row */}
            <div className="w-full flex sticky items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-3 bg-black border-t border-[#2f2c2c]">
              <Input
                id="message"
                type="text"
                value={textmessg}
                onKeyDown={pressedenter}
                placeholder="Type your message..."
                required
                onChange={(e) => settextmessg(e.target.value)}
                className="flex-1 px-3 py-2 text-sm sm:text-base rounded-lg bg-[#2b2b2b] ring-green-600 ring-1 text-green-500 font-mono focus:ring-green-500"
              />
              <Button className="px-3 sm:px-5 py-2 text-sm sm:text-base dark cursor-pointer bg-[#222222] hover:bg-black hover:text-green-500"
                onClick={handlechat}>
                <ScrambledText
                  style={{ fontSize: "16px", color: "#2ebf4b", margin: "0 6px" }}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars={".:"}>
                  Send
                </ScrambledText>
              </Button>
            </div>
          </main>
        </div >
      </SidebarProvider >
    </div>
  );
}
