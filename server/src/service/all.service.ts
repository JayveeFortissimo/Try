import type { BoardData } from "../interface/boards.interface.dto";

class AllService {
  constructor(private repositories: any) {}
  async getAllBoards() {
    return await this.repositories.selectAllBoards();
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

export default AllService;
