const UresponseFunc = require('./../utils/UresponseFunc');
const assetsService = require('./../services/assetsService');


class AssetsController {
    async bindUser(ctx, next) {
        let param = ctx.request.body.data;
        try {
            let result = await assetsService.bindUser(param);
            if (result.code === 0 && result.data.affectedRows !== 0) {
                UresponseFunc(ctx, 0, 'seccess', {'affectedRows': result.data.affectedRows});
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        } catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //资产和用户解绑
    async unbindUser(ctx, next) {
        let param = ctx.request.body.data;
        try {
            let result = await assetsService.unbindUser(param);
            if (result.code === 0 && result.data.affectedRows !== 0) {
                UresponseFunc(ctx, 0, 'seccess', {'affectedRows': result.data.affectedRows});
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        } catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //资产返修
    async repair(ctx, next) {
        let param = ctx.request.body.data;
        try {
            let result = await assetsService.repair(param);
            if (result.code === 0 && result.data.affectedRows !== 0) {
                UresponseFunc(ctx, 0, 'seccess', {'affectedRows': result.data.affectedRows});
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        } catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //添加基础数据
    async addBasicData (ctx,next) {
        let param = ctx.request.body.data;
        try {
            let result = await assetsService.addBasicData(param);
            if (result.code === 0 && result.data.affectedRows !== 0) {
                UresponseFunc(ctx, 0, 'seccess', {'affectedRows': result.data.affectedRows});
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        }catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //查询供应商
    async loadSupplier (ctx , next) {
        try {
            let result = await assetsService.loadSupplier();
            if (result.code === 0 ) {
                UresponseFunc(ctx, 0, 'seccess', result.data);
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        }catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //查询资产类型
    async loadBsdtAsts (ctx , next) {
        try {
            let result = await assetsService.loadBsdtAsts();
            if (result.code === 0 ) {
                UresponseFunc(ctx, 0, 'seccess', result.data);
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        }catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //查询资产类型详情
    async loadBsdtDetails (ctx, next) {
        let param = ctx.request.body.data;
        console.log(param);
        try {
            let result = await assetsService.loadBsdtDetails(param);

            if (result.code === 0 ) {
                UresponseFunc(ctx, 0, 'seccess', result.data);
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        }catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //资产编号查重
    async checkDuplicate(ctx , next) {
        let param = ctx.request.body.data;
        console.log(param);
        try {
            let result = await assetsService.checkDuplicate(param);
            console.log(result);
            if (result.code === 0 ) {
                if(result.data[0].count > 0) {
                    //不重复
                    UresponseFunc(ctx, 0, 'seccess', true);
                }else{
                    //重复
                    UresponseFunc(ctx, 0, 'seccess', false);
                }
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        }catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //插入sgas
    async inbound (ctx , next) {
        let param = ctx.request.body.data;
        console.log(param);
        try {
            let result = await assetsService.inbound(param);
            console.log(result);
            if (result.code === 0 && result.data.affectedRows !== 0 ) {
                UresponseFunc(ctx, 0, 'seccess',{'affectedRows': result.data.affectedRows});
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        }catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }

    //资产报废
    async scrap (ctx , next) {
        let param = ctx.request.body.data;
        try {
            let result = await assetsService.scrap(param);
            if (result.code === 0 && result.data.affectedRows !== 0) {
                UresponseFunc(ctx, 0, 'seccess', {'affectedRows': result.data.affectedRows});
            } else {
                UresponseFunc(ctx, 1, 'fail', null);
            }
        } catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', null);
        }
    }
}

module.exports = new AssetsController();