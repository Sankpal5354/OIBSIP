<<<<<<< HEAD
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
=======
document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const priority = document.getElementById("priority");

const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

addTaskBtn.addEventListener("click", addTask);

function addTask() {

    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    const priorityValue = priority.value;

if(priorityValue === "Low"){
    li.classList.add("low");
}
else if(priorityValue === "Medium"){
    li.classList.add("medium");
}
else{
    li.classList.add("high");
}

    li.innerHTML = `
        <div class="task-info">
            <strong>${taskInput.value}</strong>
            <span>${taskDate.value}</span>
            <span class="priority">${priority.value} Priority</span>
        </div>

        <div class="task-buttons">
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    pendingTasks.appendChild(li);

    addSingleTaskListeners(li);

    saveTasks();

    taskInput.value = "";
    taskDate.value = "";
}

function addSingleTaskListeners(li) {

    const completeBtn = li.querySelector(".complete-btn");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    if (completeBtn) {
        completeBtn.addEventListener("click", () => {
            completedTasks.appendChild(li);
            completeBtn.remove();
            saveTasks();
        });
    }

    editBtn.addEventListener("click", () => {

        const updatedTask = prompt(
            "Edit your task",
            li.querySelector("strong").innerText
        );

        if (updatedTask !== null) {
            li.querySelector("strong").innerText = updatedTask;
            saveTasks();
        }
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });
}

function saveTasks() {

    localStorage.setItem(
        "pendingTasks",
        pendingTasks.innerHTML
    );

    localStorage.setItem(
        "completedTasks",
        completedTasks.innerHTML
    );
}

function loadTasks() {

    pendingTasks.innerHTML =
        localStorage.getItem("pendingTasks") || "";

    completedTasks.innerHTML =
        localStorage.getItem("completedTasks") || "";

    const allTasks = document.querySelectorAll("li");

    allTasks.forEach((li) => {
        addSingleTaskListeners(li);
    });
}
>>>>>>> 149c1255ccce8fcd2732232dc9f2daa430cb143c
