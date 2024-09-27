const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        // Mã hóa mật khẩu
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Tạo người dùng mới
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
});


// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra xem email có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Mật khẩu không chính xác" });
        }

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
});

module.exports = router;
