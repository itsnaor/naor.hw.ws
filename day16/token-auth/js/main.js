const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const $ = {
    main: document.querySelector("main"),
    email: document.getElementById("email"),
    pass: document.getElementById("pass"),
}

const users = localStorage.getItem("users");
let usersJSON = users ? JSON.parse(users) : [];

let user = localStorage.getItem("user");
let userJSON = user ? JSON.parse(user) : {};

tokenLogin();

function login() {

    if ($.email.value && $.pass.value) {
        const uniqueToken = generateToken();

        const newUser = {
            email: $.email.value,
            pass: $.pass.value,
            token: uniqueToken
        }

        for (let i = 0; i < usersJSON.length; i++) {
            const u = usersJSON[i];

            if (u.email === newUser.email && u.pass === newUser.pass) {
                newUser.fName = usersJSON[i].fName;
                usersJSON[i] = newUser;

                localStorage.setItem("user", JSON.stringify(newUser))
                localStorage.setItem("users", JSON.stringify(usersJSON));

                $.main.innerHTML = `Welcome ${u.fName}`;

                break
            }
        }

    } else {
        alert("Fill the all fields please.");
    }
}

function tokenLogin() {
    const uniqueToken = generateToken();

    for (let i = 0; i < usersJSON.length; i++) {
        const u = usersJSON[i];

        if (userJSON.email === u.email && userJSON.token === u.token) {
            u.token = uniqueToken;
            usersJSON[i] = u;

            localStorage.setItem("user", JSON.stringify(u))
            localStorage.setItem("users", JSON.stringify(usersJSON));

            $.main.innerHTML = `Welcome Back ${u.fName}`;

            break
        }
    }
}

function generateToken() {
    let token = '';

    for (let i = 0; i < 15; i++) {
        const number = new Date().getTime() % 100;
        const random = parseInt(Math.random() * chars.length);

        let randomIndex = number > random ? number - random : random - number;

        if (randomIndex > chars.length - 1) {
            randomIndex -= 37;
        }

        const char = chars[randomIndex]
        token += char;
    }

    return token;
}

const usersDB = [
    {
        fName: "naor",
        email: "naor@walla.com",
        pass: "naor12",
        token: ""
    },
    {
        fName: "naor21",
        email: "naor21@walla.com",
        pass: "2121",
        token: ""
    },
    {
        fName: "Jimmy",
        email: "jimmy@walla.com",
        pass: "jimmy123",
        token: ""
    },
    {
        fName: "dana",
        email: "danna@walla.com",
        pass: "1234",
        token: ""
    }
]

for (let i = 0; i < usersDB.length; i++) {
    const user = usersDB[i];
    user.token = generateToken();
}

localStorage.setItem("users", JSON.stringify(usersDB))