/* const {countries, languages} = require('countries-list');

const route = app => {

    app.get('/country', (req, res) => {
        res.json(countries[req.query.code])
    });

    app.get('/languages/:lang', (req, res) => {
        const lang = languages[req.params.lang];

        if (!lang) {

            res.status(404).json({
                status: 'NOT_FOUND',
                message: `language ${req.params.lang} not found`
            });

        } else {

            res.json({
                status: 'OK',
                data: req.params.lang
            });

        }
    });

    app.get('*', (req, res) => {
        res.status(404).send("NOT FOUND");
    });
};

module.exports = route;

 */