import { Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import Constant from 'src/common/constant';
import MessageHandler from 'src/common/message';
import { IResponse } from 'src/libraries/common/request.interface';

const JwtValidate = (req: Request, res: IResponse, next: NextFunction) => {
    try {
        const excluded = [
            '/v1/login', 
            '/v1/register', 
            '/v1/forgot-password', 
            '/v1/otp', 
            '/v1/otp/verify',
            '/v1/participants'
        ];

        if (excluded.includes(req.path)) {
            return next();
        }

        const type = req.header('Authorization')?.split(' ')[0];
        const token = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: MessageHandler.ERR007 });
        }

        if (type !== 'Bearer') {
            return res.status(401).json({ message: MessageHandler.ERR007 });
        }

        const verified = jwt.verify(token, Constant.JWT_SECRET);
        res.locals.logged = verified;
        next();
    } catch (err) {
        console.log('err', err);
        res.status(401).json({ message: MessageHandler.ERR008 });
    }
};

export default JwtValidate;