const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
    try {
        const {title, desc, price, images, userId} = req.body;
        const product = await Products.create({
            title,
            desc,
            price,
            images,
            user: userId
        });

        res.send({status: "OK", data: product});
    } catch (err) {
        console.log("createdProduct error: " + err);
        res.status(500).send({status: "ERROR", data: err.message})
    }
};

const updateProduct = (req, res) => {
};

const deleteProduc = (req, res) => {
};

const getProducts = async (req, res) => {
    try{
        const products = await Products.find()
                                        .select('title desc price')
                                        .populate('user', 'username email data role');

        res.send({status: 'OK', data: products});

    }catch (err) {

        console.log(`Ha ocurrido un error al momento de obtener los productos ${err}`);
        res.status(500).send({ status: 'ERROR', data: err.message })

    }
};

const getProductByUser = async (req, res) => {
    try{
        const products = await Products.find({
            user: req.params.userId
        });

        res.send({status: 'OK', data: products});

    }catch (err) {

        console.log(`Ha ocurrido un error al momento de obtener los productos ${err}`);
        res.status(500).send({ status: 'ERROR', data: err.message })

    }
};

module.exports = {createProduct, updateProduct, deleteProduc, getProducts, getProductByUser};