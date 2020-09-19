const { Db } = require('../model/Db')
const Auth = require('../model/Auth')
const { Product } = require('../model/Product')
const { User } = require('../model/User')
const { Order } = require('../model/Order')

const env = require('dotenv').config()
const { jwt } = require('./../model/Auth')

let userRoutes = (app) => {
    //user can create add new order
    app.post('/createOrder/singleproduct/:productid', (req, res) => {
    //check for foodapp-api-key
    if(!req.headers['foodapp-api-key']){
        res.json({
            'error' : 'foodapp-api-key header need to be present'
        })
    }
    //check for bearer token
    if(!req.headers.authorization){
        //check for bearer
        res.json({
            'error' : 'Bearer token header need to be present'
        })
    }else{
        //check for bearer
        var passtoken = req.headers.authorization
        var isBearer = passtoken.split(' ')[0] === 'Bearer'
        var usertoken = passtoken.split(' ')[1]
        if(isBearer){
            jwt.verify(usertoken, 'lhicreoiiiewiohfewioho', (err, user)=>{
                if(err){
                    res.json({
                        'error' : err
                    })
                }else{
                    //check if productid exists
                    var productid = req.params.productid
                    var product = new Product;
                    if(current_product = product.findProductByID(productid)){
                        current_product.then((result)=>{
                            if(result.length <= 0){
                                res.json({
                                    'error' : 'No such product ID exist'
                                })
                            }else{

                                
                                //find order.productids with userid
                                var userObj = new User;
                                let product = new Product
                                userObj.findUserByUsername(user.username).then((result)=>{
                                    var userid = result[0].id
                                    var orderObj = new Order;
                                    orderObj.findOrderFromUserid(userid).then((orders)=>{
                                            //create new order
                                            let productArr = JSON.stringify(
                                                {
                                                    'productids' : [req.params.productid]
                                                }
                                            )
                                            product.findProductByID(req.params.productid).then((products)=>{
                                                let description = `Order of ${products[0].Name}`
                                                orderObj.createNewOrder(productArr, userid, description)
                                            })
                                    })
                                })
                                res.json({
                                    'success' : true,
                                    'status' : 'Order created'
                                })
                                
                                //order has json of product ids and userid
                            }
                        })
                    }
                }
            })
        }
        //check for signage
    }
    //check jwt signage    
    });
    
}

module.exports = userRoutes;

