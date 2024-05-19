import { Router } from "express";
import {
    uploadCSV,
    addUserFromCSV,
    userUnsbscribe,
    sendEmailToList
} from "../controllers/user.controller.js"

const router = Router()

router.get("/adduser/:listId", uploadCSV, addUserFromCSV)
router.get("/unsubscribe/:listId/:userId", userUnsbscribe)
router.get("/sendemail/:listId", sendEmailToList)


export default router;

