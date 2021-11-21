const { User } = require('../models/index');
const ApiError = require('../exceptions/apiError');
const bcrypt = require('bcryptjs');
const UserDto = require('../interfaces');
const tokenService = require('../services/tokenService');

class UserGoogleService {
  async sign_up(name, email) {
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(`User with mailing address ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = (await User.create({ name, email, password: hashedPassword })).get();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...user });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserGoogleService();