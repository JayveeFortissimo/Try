export interface BoardData{
  board_name:string;
  board_subtitle:string;
  updated_at: Date;
  color: string;
}


export interface TasksData{
  task_name:string;
  task_subtitle:string;
  task_description:string;
  task_status:string;
  assigned_to:string;
  task_priority:string;
  due_date: Date;
  board_id?:number;
  id:number;
}


export interface ProductQuery {
  page?: string;
  limit?: string;
  search?: string;
}