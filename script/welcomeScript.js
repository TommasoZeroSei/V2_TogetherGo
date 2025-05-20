const voloItems = document.getElementsByClassName("volo")
const hotelItems = document.getElementsByClassName("hotel")
const selectTipo = document.getElementById("selectTipo")
const buttonAccedi = document.getElementById("buttonAccedi")
const buttonRegistrati = document.getElementById("buttonRegistrati")
const loginContainer = document.getElementById("loginContainer")
const buttonBackLogin = document.getElementById("buttonBackLogin")
const registrazioneContainer = document.getElementById("registrazioneContainer")
const buttonBackRegistrazione = document.getElementById("buttonBackRegistrazione")
const imageLogo = document.getElementById("imageLogo")
const itemSemitrasparenza = document.getElementsByClassName("itemSemitrasparenza")
const mostraPasswordLogin = document.getElementById("mostraPasswordLogin")
const mostraPasswordRegistrazione = document.getElementById("mostraPasswordRegistrazione")
const passwordInputLogin = document.getElementById("passwordLogin")
const passwordInputRegistrazione = document.getElementById("passwordRegistrazione")
const buttonCerca = document.getElementById("buttonCerca")

document.addEventListener('DOMContentLoaded', visibilitaBarraRicerca)
selectTipo.addEventListener('change', visibilitaBarraRicerca)

function visibilitaBarraRicerca() {
    if (selectTipo.value === "volo") {
        Array.from(hotelItems).forEach(item => {
            item.style.display = 'none'
        });
        Array.from(voloItems).forEach(item => {
            item.style.display = 'block'
        });
        buttonCerca.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "https://www.skyscanner.it/"
        })
    } else {
        Array.from(hotelItems).forEach(item => {
            item.style.display = 'block'
        });
        Array.from(voloItems).forEach(item => {
            item.style.display = 'none'
        });
        buttonCerca.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.href = "https://www.booking.com"
        })
    }
}

buttonAccedi.addEventListener('click', semitrasparenzaSfondo)
buttonRegistrati.addEventListener('click', semitrasparenzaSfondo)
buttonBackLogin.addEventListener('click', semitrasparenzaSfondo)
buttonBackRegistrazione.addEventListener('click', semitrasparenzaSfondo)

function semitrasparenzaSfondo(event) {
    event.preventDefault()
    if (event.target.getAttribute("class") === "headerItems") {
        Array.from(itemSemitrasparenza).forEach(item => {
            item.classList.add("effettoSemitrasparente")
        })
        buttonAccedi.classList.add("effettoSemitrasparente")
        buttonRegistrati.classList.add("effettoSemitrasparente")
        imageLogo.style.opacity = "0.5";
        if (event.target.id === "buttonAccedi") {
            loginContainer.style.display = "flex";
        } else {
            registrazioneContainer.style.display = "flex"
        }
    } else {
        Array.from(itemSemitrasparenza).forEach(item => {
            item.classList.remove("effettoSemitrasparente")
        })
        buttonAccedi.classList.remove("effettoSemitrasparente")
        buttonRegistrati.classList.remove("effettoSemitrasparente")
        imageLogo.style.opacity = "1";
        loginContainer.style.display = "none";
        registrazioneContainer.style.display = "none";
    }
}

mostraPasswordLogin.addEventListener('click', function (event) {
    event.preventDefault()
    if (passwordInputLogin.getAttribute("type") === 'password') {
        passwordInputLogin.setAttribute("type", 'text');
    } else {
        passwordInputLogin.setAttribute("type", 'password');
    }
})

mostraPasswordRegistrazione.addEventListener('click', function (event) {
    event.preventDefault()
    if (passwordInputRegistrazione.getAttribute("type") === 'password') {
        passwordInputRegistrazione.setAttribute("type", 'text');
    } else {
        passwordInputRegistrazione.setAttribute("type", 'password');
    }
})