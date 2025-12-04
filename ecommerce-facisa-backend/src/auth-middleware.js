import jwt from 'jsonwebtoken';

const middleware = (req, res, next) => {
    const noAuthRoutes = ['/api/user/login', '/api/user/signup'];

    if (noAuthRoutes.includes(req.path) && req.method === 'POST') {
        return next();
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}

export default middleware;