module.exports = (req, res, next) => {
    if (!req.user) {
      res.status(401).send( "401 Not Authorized. You have to be logged in" );
    }
    next();
  };
  