import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../../mongo/models/users';
import Products from '../../mongo/models/products';

const expiresIn = 60 * 10;
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      const isOk = await bcrypt.compare(password, user.password);

      if (isOk) {
        const token = jwt.sign({ userId: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn });

        res.send({
          status: 'OK',
          data: { token, expiresIn }
        });
      }
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, data, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username,
      password: hash,
      email,
      role,
      data
    });

    res.send({
      status: 'OK',
      data: user
    });
  } catch (err) {
    if (err.code && err.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: err.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, data } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userId, {
      username,
      email,
      data
    });

    res.send({ status: 'OK', message: 'User updated' });
  } catch (err) {
    if (err.code && err.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: err.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error('Missing param userId');
    }

    await Users.findByIdAndDelete(userId);
    await Products.deleteMany({ user: userId });

    res.send({ status: 'OK', message: 'user deleted' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await Users.find().select({ password: 0, __v: 0 });

    res.send({ status: 'OK', data: users });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', data: err.message });
  }
};

export default { createUser, updateUser, deleteUser, getUsers, login };
