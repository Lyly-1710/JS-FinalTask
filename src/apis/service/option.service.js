import optionModel from "../../model/option.model";
class OptionService{
    async getAllOptionByPollID(){
        try {
            const option = await optionModel.getAllOptions();
            return option;
        }catch(error){
            throw error;
        }
    }

    async getDetailPoll(option_id){
        try {
            const poll = await optionModel.getDetailOption(option_id)
            return poll;
        }catch(error){
            throw error;
        }
    }
    
    async createOption(poll_id, options){
        try {
            if(!await optionModel.createOption(poll_id, options))
            {
                return false;
            }
            return true;
        }catch(error){
            throw error;
        }
    }

    async updateOption(option_id,text){
        try {
            if(!await optionModel.getOptionByID(option_id))
            {
                return false;
            }
            await optionModel.updateOption(option_id,text);
                return true;
        }catch(error){
            console.log("Loi ser" + error)
            throw error;
        }
    }

    async deleteOption(option_id){
        try {
            await optionModel.deleteOption(option_id)
            return true;
        }catch(error){
            throw error;
        }
    }
}
export default new OptionService();