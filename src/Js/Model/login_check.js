import create_or_join from "../../views/create_or_join.html";

export const check = () => {
    // console.log("checked");
    document.getElementById("center_left").innerHTML = create_or_join;
}
