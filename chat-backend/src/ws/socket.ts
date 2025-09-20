import { WebSocketServer, WebSocket } from "ws";
import message from "../models/message.js";
import room from "../models/room.js";
import { randomUUID } from "crypto";

interface Connection {
    socket: WebSocket;
    userId: string;
    roomId: string;
}

let connections: Connection[] = [];

export const setupWebSocket = (server: any) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (socket) => {
        socket.on("message", async (msg) => {
            const data = JSON.parse(msg.toString());

            if (data.type === "create") {
                const roomId = randomUUID(); // generate unique roomId

                const newRoom = await room.create({
                    roomid: roomId,
                    roomname: data.roomName,
                    userid: data.userid
                });
                if (newRoom) {
                    connections.push({ socket, userId: data.userid, roomId: newRoom.roomid });
                }

                socket.send(JSON.stringify({
                    type: "roomCreated",
                    roomId: newRoom.roomid,
                    roomName: newRoom.roomname,
                    success: true
                }));

                return;
            }

            if (data.type === "join") {

                const roomId = data.roomId;
                const userId=data.userid
                const response = await room.findOne({
                    roomid: roomId
                })
                
                const response2 = await room.findOne({
                    roomid: roomId,
                    userid:userId
                })
                if(response2){
                    connections.push({ socket, userId: data.userid, roomId: data.roomId });

                    // send past messages
                    const oldMessages = await message.find({ roomId: data.roomId }).sort({ createdate: 1 });
                    socket.send(JSON.stringify({ type: "history", type2: "Roomjoined",roomid:data.roomId, messages: oldMessages }));   
                }

                else if (response) {

                    await room.create({
                        roomid: data.roomId,
                        userid: data.userid,
                        roomname: response.roomname
                    })

                    connections.push({ socket, userId: data.userid, roomId: data.roomId });

                    // send past messages
                    const oldMessages = await message.find({ roomId: data.roomId }).sort({ createdate: 1 });
                    socket.send(JSON.stringify({ type: "history", type2: "Roomjoined",roomid:data.roomId, messages: oldMessages }));

                }
                else{
                    socket.send(JSON.stringify({type:"false", message:"Incorrect RoomId"}));
                }

                return;
            }

            
            if (data.type === "chat") {
                const conn = connections.find((c) => c.socket === socket);
                if (!conn) return;

                const newMsg = await message.create({
                    roomId: conn.roomId,
                    senderId: conn.userId,
                    username: data.username,
                    message: data.text,
                });

                // broadcast to all in room
                connections
                    .filter((c) => c.roomId === conn.roomId)
                    .forEach((c) => c.socket.send(JSON.stringify({ type: "chat", messages: newMsg })));
                    
                    return;
            }
        });

        socket.on("close", () => {
            connections = connections.filter((c) => c.socket !== socket);
        });
    });
};
