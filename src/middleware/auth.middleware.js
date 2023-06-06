const auth = async (req, res, next) => {
    const user = await req.session.user;
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect('/');
    }
  };

export default auth