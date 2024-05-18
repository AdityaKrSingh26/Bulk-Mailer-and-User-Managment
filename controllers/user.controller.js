import User from "../models/user.model.js";
import List from "../models/list.model.js";
import csv from 'csv-parser';
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

const upload = multer({ dest: 'uploads/' });
const uploadCSV = upload.single('file');

const addUserFromCSV = async (req, res) => {
    const results = [];
    const createdUsers = [];
    const errors = [];
    let totalCount = 0;

    try {
        const listId = req.params.listId;
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        await new Promise((resolve, reject) => {
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('error', reject)
                .on('end', resolve);
        });

        for (const row of results) {
            try {
                const properties = {};

                for (const prop of list.customProperties) {
                    properties[prop.title] = row[prop.title] || prop.defaultValue;
                }

                const user = new User({
                    name: row.name,
                    email: row.email,
                    listId,
                    properties,
                });

                const newUser = await user.save();
                if (!newUser) 
                    throw new Error("Error in creating user");

                totalCount++;
                createdUsers.push(newUser);
            } catch (error) {
                if (error.code === 11000) {
                    // Duplicate key error
                    console.error("Duplicate email error:", error);
                    errors.push({ row, error: "Duplicate email" });
                } else {
                    console.error("Error creating user:", error);
                    errors.push({ row, error: error.message });
                }
            }
        }

        // Cleanup the uploaded file
        await unlinkAsync(req.file.path);

        return res.status(200).json({
            message: "Successfully added users from CSV",
            totalCount,
            errors,
            users: createdUsers,
        });

    } catch (error) {
        console.error(error);
        if (req.file) {
            // Ensure the file is deleted if an error occurs
            await unlinkAsync(req.file.path);
        }
        res.status(500).json({ error: "Error in adding user from CSV" });
    }
};

export {
    uploadCSV,
    addUserFromCSV
};
