const router = require("koa-router")();
const routers = require('./apis');


router
    .use('/api',routers.routes());


module.exports = router;