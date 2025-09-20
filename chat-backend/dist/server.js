import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { setupWebSocket } from "./ws/socket.js";
dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/chatapp";
const server = http.createServer(app);
// attach websocket
setupWebSocket(server);
// connect db
mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
//# sourceMappingURL=server.js.map