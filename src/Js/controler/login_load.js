import { check } from "../Model/login_check";
import { LoginPage } from "../views/loginPage";
import { info_card_login, info_card_name } from "./info_cards_cnt";

export const login_load = () => {
  // adding login templat to main window
  document.getElementById("center_left").innerHTML = LoginPage;
  info_card_login();
  info_card_name();

  // Checking for user
  document.getElementById("btn").addEventListener("click", check);
};
