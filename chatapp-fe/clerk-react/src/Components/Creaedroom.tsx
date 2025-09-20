import { Button } from "@/Components/ui/button"
import { useSocket } from "@/hooks/Web-socket"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {  useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import ElectricBorder from "./ElectricBorder"
import { toast } from "sonner"

interface props{
  openpopup:boolean,
  setpopupopen:any
}
export const Creaedroom=({openpopup ,setpopupopen }:props)=> {

  const navigate=useNavigate();
  const [testing,settesting]=useState(false);
  const userid=localStorage.getItem("user");  
  const [roomname,setroomname]=useState<string>("");
  const [id,setid] =useState<string>("");
  const {sendmessage}=useSocket(`${import.meta.env.VITE_WS_API_URL}`,(data)=>{
    
    if(data.type=="roomCreated"){
      setid(data.roomId);
      setTimeout(() => {
        settesting(true);
      }, 2000);
        toast("Room is Created");
      }
    })
    useEffect(()=>{
      if(testing){
      setpopupopen(false);
      //@ts-ignore
      navigate(`/room/${id}`);
    }
  },[testing])
  const submitroomname=()=>{
    if(!roomname)return;
    sendmessage({type:"create",roomName:roomname,userid:userid});
    
  }
  return (<>
    {openpopup &&
    <div  className=" w-full max-w-md dark absolute z-40 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
<ElectricBorder
  color="#5FA34D"
  speed={1}
  chaos={0.6}
  thickness={4}
  style={{ borderRadius: 16}}
  className="z-50"
>
 <Card className="font-mono"> 
      <CardHeader>
        <CardTitle className="text-[#9dcc90]" >Create your Room</CardTitle>
        <CardDescription className="text-green-600">
          Enter your Room Name below to Create the room
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="Roomname" className="text-[#9dcc90]">Room Name</Label>
              <Input
                id="roomname"
                type="roomname"
                value={roomname}
                placeholder="Enter your room Name"
                required
                onChange={(e)=>setroomname(e.target.value)} 
                className="text-green-500"
                maxLength={20}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full text-md bg-green-800  hover:bg-black hover:text-green-500 font-bold cursor-pointer" onClick={submitroomname}>
          + Create
        </Button>
        <Button  className="w-full cursor-pointer bg-[#222222] text-gray-200 font-bold  hover:bg-black hover:text-green-500" onClick={()=>setpopupopen(false)}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
    </ElectricBorder>
    </div>}
    </>
  )
}
