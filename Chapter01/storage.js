let completeJSON = {
    "hello": "World is a great place",
    "num": 5
}

let stringifiedJSON = JSON.stringify(completeJSON);

let parsedJSON = JSON.parse(stringifiedJSON);

// {
//     "hello": "World is a great place",
//     "num": 5
// }