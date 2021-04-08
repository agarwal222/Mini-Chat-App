import { io } from "socket.io-client";

export const chat_room_start = () => {
    const socket = io("http://localhost:3000");
    // establishing connetion
    socket.on("connect", () => {
        socket.emit("user", "username and room detail here"); //will send username and room details from global
        console.log("its starting"); // just a tesing log
    })
}