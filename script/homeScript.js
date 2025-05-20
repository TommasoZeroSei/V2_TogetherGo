const welcomeHome = document.getElementById("welcomeHome")
const viaggiParent = document.getElementById("viaggiParent")
const textSenzaViaggi = document.getElementById("textSenzaViaggi")
const logoutButton = document.getElementById("logoutButton")

logoutButton.addEventListener('click', function (event) {
    event.preventDefault()
    localStorage.removeItem("username")
    localStorage.removeItem("viaggio")
    window.location.href = "welcome.html"
})

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem("username")) {
        welcomeHome.textContent = "I viaggi di " + localStorage.getItem("username")

        const usernameObject = {username: localStorage.getItem("username"), action: "elenco"}
        const jsonUsername = JSON.stringify(usernameObject)

        fetch("viaggi.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonUsername,
        })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                console.log(data)
                if (!data.error) {
                    textSenzaViaggi.remove()
                    Object.entries(data).forEach(([nome, organizzatore]) => {
                        const item = document.createElement("button")
                        item.classList.add("itemViaggio")
                        viaggiParent.appendChild(item)
                        if (organizzatore) {
                            item.textContent = "- " + nome + " (created by " + organizzatore + ")"
                        } else {
                            item.textContent = "- " + nome
                        }

                        item.addEventListener('click', function (event) {
                            event.preventDefault()
                            localStorage.setItem("viaggio", nome)
                            window.location.href = "visualizzaViaggio.html"
                        })
                    });
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