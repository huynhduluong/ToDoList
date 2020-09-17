function TaskService() {
    this.getTaskListService = function () {
        return axios({
            url: "https://5f5c7a345e3a4d001624941b.mockapi.io/task",
            method: "GET",
        });
    };

    this.deleteTaskService = function (id) {
        return axios({
            url: `https://5f5c7a345e3a4d001624941b.mockapi.io/task/${id}`, 
            method: "DELETE",
        });
    };

    this.addTaskService = function (task) {
        return axios({
            url: "https://5f5c7a345e3a4d001624941b.mockapi.io/task", 
            method: "POST",
            data: task,
        });
    };

    this.getTaskById = function (id) {
        return axios({
            url: `https://5f5c7a345e3a4d001624941b.mockapi.io/task/${id}`, 
            method: "GET",
        });
    };

    this.updateTaskService = function (task) {
        return axios({
            url: `https://5f5c7a345e3a4d001624941b.mockapi.io/task/${task.id}`, 
            method: "PUT",
            data: task,
        });
    };
    
}