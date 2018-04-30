module.exports = [{
    method: 'GET',
    path:'/greetings', 
    handler(request, h) {
        return `hello readers!`;
    }
}]