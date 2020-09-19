const { Db } = require('./Db'); 

class Product{
    constructor(){
        this.table = 'product'
        this.db = new Db
    }

    findProductByID(id){
        var dbh = this.db
        let product = dbh.findByID(this.table,id)
        return product;
    }

    findProductByUserid(userid){
        var dbh = this.db
        let product = dbh.findByField(this.table, 'userid', userid)
        return product
    }

}

module.exports = {
    'Product' : Product
}