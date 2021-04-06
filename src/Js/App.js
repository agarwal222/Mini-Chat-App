import 'regenerator-runtime/runtime'
// import { check } from "./Model/login_check";
// import {LoginPage} from "./views/loginPage";
import { login_load } from "./controler/login_load";
// import { join_room } from "./controler/create_or_join";

// initialising app
document.onload = login_load();