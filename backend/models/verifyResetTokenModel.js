import mongoose from "mongoose";

const { Schema } = mongoose;

const verifyTokenSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 900
    }
})


const VerifyResetToken = mongoose.model("VerifyResetToken", verifyTokenSchema);
export default VerifyResetToken;