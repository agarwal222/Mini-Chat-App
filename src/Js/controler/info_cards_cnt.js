import { emailInfo, nameInfo } from "../views/infoCards";
import { change_element } from "./change_page";

export const info_card_login = () => {
  document.getElementById("email_info_card").addEventListener("click", () => {
    change_element("center_right", emailInfo);
  });
};

export const info_card_name = () => {
  document.getElementById("name_info_card").addEventListener("click", () => {
    change_element("center_right", nameInfo);
  });
};
