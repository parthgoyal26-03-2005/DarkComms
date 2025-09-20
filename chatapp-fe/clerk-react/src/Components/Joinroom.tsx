import { Button } from "@/Components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useSocket } from "@/hooks/Web-socket"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ElectricBorder from "./ElectricBorder"
import { toast } from "sonner"

interface props{
  openpopup:boolean,
  setpopupopen:any
}
export const Joinroom=({openpopup ,setpopupopen }:props)=> {

  
    const [roomid,setroomid]=useState<string>("");
    const [testing,settesting] =useState(false);
    const [id,setid] =useState<string>("");
  const userid=localStorage.getItem("user");  
    const navigate=useNavigate();
    
    const {sendmessage}=useSocket(`${import.meta.env.VITE_WS_API_URL}`,(data)=>{
  
      if(data.type2=="Roomjoined"){
        setid(data.roomid);
        toast("room joined");
       setTimeout(() => {
        settesting(true);
       }, 2000);
      }
      else{
        toast("invalid room id");
        setroomid("");
      }
    })

     useEffect(()=>{
        if(testing){
          setpopupopen(false);
          //@ts-ignore
          navigate(`/room/${id}`);
        }
      },[testing])
  const submitroomid=()=>{
    if(!roomid)return;
    sendmessage({type:"join",roomId:roomid,userid:userid});
  
    }
  return (
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
        <CardTitle className="text-[#9dcc90] ">Join The Room</CardTitle>
        <CardDescription className="text-green-600">
          Enter The Room Id  below to Join the room
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="Roomid" className="text-[#9dcc90]">Room Id</Label>
              <Input
                id="roomid"
                type="roomid"
                value={roomid}
                placeholder="Enter your room Id"
                required
                onChange={(e)=>setroomid(e.target.value)}
                className="text-green-600"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button  className="w-full text-md bg-green-800  hover:bg-black hover:text-green-500 font-bold cursor-pointer"  onClick={submitroomid}>
          Join
        </Button>
        <Button className="w-full cursor-pointer bg-[#222222] text-gray-200 font-bold  hover:bg-black hover:text-green-500" onClick={()=>setpopupopen(false)}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
    </ElectricBorder>
    </div>
  )
}
