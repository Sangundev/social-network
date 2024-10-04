const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


// Update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
               try {
                const saltRounds = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, saltRounds);
               } catch (error) {
                return res.status(500).json(err);
               }
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id,{ 
                    $set: req.body 
                }); 
                res.status(200).json("account has been update")
            } catch (error) {
                return res.status(500).json(err);
            }
    } else {
        return res.status(403).json({ message: "You can only update your own account" });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const updatedUser = await User.findByIdAndDelete(req.params.id); 
                res.status(200).json("account has been delete")
            } catch (error) {
                return res.status(500).json(err);
            }
    } else {
        return res.status(403).json({ message: "You can only delete your own account" });
    }
});
// Get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    
    try {
        const user = userId 
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while fetching the user", error: err });
    }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) { // Kiểm tra người dùng không tự theo dõi chính mình
        try {
            const userToFollow = await User.findById(req.params.id); // Người dùng được theo dõi
            const currentUser = await User.findById(req.body.userId); // Người dùng hiện tại

            // Kiểm tra nếu người dùng đã theo dõi người dùng khác chưa
            if (!userToFollow.followers.includes(req.body.userId)) {
                // Thêm userId của người dùng hiện tại vào danh sách followers của người được theo dõi
                await userToFollow.updateOne({ $push: { followers: req.body.userId } });
                // Thêm id của người được theo dõi vào danh sách following của người dùng hiện tại
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json({ message: "User has been followed" });
            } else {
                res.status(403).json({ message: "You are already following this user" });
            }
        } catch (err) {
            res.status(500).json({ message: "An error occurred while following the user", error: err });
        }
    } else {
        res.status(403).json({ message: "You cannot follow yourself" });
    }
});


// Unfollow a user
// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) { // Kiểm tra người dùng không tự hủy theo dõi chính mình
        try {
            const userToUnfollow = await User.findById(req.params.id); // Người dùng được hủy theo dõi
            const currentUser = await User.findById(req.body.userId); // Người dùng hiện tại

            // Kiểm tra nếu người dùng đã theo dõi người dùng khác
            if (userToUnfollow.followers.includes(req.body.userId)) {
                // Xóa userId của người dùng hiện tại khỏi danh sách followers của người được hủy theo dõi
                await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } });
                // Xóa id của người được hủy theo dõi khỏi danh sách following của người dùng hiện tại
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json({ message: "User has been unfollowed" });
            } else {
                res.status(403).json({ message: "You are not following this user" });
            }
        } catch (err) {
            res.status(500).json({ message: "An error occurred while unfollowing the user", error: err });
        }
    } else {
        res.status(403).json({ message: "You cannot unfollow yourself" });
    }
});


module.exports = router;
