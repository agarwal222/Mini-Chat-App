import { global } from "../Global";
import axios from "axios";

export const create_new_room = async () => {
    const post_new_room = await axios.post("http://localhost:3000/rooms",{
            userName : global.user_name,
            email : global.email,
            roomName: global.room.roomName,
            roomID : global.room.roomID,
            isPrivate : global.room.isPrivate
        }).catch( err => ( console.log(err)))

        console.log(post_new_room);
}