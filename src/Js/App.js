import 'regenerator-runtime/runtime'
import { check } from "./Model/login_check";
import login_template from "../views/loginPage.html";

import join_room from "./controler/create_or_join"

const login_load = () => {
    //adding login templat to main window
    document.getElementById("center_left").innerHTML = login_template;

    // Checking for user
    document.getElementById("btn").addEventListener("click", check);
}



// initialising app
document.onload = login_load();