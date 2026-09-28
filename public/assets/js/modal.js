var modal = null;

function open_modal(id){
    modal = document.getElementById(id)
    if (!modal) return
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
}
function close_modal(){
    if (!modal) return
    modal.style.display = "none"
    document.body.style.overflow = ""
    // Stop any playing embedded videos
    modal.querySelectorAll("iframe").forEach(function (f) { f.src = f.src })
    modal = null
}
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close_modal()
})
