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
    const inputPartecipanti = document.getElementById("inputPartecipanti");

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
        const nome = inputPartecipanti.value.trim();
        if (nome !== "") {
            const spanPartecipante = document.createElement("span");
            spanPartecipante.classList.add("spanPartecipanti");

            const pPartecipante = document.createElement("p");
            pPartecipante.textContent = nome;
            pPartecipante.classList.add("pPartecipante");

            const rimuoviButton = document.createElement("button");
            rimuoviButton.textContent = "Rimuovi";
            rimuoviButton.type = "button";
            rimuoviButton.addEventListener("click", () => {
                containerPartecipanti.removeChild(spanPartecipante);
            });

            spanPartecipante.appendChild(pPartecipante);
            spanPartecipante.appendChild(rimuoviButton);

            containerPartecipanti.insertBefore(spanPartecipante, inputPartecipanti);

            inputPartecipanti.value = "";
        }
    });

    // Blocca il submit quando si preme "Invio"
    document.getElementById("creaViaggioForm").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

    // Validazione completa al submit
    document.getElementById("creaViaggioForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Recupera valori (p o input)
        const nomeViaggio = document.getElementById("pNomeViaggio")?.textContent || document.getElementById("inputNomeViaggio")?.value.trim();
        const pPartecipantiNodes = containerPartecipanti.querySelectorAll(".pPartecipante");
        const partecipanti = Array.from(pPartecipantiNodes).map(p => p.textContent.trim()).filter(p => p !== "");        
        const destinazione = document.getElementById("inputDestinazione").value.trim();
        const dataInizio = document.getElementById("inputDataInizio").value;
        const dataFine = document.getElementById("inputDataFine").value;
        const conto = document.getElementById("inputConto").value.trim();
        const trasporto = document.getElementById("inputTrasporto").value.trim();
        const alloggio = document.getElementById("inputAlloggio").value.trim();
        const attivita = document.getElementById("inputAttivita").value.trim();

        // Verifica che tutti i campi siano compilati
        if (!nomeViaggio || partecipanti.length === 0 || !destinazione || !dataInizio || !dataFine || !conto || !trasporto || !alloggio || !attivita) {
            alert("Compila tutti i campi prima di salvare.");
            return;
        }        

        // Verifica che la data di inizio non sia dopo la data di fine
        if (new Date(dataInizio) > new Date(dataFine)) {
            alert("La data di inizio non può essere successiva alla data di fine.");
            return;
        }

        const viaggio = {
            nomeViaggio,
            partecipanti, // è un array
            destinazione,
            dataInizio,
            dataFine,
            conto,
            trasporto,
            alloggio,
            attivita,
            organizzatore: localStorage.getItem("username")
        };        

        alert("Viaggio salvato con successo!");
        window.location.href = "home.html";
    });
});