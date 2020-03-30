const TransactionDB = require('./../utils/UmysqlQuery');

// const UresponseFunc = require('./../utils/UresponseFunc');

class AssetsService {

    //资产和用户绑定
    async bindUser(param) {
        let staf_id = param.staf_id,
            sgas_id = param.sgas_id;
        let DBConn = new TransactionDB.TransactionDB(await TransactionDB.getConnection());
        try {
            await DBConn.beginTransaction();
            let results = await DBConn.query(`update AMS.AMS_SINGLE_ASSET set sgas_owner = '${staf_id}' where sgas_uid = '${sgas_id}';`);
            await DBConn.commit();
            console.log('res');
            console.log(results);
            return results;
        } catch (e) {
            console.log(e);
            await DBConn.rollback();
        }
    }

    //解绑service
    async unbindUser(param) {
        //接收参数
        let sgas_id = param.sgas_id;
        //获取连接
        let DBConn = new TransactionDB.TransactionDB(await TransactionDB.getConnection());
        try {
            //开启事务
            await DBConn.beginTransaction();
            //status == 1 库存
            //修改状态 解除绑定
            let results = await DBConn.query(`update AMS.AMS_SINGLE_ASSET set sgas_owner = '' , sgas_status = '1' where sgas_uid = '${sgas_id}';`);
            //提交修改
            await DBConn.commit();
            //返回结果
            return results;
        } catch (e) {
            console.log(e);
            await DBConn.rollback();
        }
    }

    //返修
    async repair(param) {
        //接收参数
        let sgas_id = param.sgas_id;
        //获取连接
        let DBConn = new TransactionDB.TransactionDB(await TransactionDB.getConnection());
        try {
            //开启事务
            await DBConn.beginTransaction();
            //status == 3 返修
            //修改状态 解除绑定
            let results = await DBConn.query(`update AMS.AMS_SINGLE_ASSET set sgas_status = '3' where sgas_uid = '${sgas_id}';`);
            //提交修改
            await DBConn.commit();
            //返回结果
            return results;
        } catch (e) {
            console.log(e);
            await DBConn.rollback();
        }
    }

    //添加基础数据
    async addBasicData(param) {
        let bsdt_asts = param.bsdt_asts || ' ',
            bsdt_asts_details = param.bsdt_asts_details || ' ',
            bsdt_status = param.bsdt_status || 0,
            bsdt_lifetime = param.bsdt_lifetime || 43800,
            bsdt_brand = param.bsdt_brand || '默认品牌',
            bsdt_series = param.bsdt_series || '默认系列',
            bsdt_type = param.bsdt_type || '默认型号',
            bsdt_price = param.bsdt_price || '9999.00',
            bsdt_supplier = param.bsdt_supplier || '1', //1是默认
            bsdt_attr1 = param.bsdt_attr1,
            bsdt_attr2 = param.bsdt_attr2,
            bsdt_attr3 = param.bsdt_attr3,
            bsdt_attr4 = param.bsdt_attr4,
            bsdt_attr5 = param.bsdt_attr5,
            bsdt_attr6 = param.bsdt_attr6,
            bsdt_attr7 = param.bsdt_attr7,
            bsdt_attr8 = param.bsdt_attr8,
            bsdt_attr9 = param.bsdt_attr9;

        let DBConn = new TransactionDB.TransactionDB(await TransactionDB.getConnection());
        try {
            //开启事务
            await DBConn.beginTransaction();
            //插入数据
            let results = await DBConn.query(`
            insert into AMS_BASEDATA 
            (bsdt_asts,bsdt_asts_details , bsdt_status, bsdt_lifetime, bsdt_brand, bsdt_series, bsdt_type, bsdt_price, bsdt_supplier, bsdt_attr1, bsdt_attr2, bsdt_attr3, bsdt_attr4, bsdt_attr5, bsdt_attr6, bsdt_attr7, bsdt_attr8, bsdt_attr9) 
            values 
            ('${bsdt_asts}','${bsdt_asts_details}','${bsdt_status}','${bsdt_lifetime}','${bsdt_brand}','${bsdt_series}','${bsdt_type}','${bsdt_price}','${bsdt_supplier}','${bsdt_attr1}','${bsdt_attr2}','${bsdt_attr3}','${bsdt_attr4}','${bsdt_attr5}','${bsdt_attr6}','${bsdt_attr7}','${bsdt_attr8}','${bsdt_attr9}')
            `);
            //提交修改
            await DBConn.commit();
            //返回结果
            return results;
        } catch (e) {
            console.log(e);
            await DBConn.rollback();
        }

    }

    //查询供应商
    async loadSupplier() {
        try {
            return await TransactionDB.querySql(`select splr_id , splr_name , splr_brand from AMS_SUPPLIER where splr_status = '0'`)
        } catch (e) {
            console.log(e);
            return {code: 99};
        }
    }

    //查询资产类型
    async loadBsdtAsts() {
        try {
            return await TransactionDB.querySql(`select bsdt_asts , min(id) id from AMS_BASEDATA where bsdt_status = '0' group by bsdt_asts ;`)
        } catch (e) {
            console.log(e);
            return {code: 99};
        }
    }

    //查询资产详情
    async loadBsdtDetails(param) {
        let sgas_bsdt_id = param.sgas_bsdt_id;
        console.log(sgas_bsdt_id);
        try {
            return await TransactionDB.querySql(`select bsdt_asts_details from AMS_BASEDATA where bsdt_status = 0 and bsdt_asts = (select bsdt_asts from AMS_BASEDATA where id = ${sgas_bsdt_id})`)
        } catch (e) {
            console.log(e);
            return {code: 99};
        }
    }

    //资产编号查重
    async checkDuplicate(param) {
        let sgas_uid = param.sgas_uid;
        try {
            return await TransactionDB.querySql(`select count(*) count from AMS_SINGLE_ASSET where sgas_uid = '${sgas_uid}';`)
        } catch (e) {
            console.log(e);
            return {code: 99};
        }
    }

    //插入sgas
    async inbound(param) {
        let sgas_uid = param.sgas.sgas_uid ,
            sgas_status = param.sgas.sgas_status,
            //详情
            sgas_bsdt_details = param.sgas.sgas_bsdt_details,
            //id
            sgas_bsdt_id = param.sgas.sgas_bsdt_id,
            //类型
            sgas_bsdt_asts = param.sgas.sgas_bsdt_asts,
            sgas_owner = param.sgas.sgas_owner,
            sgas_location = param.sgas.sgas_location,
            // sgas_purchase_date = param.sgas_purchase_date,
            // sgas_entry_date = param.sgas_entry_date,
            // sgas_receive_date = param.sgas_receive_date,
            sgas_is_dismantled = param.sgas.sgas_is_dismantled,
            sgas_dismantle_src = param.sgas.sgas_dismantle_src || '',
            sgas_equipment1 = param.sgas.sgas_equipment1 || '',
            sgas_equipment2 = param.sgas.sgas_equipment2 || '',
            sgas_equipment3 = param.sgas.sgas_equipment3 || '',
            sgas_equipment4 = param.sgas.sgas_equipment4 || '',
            sgas_equipment5 = param.sgas.sgas_equipment5 || '',
            sgas_equipment6 = param.sgas.sgas_equipment6 || '',
            sgas_equipment7 = param.sgas.sgas_equipment7 || '',
            sgas_equipment8 = param.sgas.sgas_equipment8 || '',
            sgas_equipment9 = param.sgas.sgas_equipment9 || '';
        console.log(sgas_uid);
        console.log(sgas_status);
        console.log(sgas_owner);
        console.log(sgas_location);
        console.log(sgas_is_dismantled);
        console.log(sgas_dismantle_src);

        let DBConn = new TransactionDB.TransactionDB(await TransactionDB.getConnection());
        try {
            //开启事务
            await DBConn.beginTransaction();
            //插入数据
            let results = await DBConn.query(`
            INSERT INTO AMS_SINGLE_ASSET 
            ( sgas_uid,sgas_bsdt_id, sgas_status, sgas_owner,  sgas_location, sgas_is_dismantled, sgas_dismantle_src, sgas_equipment1,sgas_equipment2,sgas_equipment3,sgas_equipment4,sgas_equipment5,sgas_equipment6,sgas_equipment7,sgas_equipment8,sgas_equipment9,sgas_his_owner) 
            VALUES 
            ( '${sgas_uid}',${sgas_bsdt_id}, '${sgas_status}', '${sgas_owner}' ,'${sgas_location}','${sgas_is_dismantled}' ,'${sgas_dismantle_src}','${sgas_equipment1}','${sgas_equipment2}','${sgas_equipment3}','${sgas_equipment4}','${sgas_equipment5}','${sgas_equipment6}','${sgas_equipment7}','${sgas_equipment8}','${sgas_equipment9}','');
            `);
            //提交修改
            await DBConn.commit();
            //返回结果
            return results;
        } catch (e) {
            console.log(e);
            await DBConn.rollback();
        }
    }

    //资产报废
    async scrap (param) {
        //接收参数
        let sgas_id = param.sgas_id;
        //获取连接
        let DBConn = new TransactionDB.TransactionDB(await TransactionDB.getConnection());
        try {
            //开启事务
            await DBConn.beginTransaction();
            //status == 4 返修
            //修改状态 解除绑定
            let results = await DBConn.query(`update AMS.AMS_SINGLE_ASSET set sgas_status = '4' where sgas_uid = '${sgas_id}';`);
            //提交修改
            await DBConn.commit();
            //返回结果
            return results;
        } catch (e) {
            console.log(e);
            await DBConn.rollback();
        }
    }
}

module.exports = new AssetsService();