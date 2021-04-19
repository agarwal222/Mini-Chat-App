import { io } from "socket.io-client";
import { global } from "../Global";
// import { send_msg } from "../Model/send_msg";
// import { ws_con } from "../socket_connect";


export const chat_room_start = () => {
    const socket = io("http://localhost:3000");

    // Method to send msg objct to server
    const msg_request_method = () => {
        // Grabing Value from input field
        const msg_input = document.getElementById("chat_msh")
        let msg = msg_input.value

        // Sending msg package to server
        socket.emit("msg_req" , {
            "userName": global.user_name,
            "roomID" : global.room.roomID,
            "message" : msg
        });

        // emptying the input area
        msg_input.value = "";
    }

    // Receaving msg response
    socket.on("msg_res", (msg) => {
        console.log(msg);
        const contaner = document.getElementById("chat_contaner")
        let classes = ""

        // Cheaking username
        if (msg.userName == global.user_name) {
            classes = `"me msg_contaner"`;
        }

        const chat_msg = `
            <div class=${classes}>
                <h5 class="user_name">${msg.userName}</h5>
                <div class="msg">${msg.message}</div>
            </div>`

        // Incering child elements
        contaner.insertAdjacentHTML('beforeend', chat_msg);
    })


    // Event Listners for sending msg
    document.getElementById("chat_send_btn").addEventListener("click", msg_request_method)
    
    // establishing connetion
    socket.on("connect", () => {
        socket.emit("user", {
            user_name : global.user_name,
            room_id : global.room.roomID
        }); //will send username and room details from global

        console.log("its starting"); // just a tesing log
    })

}