import { model, Schema } from "mongoose";
const Messageschema = new Schema({
    senderId: { type: String, required: true },
    roomId: { type: String, required: true },
    message: { type: String, required: true },
    username: { type: String, require: true },
    createdate: { type: Date, default: Date.now },
});
export default model("chats", Messageschema);
//# sourceMappingURL=message.js.map