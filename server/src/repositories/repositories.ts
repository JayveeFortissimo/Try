import { databaseConnection } from "../config/database";
import type { BoardData } from "../interface/boards.interface.dto";

class Repositories {
  private readonly db = databaseConnection;

  async selectAllBoards() {
    const result = await this.db.query("SELECT * FROM boards");
    return result.rows;
  }

  async insertBoards(boardData: BoardData) {
    const { board_name, board_subtitle, updated_at, color } = boardData;
    return await this.db.query("INSERT INTO boards (board_name, board_subtitle, update_at, color) VALUES ($1,$2,$3,$4)", [
      board_name,
      board_subtitle,
      updated_at,
      color
    ]);
  }
}

export default Repositories;
