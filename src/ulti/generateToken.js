import jwt from 'jsonwebtoken'
export function generateAccessToken(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({username: username}, 'secretValue', { expiresIn: '1800s' });
  }