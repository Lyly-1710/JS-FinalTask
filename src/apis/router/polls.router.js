import express from 'express';
import pollsController from '../controller/polls.controller';
import optionController from '../controller/option.controller';
import voteController from '../controller/vote.controller';
import verify from '../../middleware/verify.middleware';

const route = express.Router();

route.route('/')
    .get(pollsController.getAllPoll)
    .post(verify,pollsController.createPoll);

route.route('/:id')
    .get(pollsController.getDetailPoll)
    .put(verify, pollsController.updatePoll)
    .delete(verify, pollsController.deletePoll);

route.route('/:id/opt')
    .post(verify, optionController.createOption)
    .delete(verify, optionController.deleteOption);

route.route('/:id/vote')
    .post(verify,voteController.vote);

route.route('/:id/unvote')
    .post(verify,voteController.Unvote);

    
export default route;