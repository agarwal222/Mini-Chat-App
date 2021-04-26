import { global } from "../Global";
import { create_new_room } from "../Model/create_new_room";
import { change_element, change_page } from "./change_page";
import { chatRoom } from "../views/chatRoom";
import { chat_room_start } from "../Model/send_msg";
import { loder } from "../views/Icons/loader";

export const creat_room_cnt = () => {
    document.getElementById("creat_room").addEventListener("click", () => {
        const roomName = document.getElementById("room_name").value
        const isPrivate = document.getElementById("private_room")
        change_element("center_left", loder)
        const Id = Date.now()
        if(isPrivate.checked){
            global.room.roomName = roomName
            global.room.roomID = Id
            global.room.isPrivate = true
            create_new_room();
            console.log(global);
            change_page("center_left", chatRoom , chat_room_start)
        }else{
            global.room.roomName = roomName
            global.room.roomID = Id
            global.room.isPrivate = false
            console.log(global);
            create_new_room();
            change_page("center_left", chatRoom , chat_room_start)
        }
    })
}