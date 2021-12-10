const router = require('express').Router();
const passport = require('passport');
require('../passport');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `/auth/login/success`,
    failureRedirect: '/auth/login/failed',
  }),
  function (req, res) {},
);

router.get('/login/success', (req, res) => {
  console.log('/google/callback', req.user.user.email);
  res.redirect(
    `${process.env.CLIENT_URL}/admin/google/auth/user/` + req.user.user.email,
  );
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({ success: false, message: 'failure' });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = router;
