class AuthController {
    constructor(authService) {
        this._authService = authService
    }

    login = async (req, res, next) => {
        try {
            const {username, password} = req.body
            const token = await this._authService.getJwtTokenByUsernameAndPassword(username, password)

            res.response
                .setData({access_token: token})
                .send()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = AuthController