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
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
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
;
        return await RefreshToken.create({ refreshToken, user_id });
    }

    async removeToken(refreshToken) {
        return await RefreshToken.destroy({ where: { refreshToken } });
    }

    async findToken(refreshToken) {
        return await RefreshToken.findOne({ where: { refreshToken } });
      }
}

module.exports = new TokenService();