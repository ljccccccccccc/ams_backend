const mysql = require('mysql');

const CONFIG = require('./../../config/config');

const pool = mysql.createPool(CONFIG.database);

let querySql = function (sql) {
    try {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) reject(err);
                connection.query(sql, (err, rows) => {
                    if (err) reject(err);
                    resolve(new dbResult(0,true,'success',rows));
                    connection.release();
                })
            })
        })
    }catch (e) {
        console.log(e);
    }
};


const getConnection = async function () {
    try{
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    resolve(connection)
                }
            })
        });
    }catch (e) {
        console.log(e);
    }
};


class dbResult{
    /**
     * 数据层结果返回
     * @param {number} code 返回状态码 1:失败,0:成功
     * @param {boolean} success
     * @param {string} message 返回信息
     * @param {object} data 返回数据对象
     */
    constructor(code,success,message,data){
        this.code = code;
        this.message = message;
        this.data = data;
        this.success = success;
    }
}


class TransactionDB {
    constructor(connection) {
        //初始化 是否开启了事务
        this.isTransaction = false;
        //初始化 链接
        this.connection = connection;

        //开启事务
        this.beginTransaction = async () => {
            try {
                return new Promise((resolve, reject) => {
                    this.connection.beginTransaction((err, success) => {
                        if (err) {
                            //如果 开启事务失败  将标志位置为false
                            this.isTransaction = false;
                            console.log(err);
                            reject(new dbResult(2,false,JSON.stringify(err),null));
                        }
                        this.isTransaction = true;
                        resolve(new dbResult(0,true,"事务开启成功",null));
                    })
                })
            }catch (e) {
                console.log(e);
            }
        };

        //执行sql
        this.query = async (sql) => {
            return new Promise((resolve, reject) => {
                try{
                    this.connection.query(sql, (err, rows) => {
                        //没有开启事务
                        if (!this.isTransaction) {
                            this.connection.release();
                            reject(new dbResult(1,false,"未开启事务",null));
                        }
                        if (err) {
                            this.connection.release();
                            console.log(err);
                            reject(new dbResult(2,false,JSON.stringify(err),null));
                        }
                        console.log(rows);
                        resolve(new dbResult(0,true,"sql执行成功",rows));
                    })
                }catch (e) {
                    console.log(e);
                }
            })
        };

        //提交事务
        this.commit = async () => {
            try{
                return new Promise((resolve, reject) => {
                    this.connection.commit((err) => {
                        if (err) {
                            this.connection.release();
                            reject(new dbResult(2,false,JSON.stringify(err),null));
                        }
                        this.connection.release();
                        resolve(new dbResult(0,true,'提交成功',null));
                    })
                })
            }catch (e) {
                console.log(e);
            }
        };

        //回滚事务
        this.rollback = async () => {
            try {
                await this.connection.rollback(() => {
                    this.connection.release();
                });
            }catch(e){
                console.log(e);
            }
        };
    }
}


module.exports = {
    querySql,
    TransactionDB,
    getConnection
};