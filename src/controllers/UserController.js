const { User } = require("../models");
require("dotenv").config();

exports.updateUserInfo = async (req, res) => {
  try {
    const {name, email, address} = req.body
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    user.update({
        name: name,
        address: address,
        email: email
    })
    return res
      .status(200)
      .json({ status: 200, message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
