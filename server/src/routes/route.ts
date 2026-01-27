import express from "express";
import Repositories from "../repositories/repositories";
import AllController from "../controller/all.controller";
import AllService from "../service/all.service";

const route = express.Router();

const repositories = new Repositories();
const services = new AllService(repositories);
const controller = new AllController(services);

route.get("/boards", controller.getBoards);
route.post("/postBoards", controller.insertBoards);

route.get("/tasks", controller.getTasks);
route.post("/postTask", controller.insertTask);
route.put("/editTask/:id", controller.editTask);
route.delete("/deleteTask/:id", controller.deleteTask);


export default route;