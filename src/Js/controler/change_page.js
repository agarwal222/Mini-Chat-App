export const change_page = (res = 200, next, methon) => {
    if(res == 200) {
        document.getElementById("center_left").innerHTML = next;
        methon();
    }
}