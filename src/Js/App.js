import 'regenerator-runtime/runtime'
import { check } from "./Model/login_check";
import {LoginPage} from "./views/loginPage";
// import { join_room } from "./controler/create_or_join";

const login_load = () => {
    // adding login templat to main window
    document.getElementById("center_left").innerHTML = LoginPage;

    // Checking for user
    document.getElementById("btn").addEventListener("click", check);
}

// initialising app
document.onload = login_load();