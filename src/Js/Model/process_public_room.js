import axios from "axios";
import { public_rooms } from "../Global";
import { change_element, change_page } from "../controler/change_page";
import { joinPublicRoom } from "./join_public_room";
import { loder } from "../views/Icons/loader";

export const process_public_room_list = async () => {
  // the loading screan before loading public room list
  // change_element("ul_pub_room","LOADING")
  change_element("ul_pub_room", loder);

  // GET request to public rooms api
  const pb_room_list = await axios
    .get("http://localhost:3000/rooms/public")
    .catch((err) => console.log(err.data));

  if (pb_room_list.data.length !== 0) {
    change_element("ul_pub_room", "");
    // Creating list elements if leangth is more then 0
    const ui = document.getElementById("ul_pub_room");
    pb_room_list.data.forEach((val) => {
      public_rooms.push(val); // Pushing public rooms to global clint side
      // Old way to display the list of public rooms
      // let li = document.createElement('li');
      // ui.appendChild(li)
      // li.innerHTML += val.roomName

      // Desplaying public room list (new way)
      let element = `<li id=${val.roomID}>${val.roomName}</li>`;
      ui.insertAdjacentHTML("beforeend", element);
      joinPublicRoom();
    });
  } else {
    // else error handling
    change_element("ul_pub_room", "Not Found");
  }
};
