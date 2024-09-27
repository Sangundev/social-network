const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: String, // Hoặc ObjectId nếu userId tham chiếu tới một document User
        required: true
    },
    desc: {
        type: String,
        max: 500 // Giới hạn độ dài mô tả (500 ký tự)
    },
    img: {
        type: String // URL hoặc đường dẫn đến hình ảnh
    },
    likes: {
        type: Array, // Mảng chứa userId của những người đã like bài viết
        default: []  // Mặc định là mảng rỗng
    }
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

// Tạo model Post dựa trên postSchema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
