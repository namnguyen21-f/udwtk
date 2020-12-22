
import jwt from 'jsonwebtoken'
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(400).json({
        success: false,
        message: 'Token is not available',
    });

    jwt.verify(token, 'secretValue' , (err,user) => {
      if (err) return res.status(400).json({
        success: false,
        message: 'Token is not available',
        });
      console.log(user);
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    })
}