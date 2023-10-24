module.exports = function (req, res, next) {
  const { mobile, name, password, role } = req.body;

  function validmobile(usermobile) {
    return /^\d{10}$/.test(usermobile);
  }

  if (req.path === "/register") {
    if (![mobile, name, password, role].every(Boolean)) {
      return res
        .status(400)
        .json({ status: 400, message: "Thiếu thông tin xác thực" });
    } else if (!validmobile(mobile)) {
      return res
        .status(400)
        .json({ status: 400, message: "Số điện thoại phải là số và có 10 kí tự" });
    }
  } else if (req.path === "/login") {
    if (![mobile, password].every(Boolean)) {
      return res
        .status(400)
        .json({ status: 400, message: "Thiếu thông tin xác thực" });
    } else if (!validmobile(mobile)) {
      return res
        .status(400)
        .json({ status: 400, message: "Số điện thoại chỉ có thể là số" });
    }
  }
  next();
};
