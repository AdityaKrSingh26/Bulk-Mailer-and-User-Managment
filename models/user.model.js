import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List",
            required: true
        },
        properties: {
            type: Map,
            of: String,
        }

    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);
export default User;