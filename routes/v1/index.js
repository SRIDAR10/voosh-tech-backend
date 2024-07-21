const express = require('express');
const authRoute = require('./auth.route');
const dashboardRoute = require('./dashboard.route');
const router = express.Router();

const defaultRoutes = [
    {
        path: '/v1/auth',
        route: authRoute
    },
    {
        path: '/v1/dashboard',
        route: dashboardRoute
    }
];

defaultRoutes.forEach((route) => {
   router.use(route.path,route.route);
});


module.exports = router;