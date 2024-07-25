import pool from "../config/database.config"
class VoteModel {

    async Vote(user_id, option_id){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO vote (user_id, option_id) VALUES (?, ?)`;
            const value = [user_id, option_id];
            const [vote, pollFields] = await connection.query(query, value);
            console.log(vote);
            return vote;
        }catch(error){
            throw error;
        }
    }

    async Unvote(option_id){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM vote WHERE option_id = ?`;
            const value = [option_id];
            const [vote, pollFields] = await connection.query(query, value);
            return vote;
        }catch(error){
            throw error;
        }
    }

    async countVote(option_id){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM vote WHERE option_id = ? `;
            const value = [option_id];
            const [vote, voteFields] = await connection.query(query, value);
            return vote;
        }catch(error){
            throw error;
        }
    }

    async getVote(user_id, option_id){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM vote WHERE user_id = ? AND option_id = ? `;
            const value = [user_id,option_id];
            const [vote, voteFields] = await connection.query(query, value);
            return vote.length;
        }catch(error){
            throw error;
        }
    }

   

}

export default new VoteModel();