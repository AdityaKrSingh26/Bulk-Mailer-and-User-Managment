import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        coustomProperties: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

const List = mongoose.model('List', listSchema);
export default List;