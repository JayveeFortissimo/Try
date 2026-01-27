import { Request, Response } from "express";
import type { BoardData, TasksData } from "../interface/boards.interface.dto";

class AllController {
  constructor(private services: any) {}

  getBoards = async (req: Request, res: Response) => {
    const allData = await this.services.getAllBoards();
    res.json({ boardData: allData });
  };

  getTasks = async (req: Request, res: Response) => {
    const allData = await this.services.getAllTasks();
    res.json({ taskData: allData });
  };

  insertBoards = async (req: Request<BoardData>, res: Response) => {
    const allBoards: BoardData = req.body;
    const result = await this.services.insertBoards(allBoards);

    if (result?.message) {
      res.json({ message: result.message });
      return;
    }
    res.json({ message: "Board inserted successfully" });
  };


  // All Task Here OK? !

  insertTask= async (req: Request<TasksData>, res: Response) => {
    const allTasks: TasksData = req.body;
    const result = await this.services.insertTasks(allTasks);

    if (result?.message) {
      res.json({ message: result.message });
      return;
    }
    res.json({ message: "Board inserted successfully" });
  };


  editTask = async (req:Request<TasksData>, res:Response) => {
    const taskId = +req.params.id;
    const allTasks: TasksData = req.body;
    await this.services.editTask(allTasks, taskId);

    res.json({ message: "Task edited successfully" });
  }


  deleteTask = async (req:Request<TasksData>, res:Response) => {
    const deleteID = +req.params.id;
    await this.services.deleteTask(deleteID);

    res.json({ message: "Task deleted successfully" });
  }


}

export default AllController;
