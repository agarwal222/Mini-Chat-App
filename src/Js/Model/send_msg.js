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

        // message parser so that no HTML or JS code can be injected in the chat to prevent XSS
        function escapeRegExp(string) {
            let p1 = string.replace(/</gi, '&lt');
            let p2 = p1.replace(/>/gi, '&gt');
            let p3 = p2.replace(/[.*+?^${}()|[\]\\]/gi, '\\$&')
            return p3
        }

        let messg = escapeRegExp(msg.toString());

        // Sending msg package to server
        socket.emit("msg_req" , {
            "email": global.email,
            "userName": global.user_name,
            "roomID" : global.room.roomID,
            "message" : messg
        });

        // emptying the input area
        msg_input.value = "";
    }

    // Receaving msg response
    socket.on("msg_res", (msg) => {
        console.log(msg);
        const contaner = document.getElementById("chat_contaner")
        let classes = "msg_contaner"

        // Cheaking username
        msg.email == global.email ? classes = `"me msg_contaner"` : classes = "msg_contaner"

        const chat_msg = `
            <div class=${classes}>
                <h5 class="user_name">${msg.userName}</h5>
                <div class="msg">${msg.message}</div>
            </div>`

        // Incering child elements
        contaner.insertAdjacentHTML('beforeend', chat_msg);

        // Scrolling to the last msg 
        let ele = document.getElementsByClassName("msg_contaner");
        let last_ele = ele.length-1;
        ele[last_ele].scrollIntoView(true);
        // console.log(ele[last_ele]);
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