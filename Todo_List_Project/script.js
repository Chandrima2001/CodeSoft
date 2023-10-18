document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const taskList = document.getElementById("task-list");
    const newRow = taskList.insertRow(-1);
    const serialCell = newRow.insertCell(0);
    const taskCell = newRow.insertCell(1);
    const editCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "Done";
    editButton.addEventListener("click", () => {
        toggleCompleted(newRow); // Call the function to toggle completed
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        taskList.deleteRow(newRow.rowIndex);
        updateSerialNumbers();
        removeTask(taskText);
    });

    serialCell.textContent = taskList.rows.length - 1;
    taskCell.textContent = taskText;
    newRow.dataset.completed = "false"; // Set the initial dataset
    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);

    saveTask(taskText);
    taskInput.value = "";
}

function updateSerialNumbers() {
    const taskList = document.getElementById("task-list");
    const rows = taskList.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const serialCell = rows[i].cells[0];
        serialCell.textContent = i;
    }
}

function toggleCompleted(row) {
    const taskCell = row.cells[1];
    const isCompleted = row.dataset.completed === "true";
    row.dataset.completed = isCompleted ? "false" : "true";
    taskCell.style.textDecoration = isCompleted ? "none" : "line-through";
}

function saveTask(taskText) {
    const tasks = getSavedTasks();
    tasks.push(taskText);
    saveTasksToLocalStorage(tasks);
}

function removeTask(taskText) {
    const tasks = getSavedTasks();
    const index = tasks.indexOf(taskText);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage(tasks);
    }
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getSavedTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
}

function loadTasks() {
    const tasks = getSavedTasks();
    const taskList = document.getElementById("task-list");

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i];
        const newRow = taskList.insertRow(-1);
        const serialCell = newRow.insertCell(0);
        const taskCell = newRow.insertCell(1);
        const editCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);

        const editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            toggleCompleted(newRow); // Call the function to toggle completed
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList.deleteRow(newRow.rowIndex);
            updateSerialNumbers();
            removeTask(taskText);
        });

        serialCell.textContent = taskList.rows.length - 1;
        taskCell.textContent = taskText;
        newRow.dataset.completed = "false"; // Set the initial dataset
        editCell.appendChild(editButton);
        deleteCell.appendChild(deleteButton);
    }
}
