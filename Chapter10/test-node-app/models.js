const mongoose = require('mongoose');

//console.log("mongoose", )
module.exports.customers_address = mongoose.model('customers_address', {
	"pincode": {
        type: Number,
        validate: {
          validator: function(v) {
          	return `${v}`.length===6;
          },
          message: '{VALUE} is not a valid pincode!'
        }
    },
	"street": String,
	"city": String
});

module.exports.customers = mongoose.model('customers', {
	//	"cust_id": Number,
	"firstname" : String,
	"lastname": String,
    "Address": {type : mongoose.Schema.Types.Mixed, ref: 'customers_address'}
});