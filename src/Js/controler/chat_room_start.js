// import { io } from "socket.io-client";
// import { global } from "../Global";
// // import { send_msg } from "../Model/send_msg";
// // import { ws_con } from "../socket_connect";


// export const chat_room_start = () => {
//     const socket = io("http://localhost:3000");

//     // Event Listners
//     document.getElementById("chat_send_btn").addEventListener("click", () => {
//         // Grabing Value from input field
//         const msg = document.getElementById("chat_msh").value
//         socket.emit("msg_req" , msg);
//         console.log(msg);  
//     })
    
//     // establishing connetion
//     socket.on("connect", () => {
//         socket.emit("user", {
//             user_name : global.user_name,
//             room_id : global.room.roomID
//         }); //will send username and room details from global

//         console.log("its starting"); // just a tesing log
//     })

// }