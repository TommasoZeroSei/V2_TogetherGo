const organizzatore = document.getElementById("organizzatore")
const logoutButton = document.getElementById("logoutButton")

logoutButton.addEventListener('click', function (event) {
    event.preventDefault()
    localStorage.removeItem("username")
    localStorage.removeItem("viaggio")
    window.location.href = "welcome.html"
})

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem("username")) {
        organizzatore.textContent = localStorage.getItem("username")


    } else {
        alert("Sessione scaduta! Effettua nuovamente il login.")
        window.location.href = "welcome.html"
    }
})