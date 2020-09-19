const { Db } = require('./Db');

class Order{
    constructor(){
        this.table = 'orders'
        this.db = new Db
        this.orderfields = ['product_ids','userid','description']
    }

    createNewOrder(productids,userid,description){
        var dbh = this.db
        var value = [productids,userid,description]
        return dbh.insert(this.table, this.orderfields,value)
    }

    updateOrder(orderid, productids, description){
        var dbh = this.db
        var value = [productids,userid,description]
        return dbh.exec(`update ${this.table} set product_ids=${productids}, description=${description} where id=${orderid}`)
    }

    findOrderFromUserid(userid){
        var dbh = this.db
        return dbh.findByField(this.table, 'userid', userid)
    }
}

module.exports = {
    'Order' : Order
}
