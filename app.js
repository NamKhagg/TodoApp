const inputTask = document.querySelector(".input");
const addButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");

console.log(inputTask);

function addTask() {
    console.log(inputTask.value);

    const todoItem = document.createElement("div");

    todoItem.className = "todo-item";

    todoItem.innerHTML = `
            <div class="checkbox"></div>
            <div class="content-item"></div>
            <div class="delete-btn">X</div>
        `;

    const contentItem = todoItem.querySelector(".content-item")

    contentItem.textContent = inputTask.value;
    todoList.appendChild(todoItem);

    inputTask.value = "";
}

// Add task 
addButton.addEventListener("click", addTask);
