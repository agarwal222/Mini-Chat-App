import { join_room_cnt } from "./Join_room_cnt";
import { creat_room_cnt } from "./creat_room_cnt";
import { change_page } from "./change_page";
import { creatRoom } from "../views/creatRoom";
import { joinRoom } from "../views/joinRoom";

export const creat_or_join_room = () => {
    document.getElementById("join_room").addEventListener("click", () => {
        change_page("center_left", joinRoom, join_room_cnt)
    })
    document.getElementById("creat_room").addEventListener("click", () => {
        change_page("center_left", creatRoom, creat_room_cnt)
    })
}
