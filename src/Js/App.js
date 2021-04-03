import { check } from "./Model/login_check";
import login_template from "../views/loginPage.html";

function login_load() {
    document.getElementById("center_left").innerHTML = login_template;
    document.getElementById("btn").addEventListener("click", check);
}

document.onload = login_load();