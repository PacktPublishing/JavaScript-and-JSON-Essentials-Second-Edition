const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3300');
request.onreadystatechange = function(){
    //console.log("request.status", request.readyState);
    if((request.status==200) && (request.readyState==4)){
        console.log(request.responseText);
    }
}
request.send();
