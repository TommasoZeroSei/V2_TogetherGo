document.addEventListener('DOMContentLoaded', function () {
    // Controllo sessione
    const organizzatore = document.getElementById("organizzatore");
    if (localStorage.getItem("username")) {
        organizzatore.textContent = localStorage.getItem("username");
    } else {
        alert("Sessione scaduta! Effettua nuovamente il login.");
        window.location.href = "welcome.html";
    }

    // Logout
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("viaggio");
        window.location.href = "welcome.html";
    });

    // Riferimenti agli elementi DOM
    const buttonNomeViaggio = document.getElementById("buttonNomeViaggio");
    const containerNomeViaggio = document.getElementById("containerNomeViaggio");

    const buttonPartecipanti = document.getElementById("buttonPartecipanti");
    const containerPartecipanti = document.getElementById("containerPartecipanti");

    // Gestione Nome viaggio
    buttonNomeViaggio.addEventListener("click", () => {
        if (buttonNomeViaggio.textContent === "Aggiungi") {
            const inputNomeViaggio = document.getElementById("inputNomeViaggio");
            if (inputNomeViaggio && inputNomeViaggio.value.trim() !== "") {
                const pNomeViaggio = document.createElement("p");
                pNomeViaggio.textContent = inputNomeViaggio.value;
                pNomeViaggio.id = "pNomeViaggio";
                containerNomeViaggio.replaceChild(pNomeViaggio, inputNomeViaggio);
                buttonNomeViaggio.textContent = "Modifica";
            } else {
                alert("Inserisci un nome viaggio valido");
            }
        } else if (buttonNomeViaggio.textContent === "Modifica") {
            const pNomeViaggio = document.getElementById("pNomeViaggio");
            if (pNomeViaggio) {
                const inputNomeViaggio = document.createElement("input");
                inputNomeViaggio.type = "text";
                inputNomeViaggio.value = pNomeViaggio.textContent;
                inputNomeViaggio.id = "inputNomeViaggio";
                containerNomeViaggio.replaceChild(inputNomeViaggio, pNomeViaggio);
                buttonNomeViaggio.textContent = "Aggiungi";
                inputNomeViaggio.focus();
            }
        }
    });

    // Gestione Partecipanti
    buttonPartecipanti.addEventListener("click", () => {
        if (buttonPartecipanti.textContent === "Aggiungi") {
            const inputPartecipanti = document.getElementById("inputPartecipanti");
            if (inputPartecipanti && inputPartecipanti.value.trim() !== "") {
                const pPartecipanti = document.createElement("p");
                pPartecipanti.textContent = inputPartecipanti.value;
                pPartecipanti.id = "pPartecipanti";
                containerPartecipanti.replaceChild(pPartecipanti, inputPartecipanti);
                buttonPartecipanti.textContent = "Modifica";
            } else {
                alert("Inserisci almeno un partecipante");
            }
        } else if (buttonPartecipanti.textContent === "Modifica") {
            const pPartecipanti = document.getElementById("pPartecipanti");
            if (pPartecipanti) {
                const inputPartecipanti = document.createElement("input");
                inputPartecipanti.type = "text";
                inputPartecipanti.value = pPartecipanti.textContent;
                inputPartecipanti.id = "inputPartecipanti";
                containerPartecipanti.replaceChild(inputPartecipanti, pPartecipanti);
                buttonPartecipanti.textContent = "Aggiungi";
                inputPartecipanti.focus();
            }
        }
    });
});