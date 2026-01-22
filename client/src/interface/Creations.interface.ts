export interface BoardsInterface {
  name: string;
  description: string;
  color: string;
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
    setTypeCreate:  (type: string) => void;
    mainBoard: BoardsInterface[];
    task: TasksInterface[];
}