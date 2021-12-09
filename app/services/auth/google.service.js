const { User } = require('../../models');
const ApiError = require('../../exceptions/apiError');
const tokenService = require('./tokenService');
const bcrypt = require('bcryptjs');

class GoogleService {
  async sign_up(email) {
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(
        `User with mailing address ${email} already exists`,
      );
    }

    const user = (
      await User.create({ email, auth_via: 'google' })
    ).get();

    const tokens = tokenService.generateTokens({ ...user });

    await tokenService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async sign_in(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest('User was not found');
    }

    const tokens = tokenService.generateTokens({ ...user });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }
}

module.exports = new GoogleService();