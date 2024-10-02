// JavaScript for client-side interaction
document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();

    const form = document.getElementById("todo-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = document.getElementById("task").value;

        if (task) {
            addTask(task);
        }
    });
});

function fetchTasks() {
    fetch('fetch_tasks.php')
        .then(response => response.json())
        .then(tasks => {
            const todoList = document.getElementById("todo-list");
            todoList.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `<span>${task.task}</span> <button onclick="deleteTask(${task.id})">Delete</button>`;
                todoList.appendChild(li);
            });
        });
}

function addTask(task) {
    fetch('add_task.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            document.getElementById("task").value = "";
            fetchTasks();
        }
    });
}

function deleteTask(id) {
    fetch(`delete_task.php?id=${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                fetchTasks();
            }
        });
}
