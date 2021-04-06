export const change_page = (res, next, methon) => {
    console.log(res);
    document.getElementById(res).innerHTML = next;
    methon();
}