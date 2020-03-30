const DBfactory = require('./UmysqlQuery');

let DBConn =  async function () {
    try{
        let DBConn =  new DBfactory.DBUnity(await DBfactory.getConnection());
        await DBConn.beginTransaction();
        return DBConn;
    }catch (e) {
        console.log(e);
    }
};

module.exports = DBConn();