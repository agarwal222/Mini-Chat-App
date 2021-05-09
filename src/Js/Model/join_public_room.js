import { check_room_avalable } from "./chck_room_avalable";

export const joinPublicRoom = () => {
  let items = document.querySelectorAll("#ul_pub_room li");
  items.forEach((val, ind, itm) => {
    val.onclick = () => {
      const roomID = parseInt(val.id);
      console.log(val);
      check_room_avalable(roomID);
    };
  });
};
