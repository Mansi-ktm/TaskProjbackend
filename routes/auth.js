const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token not found" });
    }

    jwt.verify(token, "MAN", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
