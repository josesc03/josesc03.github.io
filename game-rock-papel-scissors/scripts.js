
window.addEventListener("DOMContentLoaded", () => {
    var content = document.querySelector("content");
    var zoominuserselect = document.getElementById("zoominuserselect");
    var zoominuser = document.getElementById("zoominuser");
    var zoomincomp = document.getElementById("zoomincomp");
    var zoomout = document.getElementById("zoomout");


    zoominuserselect.addEventListener("click", zoomInUserSelect);
    zoominuser.addEventListener("click", zoomInUser);
    zoomincomp.addEventListener("click", zoomInComp);
    zoomout.addEventListener("click", zoomOut)

    function zoomInUserSelect() {
        console.log("transforming")
        content.style.transform = "translateX(-45%) scale(2)";
    }

    function zoomInUser() {
        console.log("transforming")
        content.style.transform = "translateX(-15%) scale(2)";
    }

    function zoomInComp() {
        console.log("transforming")
        content.style.transform = "translateX(15%) scale(2)";
    }

    function zoomOut() {
        console.log("transforming")
        content.style.transform = "";
    }
    
});