import {Request, Response} from 'express';
import Products from '../../mongo/models/products';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, desc, price, images, userId } = req.body;
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId
    });

    res.send({ status: 'OK', data: product });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', data: err.message });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, title, desc, price } = req.body;

    await Products.findByIdAndUpdate(_id, {
      title,
      desc,
      price
    });

    res.send({ status: 'OK', message: 'Product updated' });
  } catch (e) {
    res.status(500).send({ statud: 'ERROR', message: e.message });
  }
};

const deleteProduc = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;

    if (!productId) {
      throw new Error('Missing param productId');
    }

    await Products.findByIdAndDelete(productId);

    res.send({ status: 'OK', message: 'product eliminated' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Products.find()
      .select('title desc price')
      .populate('user', 'username email data role');

    res.send({ status: 'OK', data: products });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', data: err.message });
  }
};

const getProductByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Products.find({
      user: req.params.userId
    });

    res.send({ status: 'OK', data: products });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', data: err.message });
  }
};

export default { createProduct, getProducts, getProductByUser, deleteProduc, updateProduct };
