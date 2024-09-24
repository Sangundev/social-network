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
// Get a user
// Follow a user
// Unfollow a user


module.exports = router;
