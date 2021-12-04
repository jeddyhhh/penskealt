<?php
//header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

$timezone = date_default_timezone_set("Australia/Melbourne");

$con = mysqli_connect("127.0.0.1", "root", "", "penskealt");
if(isset($_GET['term'])){
  $term = urldecode($_GET['term']);
  $show = urldecode($_GET['show']);
} else {
  $term = "";
  $show = "";
}

$numberOfResults = 0;

$imageQuery = mysqli_query($con, "SELECT * FROM $show WHERE locate('$term',text)>0 LIMIT 50");

while($row = mysqli_fetch_array($imageQuery)){
	$urlArray = array();
	$randomNumber = rand(1,500);
	$canvasArray = array();
	$imageArray = explode(",",$row['frameArray'],100);
	$imgForText = end($imageArray);
	$cleanText = htmlspecialchars_decode($row['text']);
	$arrayCount = count($imageArray);
	$rootDir = "/images/".$show."/0".$row['season']."/0".$row['episode']."/";
	for($a = 0; $a < $arrayCount; $a++){
		//array_push($urlArray, "<img src='".$rootDir.$imageArray[$a].".jpg' width='480' height='280'>");
		if($imageArray[0] != $imageArray[1]){
			array_push($canvasArray, "<canvas id='canvas".$imageArray[$a].$randomNumber."' width='640' height='360'></canvas><script src='replace.js'></script><script>var str = '".$cleanText."';var replace = str.replace(/&#39;/g, \"'\");addTextToImage('http://127.0.0.1".$rootDir.$imageArray[$a].".jpg', replace, '".$imageArray[$a].$randomNumber."');</script><textarea id='customText' rows='4' cols='60' onkeyup='replaceText(".$imageArray[$a].$randomNumber.", this.value, \"http://127.0.0.1".$rootDir.$imageArray[$a].".jpg\")'>".$cleanText."</textarea>");
		}
		$numberOfResults = $numberOfResults + 1;
	}
	
	if($imageArray[0] != $imageArray[1]){
		echo "<div class='gridViewItem' title='". $cleanText ."'>".implode(",",$canvasArray)."</div>";
	};
};

?>