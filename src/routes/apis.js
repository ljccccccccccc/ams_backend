const router = require('koa-router')();

const assetController = require('./../controllers/assetController');
const userController = require('./../controllers/userController');
const searchController = require('./../controllers/searchController');

const routers = router
    .get('/loginUser', userController.userLogin)
    .post('/search', searchController.search)
    .post('/bindCorrelation', assetController.bindUser)
    .post('/unbindCorrelation', assetController.unbindUser)
    .post('/repair', assetController.repair)
    .post('/addBasicData',assetController.addBasicData)
    .get('/loadSupplier',assetController.loadSupplier)
    .get('/loadBsdtAsts',assetController.loadBsdtAsts)
    .post('/loadBsdtDetails',assetController.loadBsdtDetails)
    .post('/checkDuplicate',assetController.checkDuplicate)
    .post('/inbound',assetController.inbound)
    .post('/scrap',assetController.scrap)

module.exports = routers;
