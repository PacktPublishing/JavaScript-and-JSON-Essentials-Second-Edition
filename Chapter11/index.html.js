//index.html.js
module.exports = `
<!DOCTYPE html>
<html>
<head>
	<title>Pin board</title>
</head>
<style>
body{
	background-color: #CCB;
}
.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 30%;
    background-color:white;
    float: left;
    margin: 5px;
}
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
    padding: 2px 16px;
}
h4{
	text-align: right;
}
textarea{
	border: 0; padding: 10px; width: 90%; margin-right: .5%;
	float: left;
	width : 50%;
}
input{
	float : left;
	width : 15%;
	padding: 15px;
}
button{
	padding: 15px;
    float: left;
    width : 20%;
}
</style>
<body>
	<input type="text" id="writtenBy" placeholder="name"/><textarea id="textData" autocomplete="off" placeholder="put your thoughts!"></textarea><button id="postButton">Post</button>
	<div class="collection">
	</div>
</body>
  	<script
  src="http://code.jquery.com/jquery-3.3.1.slim.min.js"
  integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
  crossorigin="anonymous"></script>
  	<script src="/socket.io/socket.io.js"></script>
	<script>
		$(function () {

		  	const socket = io();
		  	
			$("#postButton").on('click', function(e){
				let textData = $("#textData").val();
				let writtenBy = $("#writtenBy").val();
				socket.emit('new-pin', {story : textData, writtenBy :writtenBy});
				$("#textData").val('');
				$("#writtenBy").val('');
				return false;
			})
			socket.on('append-to-list', function(data){
				$('.collection').append('<div class="card"><div class="container"><p>'+data.story+'</p><h4><b>'+data.writtenBy+'</b></h4></div></div>')
			})
			/**
			 * Pin-list get all the pins on load
			 */
			socket.on('pin-list', function(list){
				console.log("list", list);
				if(list.length){
					list.forEach(function(data){
						$('.collection').append('<div class="card"><div class="container"><p>'+data.story+'</p><h4><b>'+data.writtenBy+'</b></h4></div></div>')
					})
				}else{
					$('.collection').append('<div class="card"><div class="container"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h4><b>John Doe</b></h4></div></div>')
				}
			})
		})
	</script>
</html>
`

