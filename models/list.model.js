import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        customProperties: [
            {
                title: {
                    type: String,
                    required: true,
                },
                defaultValue: {
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