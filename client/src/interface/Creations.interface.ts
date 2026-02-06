import type { Dispatch } from "react";

export interface BoardsInterface {
  name: string;
  description: string;
  color: string;
  subtitle: string;
}

export interface GetBoards {
  board_name: string;
  board_description: string;
  color: string;
  board_subtitle: string;
  board_id: string;
  update_at: string;
  created_at: string;
}

export interface TasksInterface {
  title: string;
  subtitle: string;
  description: string;
  status: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
}

export interface InitialStateInterface {
  getBoardsLoading: boolean;
  getAllbyJoins: boolean;
  sendLoading: boolean;
  createBoards: BoardsInterface;
  createTasks: TasksInterface;
  typeCreate: string;
  mainBoard: BoardsInterface[];
  task: TasksInterface[];
  pagination: {
    current_page: number;
    itemsPerPage: number;
    totalPages: number;
  };
  task_id:number;
}

export interface ContextAPI {
  task: any[];
  mainBoard: GetBoards[];
  task_id: number;
  typeCreate: string;
  sendLoading: boolean;
  getAllbyJoins: boolean;
  getBoardsLoading: boolean;
  createTasks: TasksInterface;
  createBoards: BoardsInterface;
  dispatch: Dispatch<any>;
  getAllBoards: () => Promise<void>;
  setTypeCreate: (type: string) => void;
  getForBoards: (type: string, value: string) => void;
  getForTasks: (type: string, value: string) => void;
  getAllBoardsByJoins: (id: number) => Promise<void>;
  submitBoards: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitTask: (e: React.MouseEvent<HTMLButtonElement>, id: string) => Promise<void>;
  editTAsk:(e: React.MouseEvent<HTMLButtonElement>,task_Id: number) => Promise<void>;
  deletetask:(e: React.MouseEvent<HTMLButtonElement>,task_Id: number) => Promise<void>;
    pagination: {
    current_page: number;
    itemsPerPage: number;
    totalPages: number;
  };
}
