const {querySql} = require('./../utils/UmysqlQuery');
const UresponseFunc = require('./../utils/UresponseFunc');

class UserService {
    async userLogin(param) {

        let staf_id = param.staf_id;
        let staf_pswd = param.staf_pswd;
        let staf_role = param.staf_role;

        console.log(staf_id, staf_pswd, staf_role);
        try {
            let result = await querySql(`select * from AMS_STAFF where staf_id = '${staf_id}' and staf_pswd = '${staf_pswd}' and staf_role = '${staf_role}'`);
            return result;
        } catch (e) {
            console.log('catch');
            console.log(e);
        }
    }

    // //为员工查询写的接口
    // async searchStaf(param) {
    //     //定义/过滤
    //     let condition = `${param.searchType}`,
    //         value = `%${param.searchValue}%`;
    //     try {
    //         let result = await querySql(`select * from AMS_STAFF where ${condition} like '${value}';`);
    //         console.log(result);
    //         return result;
    //     }catch (e) {
    //         console.log(e);
    //         return {msg : 'connection false'}
    //     }
    // }
}

module.exports = new UserService();