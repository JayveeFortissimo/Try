import express from "express";
import Database from "../config/database";
import Repositories from "../repositories/repositories";

const route = express.Router();


const repositories = new Repositories(Database);

route.get("/", (req, res) => {
   res.json({message: "HELLO"})
});

export default route;