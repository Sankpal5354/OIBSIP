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