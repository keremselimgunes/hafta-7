document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const list = document.getElementById("list");
    const successToast = document.querySelector(".toast.success");
    const errorToast = document.querySelector(".toast.error");

    function showToast(toastElement) {
        $(toastElement).toast("show");
    }

    function newElement() {
        const taskValue = taskInput.value.trim();
        if (taskValue === "") {
            showToast(errorToast);
        return;
        }
        const li = document.createElement("li");
        li.textContent = taskValue;
        const span = document.createElement("span");
        span.className = "close";
        span.textContent = "\u00D7";
        span.onclick = function () {
        li.remove();
        saveTasks();
        };
        
        li.appendChild(span);
        li.onclick = toggleChecked;
        list.appendChild(li);
        taskInput.value = "";
        showToast(successToast);
        saveTasks();
    }

    function toggleChecked(event) {
        event.target.classList.toggle("checked");
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        list.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.textContent.slice(0, -1),
            checked: li.classList.contains("checked"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }

        const span = document.createElement("span");
        span.className = "close";
        span.textContent = "\u00D7";
        span.onclick = function () {
            li.remove();
            saveTasks();
        };
        
        li.appendChild(span);
        li.onclick = toggleChecked;
        list.appendChild(li);
        });
    }

    document.getElementById("liveToastBtn").onclick = newElement;

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
        newElement();
        }
    });

    loadTasks();
});