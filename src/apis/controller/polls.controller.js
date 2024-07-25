import pollsService from "../service/polls.service";
import optionService from "../service/option.service";
import optionModel from "../../model/option.model";

class PollsController {
    async getAllPoll(req, res, next) {
        try{
            const poll = await pollsService.getAllPoll();
            return res.status(200).json({
                success: true,
                data: poll
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async getDetailPoll(req, res, next){
        try{
            const pollDetail = await pollsService.getDetailPoll(req.params.id);
            return res.status(200).json({
                id: pollDetail.poll[0].poll_id,
                user_id: pollDetail.poll[0].user_id,
                title: pollDetail.poll[0].title,
                options: pollDetail.options
            });
        }catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async createPoll(req, res, next){
        try{
            const newPoll = await pollsService.createPoll( req.user.id, req.body.title, req.body.option);
            return res.status(200).json({
                success: true,
                data: newPoll,
                message: "Created Poll"
            });
        }catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async updatePoll(req, res, next){
        try{
            if(req.poll.id == req.params.id)
                {
                    await pollsService.updatePoll(req.params.id,req.body.title, req.body.option)
                    return res.status(200).json({
                        success: true,
                        message: "Updated User"
                    });
                }
            else{
                return res.status(500).json({
                    success: false,
                    message: "Acess denied"
                });
                }
        }catch(error){
            console.log("Loi update" + error)
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async deletePoll(req, res, next){
        try{
            if(req.body.poll.id == req.params.id)
                {
                    await pollsService.deletePoll(req.params.id)
                    return res.status(200).json({
                        success: true,
                        message: "Deleted Poll"
                    });
                }
            else{
                    return res.status(500).json({
                        success: false,
                        message: "Acess denied"
                    });
                }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }
    
    
}

export default new PollsController();