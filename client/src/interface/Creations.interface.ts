import type { Dispatch } from "react";

export interface BoardsInterface {
  name: string;
  description: string;
  color: string;
  subtitle:string;
}


export interface GetBoards{
  board_name: string;
  board_description: string;
  color: string;
  board_subtitle:string;
  board_id:string;
  update_at:string;
  created_at:string;

}

export interface TasksInterface {
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
}

export interface InitialStateInterface {
  getBoardsLoading:boolean;
  sendLoading:boolean;
  createBoards: BoardsInterface;
  createTasks: TasksInterface;
  typeCreate: string;
  mainBoard: BoardsInterface[];
  task: TasksInterface[];
}

export interface ContextAPI {
  getForBoards: (type: string, value: string) => void;
  getForTasks: (type: string, value: string) => void;
  createBoards: BoardsInterface;
  createTasks: TasksInterface;
  typeCreate: string;
  setTypeCreate: (type: string) => void;
  mainBoard: GetBoards[];
  task: TasksInterface[];
  dispatch: Dispatch<any>;
  sendLoading:boolean;
  getBoardsLoading:boolean;
  submitBoards: (e:React.FormEvent<HTMLFormElement>) => Promise<void>;
  getAllBoards: () => Promise<void>;
}
