import { Users } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import BlurText from "./BlurText";
import DecryptedText from "./DecryptedText";

// Menu items.


export function AppSidebar() {
  const [roomnames, setroomnames] = useState<any>();
  const [username, setusername] = useState<any>();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  useEffect(() => {
    const firstname = localStorage.getItem("firstname")
    setusername(firstname);
    findallrooms();
  }, [])
  const findallrooms = async () => {

    const userid = localStorage.getItem("user");
    try {
      const response = await axios.get(`${import.meta.env.VITE_HTTP_API_URL}/api/auth/rooms`, {
        params: { userid: userid }
      })
      if (response.data.success) {
        setroomnames(response.data.roomnames);
      }
      else {
        setroomnames("");
      }
    } catch (error) {
      console.log(`cant find the rooms ${error}`);
    }

  }
  const handleSignOut = (event:any) => {
    // Stop the event from bubbling up and clicking the room button behind it
    event.stopPropagation();
    console.log("userloggedout");
    

    // Call the Clerk sign-out function
    signOut();
  };

  return (
    <div >
      <Sidebar className="flex-shrink-0 w-64  " >
        <SidebarHeader className=" bg-black flex items-center border-b-1 border-b-green-800 justify-center">

          <BlurText
            text="DarkComms  "
            delay={150}
            animateBy="letters"
            direction="top"
            className="text-3xl font-bold font-mono   text-green-600 mb-3 wrap-break-words"
          />
        </SidebarHeader>
        <SidebarContent className='bg-black' >
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {roomnames && roomnames.length > 0 ? (roomnames.map((item: any) => (
                  <SidebarMenuItem key={item.roomid} onClick={() => navigate(`/room/${item.roomid}`)}>
                    <SidebarMenuButton asChild className="  hover:bg-neutral-800 p-6  text-lg  cursor-pointer  active:bg-neutral-900 active:text-green-600    font-mono text-green-600 hover:text-green-600 " >
                      <div className="w-full ">
                        <Users className='rounded-full  mr-5  border-1 border-green-500 ' style={{ width: "23", height: "23" }} strokeWidth={2.5} />
                        <DecryptedText
                          text={item.roomname}
                          speed={100}
                          sequential={true}
                          animateOn="view"
                          revealDirection="start"
                        />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))) :
                  (<div className="text-green-500">No rooms are found yet</div>)
                }

              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="flex bg-black  flex-row justify-center pt-4  pb-4   border-t-1 border-t-green-800  items-center w-full">
          <SidebarGroupLabel className="text-2xl pr-9 font-bold font-mono text-green-600">{username}</SidebarGroupLabel>
          <button onClick={handleSignOut} className='text-green-500 ring-1 hover:bg-green-500 hover:text-black font-mono ring-green-500 rounded-lg p-2'  >
            Sign out
          </button>
        </SidebarFooter>
      </Sidebar>

    </div>
  )
}