import Router from "express";
import Userschema from "../models/user.js";
import Roomschema from "../models/room.js";
import message from "../models/message.js";
const router = Router();
router.post("/signin", async (req, res) => {
    const { clerkId, email, name } = req.body;
    try {
        const resp = await Userschema.findOne({
            userId: clerkId
        });
        if (!resp) {
            await Userschema.create({
                userId: clerkId,
                Email: email,
                Name: name
            });
        }
        if (resp) {
            return res.status(200).json({
                message: "user already logged in",
                success: true,
            });
        }
        return res.status(200).json({
            message: "user logged in",
            success: true
        });
    }
    catch (e) {
        console.log(e);
        res.status(403).json({
            message: "authentication error",
            success: false
        });
    }
});
router.get("/rooms", async (req, res) => {
    //@ts-ignore
    const { userid } = req.query;
    try {
        const rooms = await Roomschema.find({
            userid
        });
        if (rooms) {
            return res.status(200).json({
                "success": true,
                //@ts-ignore
                "roomnames": rooms
            });
        }
        if (!rooms) {
            return res.status(200).json({
                "success": false,
                "message": "No rooms are found"
            });
        }
    }
    catch (error) {
        return res.status(403).json({
            "success": false,
            "message": "something went wrong"
        });
    }
});
router.get("/roomname", async (req, res) => {
    const { roomid } = req.query;
    try {
        const room = await Roomschema.findOne({
            roomid: roomid
        });
        if (room) {
            return res.status(200).json({
                "success": true,
                "roomname": room
            });
        }
    }
    catch (error) {
        return res.status(403).json({
            "success": false,
            "message": "something went wrong"
        });
    }
});
export default router;
//# sourceMappingURL=authroutes.js.map