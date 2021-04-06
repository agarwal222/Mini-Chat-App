import { change_page } from "./change_page"
import { publicRoomList } from "../views/publicRoomsList";
import { process_public_room_list } from "../Model/process_public_room";

 export const join_room_cnt = () => {
    console.log("join room clicked")
    change_page("center_right", publicRoomList,process_public_room_list)
}
