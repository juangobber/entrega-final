const admin_auth = async (req, res, next) => {
    const user = await req.session.user;
    if (user.admin) {
      req.user = user;
      next();
    } else {
      res.redirect('/');
    }
  };

export default admin_auth