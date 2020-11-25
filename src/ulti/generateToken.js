import jwt from 'jsonwebtoken'
export function generateAccessToken(email) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({email: email}, 'secretValue', { expiresIn: '1800s' });
  }