const login = require('../controllers/login/login');

function includeRoutes(app) {
    try {
        const GLOBAL_ROUTE = '/educare'
        const SUB_ROUTES = '/login';

        app.get(GLOBAL_ROUTE + SUB_ROUTES + '/test', (req, res) => {
            return res.send('project is running on login routes');
        });
    
        app.post(GLOBAL_ROUTE + SUB_ROUTES, [
            login.generateAccessToken
        ]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    includeRoutes
}
