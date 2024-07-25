import optionModel from "../../model/option.model";
import pollsModel from "../../model/polls.model";
import voteModel from "../../model/vote.model";
class PollService{
    async getAllPoll(){
        try {
            const poll = await pollsModel.getAllPoll();
            return poll;
        }catch(error){
            throw error;
        }
    }

    async getDetailPoll(poll_id){
        try {
            const poll = await pollsModel.getDetailPoll(poll_id);
            const option = await optionModel.getAllOption(poll_id);
            const number = true;
            
            for (let i = 0; i < option.length; i++)
            {
                let vote = await voteModel.countVote(option[i].option_id)
                vote = vote.length;
                option[i] = {
                    option_id: option[i].option_id,
                    text: option[i].text,
                    ... (number && {vote: vote })
                }
            }
            return {
                poll: poll,
                options: option
            }
        }catch(error){
            throw error;
        }
    }
    
    async createPoll(user_id, title, options){
        try {
            const poll_id = await pollsModel.createPoll(user_id, title);
            const option = await optionModel.createOption(poll_id, options);
            if(!poll_id || !option)
            {
                return false;
            }
            return true;
        }catch(error){
            throw error;
        }
    }

    async updatePoll(poll_id, title, option){
        try {
            await pollsModel.updatePoll(poll_id, title, option);
            return true;
        }catch(error){
            console.log("Loi ser" + error)
            throw error;
        }
    }

    async deletePoll(poll_id){
        try {
            await pollsModel.deletePoll(poll_id);
            return true;
        }catch(error){
            throw error;
        }
    }
}
export default new PollService();