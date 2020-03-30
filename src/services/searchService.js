const {querySql} = require('./../utils/UmysqlQuery');

class SearchService {
    async search(param) {
        let searchType = param.searchType || 'sgas_uid',
            searchValue = param.searchValue || '';
        //如果searchType存在值
        let table = 'a';
        let type = searchType.substring(0, 4);
        type === 'sgas' ? table = 'a' : type === 'bsdt' ? table = 'b' : table = 'c';

        try {
            let result = await querySql(`
            select *
            from 
             AMS.AMS_SINGLE_ASSET a 
            left join AMS.AMS_BASEDATA b 
            on a.sgas_bsdt_id = b.id 
            left join AMS_STAFF c 
            on a.sgas_owner = c.staf_id 
            left join AMS_SUPPLIER d 
            on b.bsdt_supplier = d.splr_id
            where  ${table}.${searchType} like '%${searchValue}%'
            order by a.id;`);
            // console.log(result);
            return result;
        } catch (e) {
            console.log(e);
            return {msg: 'connection false'}
        }
    }
}

module.exports = new SearchService();