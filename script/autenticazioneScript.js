const loginModel = {
    username: "",
    password: "",
    action: "login",
    validation() {
        const errors = {}
        if (!this.username) errors.username = "Username richiesto"
        if (!this.password) errors.password = "Password richiesta"
        return errors
    }
}
const registrazioneModel = {
    username: "",
    email: "",
    password: "",
    action: "registrazione",
    validation() {
        const errors = {}
        if (!this.username) errors.username = "Username richiesto"
        if (!this.email) errors.email = "Email richiesta"
        if (!this.password) errors.password = "Password richiesta"
        return errors
    }
}

const loginForm = document.getElementById("login")
const usernameLogin = document.getElementById("usernameLogin")
const passwordLogin = document.getElementById("passwordLogin")
const errorLogin = document.getElementById("errorLogin")
const registrazioneForm = document.getElementById("registrazione")
const usernameRegistrazione = document.getElementById("usernameRegistrazione")
const emailRegistrazione = document.getElementById("emailRegistrazione")
const passwordRegistrazione = document.getElementById("passwordRegistrazione")
const errorRegistrazione = document.getElementById("errorRegistrazione")

loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    loginModel.username = usernameLogin.value.trim()
    loginModel.password = passwordLogin.value.trim()

    const errors = loginModel.validation()
    if (Object.keys(errors).length === 0) {
        const jsonLogin = JSON.stringify(loginModel)

        fetch("autenticazione.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonLogin,
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                if (data.error) {
                    errorLogin.textContent = data.error
                } else {
                    localStorage.setItem("username", loginModel.username)
                    window.location.href = "home.html"
                }
            })
            .catch(function (error) {
                console.error(error)
                errorLogin.textContent = error.message
            });
    }
})

registrazioneForm.addEventListener('submit', function (event) {
    event.preventDefault()

    registrazioneModel.username = usernameRegistrazione.value.trim()
    registrazioneModel.email = emailRegistrazione.value.trim()
    registrazioneModel.password = passwordRegistrazione.value.trim()

    const errors = registrazioneModel.validation()
    if (Object.keys(errors).length === 0) {
        const jsonRegistrazione = JSON.stringify(registrazioneModel)

        fetch("autenticazione.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonRegistrazione,
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                if (data.error) {
                    errorRegistrazione.textContent = data.error
                } else {
                    localStorage.setItem("username", registrazioneModel.username)
                    window.location.href = "home.html"
                }
            })
            .catch(function (error) {
                console.error(error)
                errorRegistrazione.textContent = error.message
            });
    }
})

loginForm.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
    }
})

registrazioneForm.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
    }
})