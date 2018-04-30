const models = require('./models');
const mongoose = require('mongoose');
const Boom      = require('Boom');
module.exports = [{
    method: 'GET',
    path:'/greetings', 
    handler(request, h) {
    	return "hello readers";
    }
}, {
    method: 'POST',
    path:'/customer/add', 
    handler(request, h) {
        const requestBody   = request.payload;
        return (async ()=>{
            try{
                /**
                * Native mongodb code 
                * const dbInstance  = request.dbInstance;
                * const customerCollection = dbInstance.collection('customer');
                * return customerCollection.insert(requestBody)
                **/
                const customersModel = models.customers;
                const customersModelInstance = new models.customers(requestBody);
                let error = new models.customers_address(requestBody.Address).validateSync();
                if(error)
                    return Boom.boomify(error, { statusCode: 422 });

                await customersModelInstance.save();
                const customerList = await customersModel.find({});
                return {
                    message : "customer added successfully",
                    customerList
                };
            }catch(e){
                throw Boom.boomify(e, { statusCode: 500 });
            }
        })();
    }
}]



