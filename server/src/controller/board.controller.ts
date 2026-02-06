import { Request, Response } from "express";
import type { BoardData, TasksData } from "../interface/boards.interface.dto";
import { ProductQuery } from "../interface/boards.interface.dto";

class BoardController {
  constructor(private services: any) {}

  insertBoards = async (req: Request<BoardData>, res: Response) => {
    const allBoards: BoardData = req.body;
    const result = await this.services.insertBoards(allBoards);

    if (result?.message) {
      res.json({ message: result.message });
      return;
    }
    res.json({ message: "Board inserted successfully" });
  };

  getBoards = async (
    req: Request<any, any, any, ProductQuery>,
    res: Response,
  ) => {
    const { page, limit } = req.query; 

    const pages = parseInt(page as string, 10) || 1;
    const limits = parseInt(limit as string, 10) || 4;

    const offset = (pages - 1) * limits;

    const allData = await this.services.getAllBoards(offset, limits);
    const totalItems = await this.services.getBoardsCount();
    const totalPages = Math.ceil(totalItems / limits);

    res.json({
      boardData: allData,
      pagination: {
        current_page: pages,
        itemsPerpage: limits,
        totalPages: totalPages,
      },
    });
  };

  getByJoin = async (req: Request, res: Response) => {
    const boardId = +req.params.id;

    const allData = await this.services.getByJoin(boardId);

    if (!allData.length) {
      res.status(404).json({ message: "Board not found" });
      return;
    }

    const boardRow = allData[0];
    const tasks: any = [];

    allData.forEach((element: any) => {
      if (element.task_id !== null) {
        tasks.push({
          task_id: element.task_id,
          task_name: element.task_name,
          task_subtitle: element.task_subtitle,
          task_description: element.task_description,
          task_status: element.task_status,
          assigned_to: element.assigned_to,
          task_priority: element.task_priority,
          due_date: element.due_date,
          task_created_at: element.task_created_at,
          task_update_at: element.task_update_at,
        });
      }
    });

    res.json({
      message: "OK",
      data: {
        board_id: boardRow.board_id,
        board_name: boardRow.board_name,
        board_subtitle: boardRow.board_subtitle,
        board_created_at: boardRow.board_created_at,
        board_update_at: boardRow.board_update_at,
        color: boardRow.color,
        tasks: tasks,
      },
    });
  };
}

export default BoardController;
