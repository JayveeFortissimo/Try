import express from "express";
import Repositories from "../repositories/repositories";
import BoardController from "../controller/board.controller";
import BoardService from "../service/board.service";
import TaskService from "../service/task.service";
import TaskController from "../controller/task.controller";

const route = express.Router();

const repositories = new Repositories();
const Boardservices = new BoardService(repositories);
const Boardcontroller = new BoardController(Boardservices);

const Taskservice = new TaskService(repositories);
const Taskcontroller = new TaskController(Taskservice)

route.get("/boards", Boardcontroller.getBoards);
route.post("/postBoards", Boardcontroller.insertBoards);

route.get("/tasks", Taskcontroller.getTasks);
route.post("/postTask", Taskcontroller.insertTask);
route.put("/editTask/:id", Taskcontroller.editTask);
route.delete("/deleteTask/:id", Taskcontroller.deleteTask);

route.get("/getAllBoards/:id", Boardcontroller.getByJoin);

export default route;