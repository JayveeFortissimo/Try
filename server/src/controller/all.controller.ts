import { Request, Response } from "express";
import type { BoardData } from "../interface/boards.interface.dto";

class AllController {
  constructor(private services: any) {}

  getBoards = async (req: Request, res: Response) => {
    const allData = await this.services.getAllBoards();
    res.json({ data: allData });
  };

  insertBoards = async (req: Request<BoardData>, res: Response) => {
    const allBoards: BoardData = req.body;
   const result = await this.services.insertBoards(allBoards);
   
    if (result?.message){
      res.json({message:result.message});
      return;
    }
    res.json({ message: "Board inserted successfully" });
  };
}

export default AllController;
