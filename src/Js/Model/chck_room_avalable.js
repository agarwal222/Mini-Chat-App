import axios from "axios";
import { global } from "../Global";

export const check_room_avalable = async (iD) => {
    const room_check = await axios.post("http://localhost:3000/checkroom",{
        roomID: iD,
        userName: global.user_name
    }).catch( err => ( console.log(err)))
    if (room_check.status == 200) {
        global.room.roomName = room_check.data.roomName
        global.room.roomID = room_check.data.roomID
        global.room.isPrivate = room_check.data.isPrivate
    }else if(room_check.status == 500){
        console.log("not found error");
    }

    console.log(global);
}