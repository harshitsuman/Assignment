const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {

    const token = !!req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
    let verifyOptions = {
        expiresIn: "1d",
        algorithm: "HS256"
    };
    if (token == undefined) {
        res.status(500)
        return Promise.reject(res.json({ err: "token is undefined" }))
    }
    await jwt.verify(token, process.env.jwt_key, verifyOptions, async function (err, decoded) {
        if (err) {
            res.status(500)
            res.send("JwtExpire")

        }
        else {
            req.headers['email'] = decoded.email
            req.headers['type'] = decoded.type
            next()
        }
    });
};
