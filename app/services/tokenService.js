const jwt = require('jsonwebtoken');
const { RefreshToken } = require("../models/index");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAcсessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await RefreshToken.findOne({ where: { user_id } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await RefreshToken.create({ refreshToken, user_id });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await RefreshToken.destroy({ where: { refreshToken } });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await RefreshToken.findOne({ where: { refreshToken } });
        return tokenData;
      }
}

module.exports = new TokenService();