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
$result = mysqli_query($con,"SHOW TABLES"); 

while ($row = mysqli_fetch_array($result)) { 
	echo "$row[0]+"; 
}
?>