const message = document.getElementById("message");

function registerUser(){
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === "" || email === "" || password === ""){
        showMessage("Please fill all fields!", "error");
        return;
    }

    if(!email.includes("@") || !email.includes(".")){
        showMessage("Please enter a valid email address!", "error");
        return;
    }

    if(password.length < 6){
        showMessage("Password must be at least 6 characters!", "error");
        return;
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));

    if(existingUser && existingUser.email === email){
        showMessage("User already exists! Please login.", "error");
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    showMessage("Registration Successful 🎉 Now login.", "success");

    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function loginUser(){
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(!storedUser){
        showMessage("No account found! Please register first.", "error");
        return;
    }

    if(email === storedUser.email && password === storedUser.password){
        localStorage.setItem("isLoggedIn", "true");
        showMessage("Login Successful ✅", "success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 900);
    }
    else{
        showMessage("Invalid email or password!", "error");
    }
}

function togglePassword(){
    const passwordInput = document.getElementById("password");

    if(passwordInput.type === "password"){
        passwordInput.type = "text";
    }
    else{
        passwordInput.type = "password";
    }
}

function toggleTheme(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
}

function showMessage(text, type){
    message.innerText = text;
    message.className = type;
}

window.onload = function(){
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");
    }
};