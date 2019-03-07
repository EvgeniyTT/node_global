import { userModel as mongoUserModel } from '../dbm/models';
import { User as sequilizeUserModel } from '../dbp/models';

export const userController = {
  getAllPg: () => sequilizeUserModel.findAll(),
  getAllMongo: () => mongoUserModel.find({}),
  delete: req => mongoUserModel.findOneAndDelete({ _id: req.userId }),
};
