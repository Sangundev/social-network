const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
    profilePicture: {
        type: String,
        default: "",
        maxlength: 255,
    },
    coverPicture: {
        type: String,
        default: "",
        maxlength: 255,
    },
    followers: {
        type: Array, // Sử dụng type: Array để định nghĩa mảng
        default: [],
    },
    following: {
        type: Array, // Sử dụng type: Array cho danh sách người theo dõi
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
