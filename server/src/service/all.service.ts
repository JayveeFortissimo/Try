import type { BoardData, TasksData } from "../interface/boards.interface.dto";

class AllService {
  constructor(private repositories: any) {}
  async getAllBoards() {
    return await this.repositories.selectAllBoards();
  }

  async getAllTasks(){
    return await this.repositories.selectAllTasks();
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

  // All Task here ok!
    async insertTasks(taskData: TasksData) {
    const checkDuplicate = await this.repositories.selectAllTasks();

    const isDuplicated = checkDuplicate.some((task: TasksData) => task.task_name === taskData.task_name);

    if (isDuplicated) {
      return { message: "Task name already exists" };
    } else {
      return await this.repositories.insertTasks(taskData);
    }
  }
  
  
  async editTask(taskData: TasksData, taskId:number){
      return await this.repositories.editTask(taskData, taskId);
  }

  async deleteTask(deleteID:number){
      return await this.repositories.deleteTask(deleteID);
  }
  
}

export default AllService;
