
const UresponseFunc = require('./../utils/UresponseFunc');
const userService = require('./../services/userService');


class UserController {
    async userLogin (ctx,next) {
        console.log('userLogin is running...');
        let param = ctx.request.query;
        try{
            let result = await userService.userLogin(param);
            console.log(result);
            if(result.data.length > 0) {
                UresponseFunc(ctx,0,'success', result.data);
            }else{
                UresponseFunc(ctx,1,'fail', null);
            }
        }catch (e) {
            UresponseFunc(ctx,1,'fail', e);
        }
    }
}

module.exports = new UserController();