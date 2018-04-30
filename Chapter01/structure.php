<?php
	$student = array(
		"id"=>101,
		"name"=>"John Doe",
		"isStudent"=>true,
		"scores"=>array(40, 50);
		"courses"=>array(
			"major"=>"Finance",
			"minor"=>"Marketing"
		);
	);

	//Echo is used to print the data
	echo json_encode($student); //encoding the array into JSON string

?>

<!--

`{"id":101,"name":"John Doe","isStudent":true,"scores":[40,50],"courses":{"major":"Finance","minor":"Marketing"}}`
-->

$student = '{"id":101,"name":"John Doe","isStudent":true,"scores":[40,50],"courses":{"major":"Finance","minor":"Marketing"}}';
print_r(json_decode($student));