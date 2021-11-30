const ApiError = require('../exceptions/apiError');
const tokenService = require('../services/auth/tokenService');

module.exports = function (req, res, next) {
  try {
    const authrizationHeader = req.headers.authorization;

    if (!authrizationHeader) {
      return next(ApiError.UnauthorizedError);
    }

    const accessToken = authrizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError);
    }

    const userData = tokenService.validateAcсessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    next(e);
  }
};
