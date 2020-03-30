const UresponseFunc = require('./../utils/UresponseFunc');
const searchService = require('./../services/searchService');

class SearchController {
    async search(ctx, next) {
        console.log('search is running...');
        let param = ctx.request.body.data || ctx.request.body;
        try {
            let result = await searchService.search(param);
            console.log(result.code);
            if(result.code === 0) {
                console.log('chengong');
                //成功
                UresponseFunc(ctx, 0, 'success', result.data);
            }else{
                console.log('sb');
                UresponseFunc(ctx, 1, 'fail', null);
            }
        } catch (e) {
            console.log(e);
            UresponseFunc(ctx, 1, 'fail', {msg: 'program error'});
        }
    }
}

module.exports = new SearchController();

