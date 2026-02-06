import type { TasksData } from "../interface/boards.interface.dto";
import { Request, Response } from "express";

class TaskController {
  constructor(private Taskservice: any) {}

  getTasks = async (req: Request, res: Response) => {
    const allData = await this.Taskservice.getAllTasks();
    res.json({ taskData: allData });
  };

  insertTask = async (req: Request<TasksData>, res: Response) => {
    const allTasks: TasksData = req.body;
    const result = await this.Taskservice.insertTasks(allTasks);

    if (result?.message) {
      res.json({ message: result.message });
      return;
    }
    res.json({ message: "Board inserted successfully" });
  };

  editTask = async (req: Request<TasksData>, res: Response) => {
    const taskId = +req.params.id;
    const allTasks: TasksData = req.body;
    await this.Taskservice.editTask(allTasks, taskId);

    res.json({ message: "Task edited successfully" });
  };

  deleteTask = async (req: Request<TasksData>, res: Response) => {
    const deleteID = +req.params.id;
    await this.Taskservice.deleteTask(deleteID);

    res.json({ message: "Task deleted successfully" });
  };
}

export default TaskController;
