import { Router } from "express";
import { getMedicamentos } from "../controllers/softwares.controller";

const router = Router();

router.get('/botica', getMedicamentos);