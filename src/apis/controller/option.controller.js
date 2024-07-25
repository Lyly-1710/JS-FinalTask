import optionService from "../service/option.service";

class OptionsController {
    async getAllOption(req, res, next) {
        try{
            
            const option = await optionService.getAllOption();
            return res.status(200).json({
                success: true,
                data: option
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async getDetailOption(req, res, next){
        try{
            
            const option = await optionService.getDetailOption(req.params.id);
            return res.status(200).json({
                success: true,
                data: option
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async createOption(req, res, next){
        try{
            const options = req.body.options.split(';')
            const poll_id = req.params.id;
            await optionService.createOption(poll_id,options)
            return res.status(200).json({
                success: true,
                message: "Created Option"
            });
        }catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async updateOption(req, res, next){
        try{
            if(!await optionService.updateOption(req.params.id,req.body.text))
                {
                    return res.status(200).json({
                        success: true,
                        message: "Updated Option"
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

    async deleteOption(req, res, next){
        try{
            if(req.body.poll.id == req.params.id)
                {
                    await optionService.deleteOption(req.params.id)
                    return res.status(200).json({
                        success: true,
                        message: "Deleted Option"
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

export default new OptionsController();