import axios from 'axios';
// import create_or_join from "../../views/create_or_join.html";
import change_page from "../controler/change_page";
import global from "../Global";

export const check = async () => {
    // console.log("checked");

        // getting the data deom page 
        global.user_name = document.getElementById("display_name").value
        global.email = document.getElementById("email").value

        // the loading screan before call is done
       document.getElementById("center_left").innerHTML = "Loading...";

       // Making the POST api call
       const promis = await axios.post("http://localhost:3000/users",{
        user_name: global.user_name,
        email : global.email
    }).catch( err => ( console.log(err)))


    change_page(200,"create_or_join")


    // Changing screan if promis resolve in success
    // if(promis.status == 200) {
    //     document.getElementById("center_left").innerHTML = create_or_join;
    // }


    // return promis.status;
}


