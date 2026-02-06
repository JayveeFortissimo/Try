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
  getAllBoardsByJoins: (id: number) => Promise<void>;
  getForBoards: (type: string, value: string) => void;
  getForTasks: (type: string, value: string) => void;
  createBoards: BoardsInterface;
  createTasks: TasksInterface;
  typeCreate: string;
  setTypeCreate: (type: string) => void;
  mainBoard: GetBoards[];
  task: any[];
  dispatch: Dispatch<any>;
  sendLoading: boolean;
  getBoardsLoading: boolean;
  getAllbyJoins: boolean;
  submitBoards: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitTask: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => Promise<void>;
  getAllBoards: () => Promise<void>;
  pagination: {
    current_page: number;
    itemsPerPage: number;
    totalPages: number;
  };
  editTAsk: (
    e: React.MouseEvent<HTMLButtonElement>,
    task_Id: number,
  ) => Promise<void>;
  task_id: number;
}
