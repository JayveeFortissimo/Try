import type { BoardData } from "../interface/boards.interface.dto";

class BoardService {
  constructor(private repositories: any) {}
  async getAllBoards(offset?: number, limit?: number) {
    return await this.repositories.selectAllBoards(offset, limit);
  }

  async getBoardsCount() {
    return await this.repositories.countBoards();
  }

  async getAllTasks() {
    return await this.repositories.selectAllTasks();
  }

  async getByJoin(boardId: number) {
    return await this.repositories.selectByJoin(boardId);
  }

  async insertBoards(boardData: BoardData) {
    const checkDuplicate = await this.repositories.selectAllBoards();

    const isDuplicated = checkDuplicate.some(
      (board: BoardData) => board.board_name === boardData.board_name,
    );

    if (isDuplicated) {
      return { message: "Board name already exists" };
    } else {
      return await this.repositories.insertBoards(boardData);
    }
  }
}

export default BoardService;
