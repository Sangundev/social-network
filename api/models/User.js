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
    desc: {
        type: String, // Thêm trường mô tả người dùng
        maxlength: 100, // Giới hạn độ dài tối đa
        default: "",
    },
    from: {
        type: String, // Thêm trường mô tả người dùng
        maxlength: 1000, // Giới hạn độ dài tối đa
    },
    city: {
        type: String, // Thêm trường thành phố
        maxlength: 50, // Giới hạn độ dài tối đa
        default: "",
    },
    relationship: {
        type: Number, // Thêm trường relationship với giá trị số
        enum: [1, 2, 3], // 1 = Độc thân, 2 = Đang hẹn hò, 3 = Đã kết hôn
        default: 1, // Đặt giá trị mặc định
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
