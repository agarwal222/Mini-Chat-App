import { joinRoom } from "../Model/Join_room";
import { creatRoom } from "../Model/creat_room";

export const join_room = () => {
    document.getElementById("join_room").addEventListener("click", joinRoom)
    document.getElementById("creat_room").addEventListener("click", creatRoom)
}
