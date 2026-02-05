import { databaseConnection } from "../config/database";
import type { BoardData, TasksData } from "../interface/boards.interface.dto";

class Repositories {
  private readonly db = databaseConnection;

  async selectAllBoards(offset?: number, limit?: number) {
    const result = await this.db.query(
      "SELECT * FROM boards LIMIT $1 OFFSET $2",
      [limit, offset],
    );
    return result.rows;
  }

  async countBoards() {
  const result = await this.db.query(
    "SELECT COUNT(*) FROM boards"
  );
  return parseInt(result.rows[0].count, 10);
}

  async selectAllTasks() {
    const result = await this.db.query("SELECT * FROM task");
    return result.rows;
  }

  async selectByJoin(boardId: number) {
    const result = await this.db.query(
      "SELECT  b.board_id,b.board_name,b.board_subtitle,b.created_at AS board_created_at, b.update_at AS board_update_at, b.color, t.task_id, t.task_name, t.task_subtitle, t.task_description, t.task_status, t.assigned_to, t.task_priority, t.due_date, t.created_at AS task_created_at, t.update_at AS task_update_at FROM boards b LEFT JOIN task t ON b.board_id = t.board_id WHERE b.board_id = $1",
      [boardId],
    );
     
    const checkIDisnull = result.rows.map((pro) => {
      if (pro.board_id === null) {
        return { ...pro, board_id: boardId };
      }
      return pro;
    });

    return checkIDisnull;
  }

  async insertBoards(boardData: BoardData) {
    const { board_name, board_subtitle, updated_at, color } = boardData;
    return await this.db.query(
      "INSERT INTO boards (board_name, board_subtitle, update_at, color) VALUES ($1,$2,$3,$4)",
      [board_name, board_subtitle, updated_at, color],
    );
  }

  async insertTasks(taskData: TasksData) {
    const {
      task_name,
      task_description,
      board_id,
      task_status,
      task_priority,
      due_date,
      task_subtitle,
      assigned_to,
    } = taskData;

    return await this.db.query(
      "INSERT INTO task (task_name, task_subtitle, task_description, task_status, assigned_to, task_priority, due_date, board_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        task_name,
        task_subtitle,
        task_description,
        task_status,
        assigned_to,
        task_priority,
        due_date,
        board_id,
      ],
    );
  }

  async editTask(taskData: TasksData, taskId: number) {
    const {
      task_name,
      task_description,
      board_id,
      task_status,
      task_priority,
      due_date,
      task_subtitle,
      assigned_to,
    } = taskData;
    return await this.db.query(
      "UPDATE task SET task_name = $1, task_description = $2, board_id = $3, task_status = $4, assigned_to = $5, task_priority = $6, due_date = $7, task_subtitle = $8 WHERE task_id= $9",
      [
        task_name,
        task_description,
        board_id,
        task_status,
        assigned_to,
        task_priority,
        due_date,
        task_subtitle,
        taskId,
      ],
    );
  }

  async deleteTask(deleteID: number) {
    return await this.db.query("DELETE FROM task WHERE task_id = $1", [
      deleteID,
    ]);
  }
}

export default Repositories;
