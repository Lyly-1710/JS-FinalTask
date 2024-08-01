import pool from "../config/database.config"
class PollModel {
     async getAllOption(poll_id) {
        const connection = await pool.getConnection();
        const [rows,fields] = await connection.query('SELECT option_id,text FROM options where poll_id = ?', poll_id)
        connection.release();
        return rows;
    }

     async getDetailOption(option_id) {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT option_id,text FROM options WHERE option_id = ?`; 
            const value = [option_id];
            const [rows,fields] = await connection.query(query, value);
            console.log(rows)
            connection.release();
            return rows;
        }catch(error){
            throw error;
        }
    }

    async createOption(poll_id, options){
        try{
            const connection = await pool.getConnection();
            let [option,fields] = ""
            for(let i = 0; i < options.length; i++)
            {
                const query = `INSERT INTO options (poll_id, text) VALUES (?,?)`;
                const value = [poll_id, options[i]];
                [option,fields] = await connection.query(query, value); 
            }
            return option;
        }catch(error){
            throw error;
        }
    }


    async updateOption(option_id, text){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE options SET text = ?  WHERE option_id = ?`;
            const { text } = option;
            const value = [text,option_id];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteOption(option_id){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM options WHERE option_id = ?`; 
            const value = [option_id];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async getOptionByID(option_id)
    {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM options WHERE option_id = ?`; 
            const value = [option_id];
            const [row,fields] = await connection.query(query, value);
            return row[0];
        }catch(error){
            throw error;
        }
    }


}

export default new PollModel();