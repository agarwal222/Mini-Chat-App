import axios from "axios";
import { CreatOrJoin } from "../views/createOrJoin";
import { change_element, change_page } from "../controler/change_page";
import { global } from "../Global";
import { creat_or_join_room } from "../controler/create_or_join";
import { LoginPage } from "../views/loginPage";
import { login_load } from "../controler/login_load";
import { loder } from "../views/Icons/loader";

export const check = async () => {
  // getting the data page
  global.user_name = document.getElementById("display_name").value;
  global.email = document.getElementById("email").value;

  // the loading screan before call is done
  change_element("center_left", loder);

  // Validating email
  const valifateEmail = (email) => {
    const mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (mailformat.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  // Making the POST API call
  if (global.user_name && global.email) {
    if (valifateEmail(global.email)) {
      const promis = await axios
        .post(`https://invincible-factual-rake.glitch.me/users`, {
          user_name: global.user_name,
          email: global.email,
        })
        .then((res) => {
          change_page("center_left", CreatOrJoin, creat_or_join_room);
        })
        .catch((err) => {
          change_page("center_left", LoginPage, login_load);
          document.getElementById("err").innerHTML = "User already exist";
          console.log(`https://invincible-factual-rake.glitch.me}/users`);
        });
    } else {
      change_page("center_left", LoginPage, login_load);
      document.getElementById("err").innerHTML = "It should be an email";
    }
  } else {
    change_page("center_left", LoginPage, login_load);
    document.getElementById("err").innerHTML = "Can't be empty";
  }

  // Changing screan if promis resolve in success
  // if(promis.status == 200) {
  //     document.getElementById("center_left").innerHTML = create_or_join;
  // }
};
