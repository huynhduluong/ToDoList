var taskListService = new TaskService();

function getEle(id) {
    return document.getElementById(id);
}

function renderTaskList() {
    taskListService.getTaskListService()
        .then(function (result) {
            renderTask(result.data);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function renderTask(arr) {
    var contentNewTask = "";
    var contentCompletedTask = "";
    for (var i = 0; i < arr.length; i++) {
        var task = arr[i];
        if (task.status !== "completed") {
            contentNewTask += `
                <li>
                    <span>${task.textTask}</span>
                    <div class="buttons">
                    <button class="remove" onclick="handleDeleteTask(${task.id})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="handleCompleteTask(${task.id})">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                    </div>
                </li>
            `;
        } else{
            contentCompletedTask += `
                <li>
                    <span>${task.textTask}</span>
                    <div class="buttons">
                    <button class="remove" onclick="handleDeleteTask(${task.id})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="handleCompleteTask(${task.id})">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                    </div>
                </li>
            `;
        };        
    };
    getEle("todo").innerHTML = contentNewTask;
    getEle("completed").innerHTML = contentCompletedTask;
}

function handleDeleteTask(id) {
    taskListService.deleteTaskService(id)
        .then(function (result) {
            alert("Delete task success");
            renderTaskList();
        })
        .catch(function (err) {
            console.log(err);
        });
}

getEle("addItem").addEventListener("click", function () {
    var nameTask = getEle("newTask").value;

    if (nameTask.trim() === "") {
        alert("Please input task");
        return;
    }

    var newTask = new Task("", nameTask, "todo", nameTask);

    taskListService.addTaskService(newTask)
        .then(function (result) {
            alert("Add task success");
            renderTaskList();
        })
        .catch(function (err) {
            console.log(err);
        });    
});

function getTask(id) {
    return taskListService.getTaskById(id);
}

function updateTask(task) {
    return taskListService.updateTaskService(task);
}

function checkStatus(result) {
    var task = result.data;
    if (task.status === "completed") {
        task.status = "todo";
    }else{
        task.status = "completed";
    };
    return task;
}

/**
 * Viết bằng Promise ES6
 */

// function handleCompleteTask(id) {
//     return getTask(id)
//         .then(function (result) { 
//             return updateTask(checkStatus(result));
//         })
//         .then(function (result) {
//             alert("Change status success");
//             renderTaskList();
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// }


/**
 * Viết bằng async await của ES7
 */
async function handleCompleteTask(id) {
    var taskID = await getTask(id);
    var task = await updateTask(checkStatus(taskID));
    alert("Change status success");
    renderTaskList();
}


renderTaskList();
