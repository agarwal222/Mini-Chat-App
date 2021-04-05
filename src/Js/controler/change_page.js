import create_or_join from "../../views/create_or_join.html";

export const change_page = (res, next) => {
    if(res == 200) {
        document.getElementById("center_left").innerHTML = next;
    }
}