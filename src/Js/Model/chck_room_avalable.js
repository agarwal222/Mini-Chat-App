import axios from "axios";
import { global } from "../Global";
import { change_page } from "../controler/change_page";
import { chatRoom } from "../views/chatRoom";
import { chat_room_start } from "../Model/send_msg";

export const check_room_avalable = async (iD) => {
  const room_check = await axios
    .post(`https://invincible-factual-rake.glitch.me/checkroom`, {
      roomID: iD,
      email: global.email,
    })
    .catch((err) => console.log(err));
  if (room_check.status == 200) {
    global.room.roomName = room_check.data.roomName;
    global.room.roomID = room_check.data.roomID;
    global.room.isPrivate = room_check.data.isPrivate;
    change_page("center_left", chatRoom, chat_room_start);
  } else if (room_check.status == 500) {
    console.log("not found error");
  }

  console.log(global);
};
