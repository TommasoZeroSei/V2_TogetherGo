const nome = document.getElementById("nome")
const organizzatore = document.getElementById("organizzatore")
const partecipanti = document.getElementById("partecipanti")
const destinazione = document.getElementById("destinazione")
const tempo = document.getElementById("tempo")
const conto = document.getElementById("conto")
const trasporto = document.getElementById("trasporto")
const alloggio = document.getElementById("alloggio")
const attivita = document.getElementById("attivita")
const logoutButton = document.getElementById("logoutButton")

logoutButton.addEventListener('click', function (event) {
    event.preventDefault()
    localStorage.removeItem("username")
    localStorage.removeItem("viaggio")
    window.location.href = "welcome.html"
})

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem("viaggio")) {
        nome.textContent = localStorage.getItem("viaggio")

        const viaggioObject = {viaggio: localStorage.getItem("viaggio"), action: "dettagli"}
        const jsonViaggio = JSON.stringify(viaggioObject)

        fetch("dettagliViaggio.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonViaggio,
        })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                console.log(data)
                if (!data.error) {
                    organizzatore.textContent = data.message.organizzatore
                    partecipanti.textContent = data.message.partecipanti.join(", ")
                    destinazione.textContent = data.message.destinazione
                    tempo.textContent = data.message.tempo.join(", ")
                    conto.textContent = data.message.conto
                    trasporto.textContent = data.message.trasporto
                    alloggio.textContent = data.message.alloggio
                    attivita.textContent = data.message.attivita
                }
            })
            .catch(function(error) {
                console.error(error)
            });
    } else {
        alert("Sessione scaduta! Effettua nuovamente il login.")
        window.location.href = "welcome.html"
    }
})