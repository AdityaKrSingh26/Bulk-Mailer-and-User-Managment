import User from "../models/user.model.js"
import List from "../models/list.model.js"
import csv from 'csv-parser';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

// Middleware to handle file upload
const uploadCSV = upload.single('file');

const addUserFromCSV = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Error in adding user from csv" })
    }
}

export {
    uploadCSV,
    addUserFromCSV
}