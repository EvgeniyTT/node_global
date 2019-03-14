import { productModel as mongoProductModel } from '../dbm/models';
import { Product as sequilizeProductModel } from '../dbp/models';

export const productController = {
  getAllPg: () => sequilizeProductModel.findAll(),
  getByIdPg: req => sequilizeProductModel.findOne({ where: { id: req.productId } }),
  savePg: req => sequilizeProductModel.create(req.body),

  getAllMongo: () => mongoProductModel.find({}),
  deleteMongo: req => mongoProductModel.findOneAndDelete({ _id: req.productId }),
};
