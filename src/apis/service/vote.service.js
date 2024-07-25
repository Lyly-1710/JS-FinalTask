import voteModel from "../../model/vote.model";
class VoteService{
    async Vote(user_id, option_id){
        try {   
            for(let i = 0; i < option_id.length; i++)
            {
                if(await voteModel.getVote(user_id, option_id[i]) != 0 )
                    {
                        return false;
                    }
                await voteModel.Vote(user_id, parseInt(option_id[i]))
            }
            return true;
        }catch(error){
            throw error;
        }
    }

    async Unvote(option_id){
        try {   
            for(let i = 0; i < option_id.length; i++)
            {
                await voteModel.Unvote(option_id[i]);
            }
            return true;
        }catch(error){
            throw error;
        }
    }
    

    
    
}
export default new VoteService();