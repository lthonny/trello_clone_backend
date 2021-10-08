const bcrypt = require('bcryptjs');

const { User } = require("../models/index");

const tokenService = require('../services/tokenService');

const UserDto = require('../interfaces');
const ApiError = require('../exceptions/apiError');

class UserService {
    async sign_up(name, email, password) {
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

    async sign_in(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw ApiError.BadRequest('User was not found');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

      async refresh(refreshToken) {
        if (!refreshToken) {
          throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
          throw ApiError.UnauthorizedError();
        }

        const user = await User.findOne({ where: { id: userData.id } });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
      }

      // async getAllUsers() {
      //   const users = await User.findAll();
      //   return users;
      // }
}

module.exports = new UserService();