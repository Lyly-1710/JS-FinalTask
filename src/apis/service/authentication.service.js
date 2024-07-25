import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthenticationService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
        
        if (!this.JWT_SECRET || !this.JWT_EXPIRES_IN) {
            throw new Error('JWT_SECRET and JWT_EXPIRES_IN must be defined in environment variables');
        }
    }

    async sign(user) {
        try {
            const token = jwt.sign({id: user.user_id}, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN, algorithm: 'HS256' });
            console.log('Token created:', token); // Log the created token
            return token;
        } catch (error) {
            console.error('Error signing token:', error);
            throw error;
        }
    }

    verify(token) {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return decoded;
        } catch (error) {
            console.error('Token verification failed:', error.message);
            throw error;
        }
    }
}

export default new AuthenticationService();
