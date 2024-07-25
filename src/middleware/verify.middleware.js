import 'dotenv/config';
import jwt from 'jsonwebtoken';
import authenticationService from '../apis/service/authentication.service';

export default function verify(req, res, next) {
    try {
        console.log("Vào verify middleware");
        
        let token = req.headers.authorization;

        if (token) {
            // Nếu token có dạng 'Bearer <token>', loại bỏ 'Bearer '
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length).trimLeft();
            }

  
            // Verify the token using jwt.verify method
            const decoded = authenticationService.verify(token);
        
            req.user = decoded;
            next();
        } else {
            req.user = undefined;
            return res.status(401).json({
                login: false,
                data: 'Token is missing'
            });
        }
    } catch (error) {
        console.log("Lỗi xác thực token:", error.message);
        return res.status(401).json({
            login: false,
            data: 'Invalid token'
        });
    }
}
