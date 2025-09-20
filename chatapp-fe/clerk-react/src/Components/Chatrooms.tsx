import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { AppSidebar } from "@/Components/app-sidebar"
import { useState, useEffect } from "react"
import { Creaedroom } from "./Creaedroom"
import { Joinroom } from "./Joinroom"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import FuzzyText from "./FuzzyText"
import PixelBlast from "./PixelBlast"
import {Toaster}  from "@/Components/ui/sonner"


export const Chatrooms = () => {

  const navigate = useNavigate();
  const [iscreateopen, setiscreateopen] = useState(false);
  const [isjoinopen, setisjoinopen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      localStorage.clear();
      navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>; // 👈 avoid flicker
  }

  return (
    <div className="bg-transparent w-full h-full">
      <Toaster
        theme="dark"
        position='top-center'
        duration={2000}/>
      
      {iscreateopen &&
        <>
          <Creaedroom openpopup={iscreateopen} setpopupopen={setiscreateopen} />
        </>}
      {isjoinopen &&
        <>
          <Joinroom openpopup={isjoinopen} setpopupopen={setisjoinopen} />
        </>}
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full relative ">
          <div style={{ width: '100%', height: '100%', position: 'absolute',zIndex:0 }}>
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#078D4E"
          patternScale={6}
          patternDensity={0.9}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.5}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.8}
          edgeFade={0.1}
          transparent
        />
      </div>
          <div className="bg-black absolute z-20 "><SidebarTrigger className="dark text-white cursor-pointer" /></div>

          <div className="bg-transparent  text-center w-full h-full flex justify-center items-center flex-col absolute">
            <div className="m-5 cursor-pointer  " onClick={() => setiscreateopen(true)}><FuzzyText
              fontSize={"60px"}
              baseIntensity={0.15}
              hoverIntensity={0.5}
              enableHover={true}
              color="#078D4B"
              fontFamily="mono"
            >
              Create Room
            </FuzzyText></div>
            <div className="m-5 cursor-pointer " onClick={() => setisjoinopen(true)}><FuzzyText
              fontSize={"60px"}
              baseIntensity={0.15}
              hoverIntensity={0.5}
              enableHover={true}
              color="#078D4B"
              fontFamily="mono"
            >
              Join Room
            </FuzzyText></div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}