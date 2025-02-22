import jwt from 'jsonwebtoken';
import Constant from 'src/common/constant';

const secretKey = Constant.JWT_SECRET;

interface JwtPayload {
    userId: string;
    email: string;
}

export const createToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};