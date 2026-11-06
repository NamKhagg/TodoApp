const inputTask = document.querySelector(".input");
const addButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");

let list = [];

function saveList() {
    const listStringify = JSON.stringify(list);

    localStorage.setItem("todoList", listStringify);
}

function loadList() {
    const savedData = localStorage.getItem("todoList");

    list = JSON.parse(savedData) || [];
}

// Vẽ task ra màn hình
function renderTask() {

    todoList.innerHTML = "";

    list.forEach((task) => {
        const todoItem = document.createElement("div");

        todoItem.className = "todo-item";
        todoItem.dataset.id = task.taskId;

        todoItem.innerHTML = `
            <div class="checkbox">
                <div class="checkmark">✔</div>
            </div>
            <div class="content-item"></div>
            <div class="delete-btn">X</div>
        `;

        if (task.isChecked) {
            todoItem.classList.add("checked");
        }

        const contentItem = todoItem.querySelector(".content-item")

        contentItem.textContent = task.taskName;

        const deleteButton = todoItem.querySelector(".delete-btn");

        console.log(deleteButton);

        deleteButton.addEventListener("click", () => deleteTask(task.taskId));

        const checkboxButton = todoItem.querySelector(".checkbox");

        checkboxButton.addEventListener("click", () => {
            const newList = list.map((taskInList) => {
                if (taskInList.taskId === task.taskId) {
                    return {
                        ...taskInList,
                        "isChecked" : !taskInList.isChecked
                    }
                } 
                return taskInList
            })

            list = newList;
            saveList();
            renderTask();

            console.log(checkboxButton);

        })

        todoList.appendChild(todoItem);
    })
}

// function markDone(element) {
//     element.classList.add("checked");
// }

function addTask() {
    console.log(inputTask.value);

    if (inputTask.value.trim() === "") {
        return;
    }

    const taskName = inputTask.value;

    const task = {
        "taskId" : Date.now(),
        "taskName" : taskName,
        "isChecked" : false
    }

    list.push(task);
    console.log(list);

    saveList();
    renderTask();

    inputTask.value = "";
}

function deleteTask(taskDeletedId) {
    const newList = list.filter((task) => task.taskId !== taskDeletedId);

    list = newList;

    saveList();
    renderTask();
}

function toggleTask(taskCheckedId) {
    const newList = list.map((task) => {
        if (task.taskId === taskCheckedId) {
            return {
                ...task,
                "isChecked" : !task.isChecked
            }
        } 
        return task;
    })
}

// Add task
addButton.addEventListener("click", addTask);


// Khi trang vừa load: đọc dữ liệu cũ rồi vẽ lại
loadList();
renderTask();

