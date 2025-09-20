import { Schema, model } from "mongoose";
const Userschema = new Schema({
    userId: { type: String, required: true, unique: true },
    Email: { type: String, required: true, },
    Name: { type: String, required: true }
});
export default model("Users", Userschema);
//# sourceMappingURL=user.js.map