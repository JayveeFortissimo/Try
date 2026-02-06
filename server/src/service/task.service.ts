import type { TasksData } from "../interface/boards.interface.dto";

class TaskService {
  constructor(private repositories: any) {}

  async insertTasks(taskData: TasksData) {
    const checkDuplicate = await this.repositories.selectAllTasks();

    const isDuplicated = checkDuplicate.some(
      (task: TasksData) => task.task_name === taskData.task_name,
    );

    if (isDuplicated) {
      return { message: "Task name already exists" };
    } else {
      return await this.repositories.insertTasks(taskData);
    }
  }

  async editTask(taskData: TasksData, taskId: number) {
    return await this.repositories.editTask(taskData, taskId);
  }

  async deleteTask(deleteID: number) {
    return await this.repositories.deleteTask(deleteID);
  }
}

export default TaskService;
