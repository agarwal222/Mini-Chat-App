import { change_element, change_page } from "./change_page"
import { publicRoomList } from "../views/publicRoomsList";
import { process_public_room_list } from "../Model/process_public_room";
import { check_room_avalable } from "../Model/chck_room_avalable";
import { loder } from "../views/Icons/loader";

 export const join_room_cnt = () => {
    console.log("join room clicked")
    document.getElementById("join_room_id").addEventListener("click", () => {
        const idInput = document.getElementById("room_id")
        const inputVal = idInput.value
        change_element("center_left", loder)
        check_room_avalable(inputVal);
    })
    change_page("center_right", publicRoomList,process_public_room_list)
}
