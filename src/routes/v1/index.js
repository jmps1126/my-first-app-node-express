const productsRoute = require('./products-route');
const userRoute = require('./users-route');

module.exports = app => {
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/products', productsRoute);
};