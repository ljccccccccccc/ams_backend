/*
* @name : U-responseFunc
* @function : 指定response统一返回格式
* @author : ljccccccccccc@163.com
* */

const responseFunc = (context , status, msg, data = null) => {
    context.response.body = {
        status,
        msg ,
        data
    };
    console.log({
        status,
        msg ,
        data
    })
};

module.exports = responseFunc;

