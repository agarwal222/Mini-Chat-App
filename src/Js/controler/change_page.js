export const change_page = (res, next, methon) => {
    if(res == 200) {
        document.getElementById("center_left").innerHTML = next;
        methon();
    }
}