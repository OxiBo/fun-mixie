const express = require("express"),
  router = express.Router();

router.get("/api/user", async (req, res) => {
  //   console.log(req.session);
  // console.log(req.headers.host);
  // console.log(req.user)
  res.send(req.user);
  
});

// logout route
router.get("/api/logout", (req, res) => {
  // req.session = null; //?
  // console.log(req.headers.host);
  req.logout();
  res.redirect("/");
});




module.exports = router;
