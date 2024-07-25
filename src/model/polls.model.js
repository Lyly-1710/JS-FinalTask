import pool from "../config/database.config"
class PollModel {
     async getAllPoll() {
        const connection = await pool.getConnection();
        const [rows,fields] = await connection.query('SELECT * FROM poll')
        connection.release();
        return rows;
    }

     async getDetailPoll(poll_id) {
        try{
            const connection = await pool.getConnection();
            const pollQuery = `SELECT * FROM poll WHERE poll_id = ?`; 
            const value = [poll_id];
            const [poll, pollFields] = await connection.query(pollQuery, value);
            connection.release();
            return poll;
        }catch(error){
            throw error;
        }
    }

    async createPoll(user_id, title){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO poll (user_id,title) VALUES (?, ?)`;
            const value = [user_id,title];
            const [poll, pollFields] = await connection.query(query, value);
            return poll.insertId;
        }catch(error){
            throw error;
        }
    }

    async updatePoll(pollID, title, option){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE poll SET title = ?, option = ? WHERE poll_id = ?`;
            const {title, option} = poll;
            const value = [title, option, pollID];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deletePoll(poll_id){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM poll WHERE poll_id= ?`; 
            const value = [poll_id];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async getUserByUsername(username)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE username = ?`; 
            const value = [username];
            const [row,fields] = await connection.query(query, value);
            return row[0];
        }catch(error){
            throw error;
        }
    }

    async getPassword(username)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT password FROM users WHERE username = ?`; 
            const value = [username];
            const [column,fields] = await connection.query(query, value);
            return column[0];
        }catch(error){
            throw error;
        }
    }

    async getUserByToken(token)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE tokenReset = ?`; 
            const value = [token];
            const [row,fields] = await connection.query(query, value);
            return row[0];
        }catch(error){
            throw error;
        }
    }

    async updateToken(userId, tokenReset, expired)
    {
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET tokenReset = ?, expired = ? WHERE id = ?`;
            const value = [tokenReset, expired, userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

}

export default new PollModel();