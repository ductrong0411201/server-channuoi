const { User } = require("../models");

module.exports = async (req, res, next) => {
  let { id } = req.user;
  const user = await User.findOne({ where: { id: id } });
  if (user.dataValues.role_id === 1) {
    next();
  } else {
    return res
      .status(403)
      .json({ status: 403, message: "Bạn không có quyền truy cập" });
  }
};
