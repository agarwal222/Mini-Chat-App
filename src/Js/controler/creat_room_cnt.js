import { global } from "../Global";
import { create_new_room } from "../Model/create_new_room";

export const creat_room_cnt = () => {
    document.getElementById("creat_room").addEventListener("click", () => {
        const roomName = document.getElementById("room_name").value
        const isPrivate = document.getElementById("private_room")
        const Id = Date.now()
        if(isPrivate.checked){
            global.room.roomName = roomName
            global.room.roomID = Id
            global.room.isPrivate = true
            create_new_room();
            console.log(global);
        }else{
            global.room.roomName = roomName
            global.room.roonID = Id
            global.room.isPrivate = false
            console.log(global);
            create_new_room();
        }
    })
}