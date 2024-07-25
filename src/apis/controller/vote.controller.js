import pollsService from "../service/polls.service";
import optionService from "../service/option.service";
import optionModel from "../../model/option.model";
import voteService from "../service/vote.service";

class VoteController {
    async vote(req, res, next) {
        try{
            const option_id = req.body.option_id.split(';');
            const vote = await voteService.Vote(req.user.id, option_id)
            if(!vote)
            {
                return res.status(500).json({
                    success: false,
                    message: "Already voted for these options"
                    
                });
            }
            return res.status(200).json({
                success: true,
                data: vote
            });
        }catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async Unvote(req, res, next) {
        try{
            const option_id = req.body.option_id.split(';');
            const vote = await voteService.Unvote(option_id);
            return res.status(200).json({
                success: true,
                data: vote
            });
        }catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    
    
    
}

export default new VoteController();