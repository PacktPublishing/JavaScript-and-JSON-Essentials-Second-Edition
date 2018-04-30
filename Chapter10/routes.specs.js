const request = require('request');
const assert = require('assert');

describe('Test routes', ()=>{
	it('Testing GET: greetings', (done)=>{
		console.log("Testing the /greetings route");
		request.get('http://localhost:3300/greetings', (err, httpResponse, body)=>{
			if(err){
				throw err;
			}
			assert.equal(httpResponse.statusCode, 200);
			assert.ok(body=='hello readers');
			done();
		})

	})
	it('Testing GET: customer/add', (done)=>{
		console.log("Testing the /customer/add route");
		let payload = {
		  "firstname":"firstTest",
		    "lastname": "lastTest",
		    "Address":{
		        "pincode": 111111,
		        "street": "testmile",
		        "city": "TC"
		    }
		};

		request.post({
            url: `http://localhost:3300/customer/add`,
            json: payload
        }, (err, httpResponse, body)=>{
				if(err){
					throw err;
				}
				
				const filteredCustomerList = body.customerList.filter(function(customerData){
					return (customerData.firstname==payload.firstname && customerData.lastname==payload.lastname)
				})


				assert.equal(httpResponse.statusCode, 200);
				//The data inserted above should have atleast one customer instance
				assert.ok(filteredCustomerList.length > 1);
				
				done();
		})
	})
})