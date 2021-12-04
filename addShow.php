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

if(isset($_POST['newShowTitle'])){
	$newShowTitle = $_POST['newShowTitle'];
	
	$newShowTitle = filter_var($newShowTitle, FILTER_SANITIZE_STRING);
    $newShowTitle = mysqli_real_escape_string($con, $newShowTitle);
	
	$newShowTitle = str_replace(' ', '_', $newShowTitle);
	$newShowTitle = strtolower($newShowTitle);
	
	$q = mysqli_query($con, "CREATE TABLE IF NOT EXISTS `$newShowTitle` ( `season` int(11) DEFAULT NULL, `episode` int(11) DEFAULT NULL, `text` varchar(1000) DEFAULT NULL, `startTime` int(11) DEFAULT NULL, `endTime` int(11) DEFAULT NULL, `frameArray` varchar(1000) DEFAULT NULL)");
	echo "Added - $newShowTitle\r\n";
	
} else {
    return false;
}

?>