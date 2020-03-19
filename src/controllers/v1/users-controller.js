const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users');

const expiresIn = 60 * 10;
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email});

        if(user){
            const isOk = await bcrypt.compare(password, user.password);

            if(isOk){
                const token = jwt.sign({userId: user._id, role: user.role},
                                                process.env.JWT_SECRET,
                                        {expiresIn}
                                      );

                res.send({
                    status: 'OK',
                    data: {token, expiresIn}
                })
            }
        }

    } catch (e) {
        console.log(`Ha ocurrido un error al momento de logearse ${e.message}`)
    }
};

const createUser = async (req, res) => {
    try {

        const {username, password, email, data} = req.body;
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await Users.create({
            username,
            password: hash,
            email,
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
                .send({status: 'DUPLICATED_VALUES', message: err.keyValue});
            return;
        }
        res.status(500).send({status: 'ERROR', message: err.message});
    }
};

const updateUser = async (req, res) => {
    try {

        const {username, email, data, userId} = req.body;
        await Users.findByIdAndUpdate(userId, {
            username,
            email,
            data
        });

        res.send({status: 'OK', message: 'User updated'})
    } catch (err) {
        if (err.code && err.code === 11000) {
            res
                .status(400)
                .send({status: 'DUPLICATED_VALUES', message: err.keyValue});
            return;
        }
        res.status(500).send({status: 'ERROR', message: err.message});
    }
};

const deleteUser = (req, res) => {
};

const getUsers = (req, res) => {


    /*res.send({
        status: 'OK',
        message: 'user getting'
    });

     */
};

module.exports = {createUser, updateUser, deleteUser, getUsers, login};