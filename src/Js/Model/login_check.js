import axios from 'axios';
import {CreatOrJoin} from "../views/createOrJoin";
import {change_element, change_page} from "../controler/change_page";
import { global } from "../Global";
import { creat_or_join_room } from "../controler/create_or_join";
import {LoginPage} from "../views/loginPage";
import { login_load } from "../controler/login_load";
import { loder } from "../views/Icons/loader";


export const check = async () => {

    // getting the data page 
    global.user_name = document.getElementById("display_name").value
    global.email = document.getElementById("email").value

    // the loading screan before call is done
    change_element("center_left", loder)

    // Validating email
    const valifateEmail = email => {
        const mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        if (email.match(mailformat)) {
            return true
        }else{
            return false
        }
    }

    // Making the POST API call
    if(global.user_name && global.email){
        if (valifateEmail(global.email)) {
            const promis = await axios.post("http://localhost:3000/users",{
                user_name: global.user_name,
                email : global.email
            })
            .then((res) => {
                change_page("center_left",CreatOrJoin,creat_or_join_room)
            })
            .catch( err => {
                change_page("center_left",LoginPage,login_load);
                document.getElementById("err").innerHTML = "User already exist";
            })
        }else{
            change_page("center_left",LoginPage,login_load);
            document.getElementById("err").innerHTML = "It should be an email";
        }
        
    }else{
        change_page("center_left",LoginPage,login_load);
        document.getElementById("err").innerHTML = "Can't be empty";
    }

    // Changing screan if promis resolve in success
    // if(promis.status == 200) {
    //     document.getElementById("center_left").innerHTML = create_or_join;
    // }

}
