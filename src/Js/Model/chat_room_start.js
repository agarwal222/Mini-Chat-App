import { io } from "socket.io-client";
import { global } from "../Global";

export const chat_room_start = () => {
    const socket = io("http://localhost:3000");
    // establishing connetion
    socket.on("connect", () => {
        socket.emit("user", {
            user_name : global.user_name,
            room_id : global.room.roomID
        }); //will send username and room details from global
        console.log("its starting"); // just a tesing log
    })
}