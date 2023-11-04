const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.headers.authorization;
  token = token.replace(/Bearer\s+/, "");
  if (!token) {
    return res
      .status(403)
      .json({ status: 403, message: "Bạn không có quyền truy cập" });
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Không thể đăng nhập",
    });
  }
};
