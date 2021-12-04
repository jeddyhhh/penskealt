<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

$timezone = date_default_timezone_set("Australia/Melbourne");

$con = mysqli_connect("127.0.0.1", "root", "", "penskealt");

if(mysqli_connect_errno()){
  echo "Failed to connect: " . mysqli_connect_errno();
}

if(isset($_POST['startTime'])){
	$startTime = $_POST['startTime'];
	$endTime = $_POST['endTime'];
	$text = $_POST['text'];
	$frameArray = $_POST['frameArray'];
	$season = $_POST['season'];
	$episode = $_POST['episode'];
	$show = $_POST['show'];
	
	$text = filter_var($text, FILTER_SANITIZE_STRING);
    $text = mysqli_real_escape_string($con, $text);
	
	$q = mysqli_query($con, "INSERT INTO $show VALUES ($season, $episode, '$text', $startTime, $endTime, '$frameArray')");
	//echo "Added - $text\r\n";
	
} else {
    return false;
}

?>