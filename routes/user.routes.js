import { Router } from "express";
import {
    uploadCSV,
    addUserFromCSV
} from "../controllers/user.controller.js"

const router = Router()

router.get("/adduser/:listId", uploadCSV, addUserFromCSV)

export default router;