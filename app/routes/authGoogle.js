const router = require('express').Router();
const passport = require('passport');
require('../passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    // successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: '/login/failed',
  }),
  function(req, res) {
    // console.log('req.user', req.user.user.id);

    res.cookie('id', req.user.user.id, {
      maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false,
    });

    res.cookie('name', req.user.user.name, {
      maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false,
    });

    res.cookie('token', req.user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true,
    });

    res.redirect(`${process.env.CLIENT_URL}/admin/boards`);
  }
);

router.get('/login/success', (req, res) => {
  // if (req.user) {
  //   res
  //     .status(200)
  //     .json({ success: true, message: 'successfull', user: req.username }); // cookies: req.cookies
  // }
  // console.log(req);
  // res.json(req.user);
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({ success: false, message: 'failure' });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = router;
