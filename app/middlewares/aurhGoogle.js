module.exports = {
  ensureAuth: (req, res, next) => {
    if(req.isAuthericated()) {
      console.log('Authericated');
      return next();
    } else {
      console.log(log);
    }
  }
}