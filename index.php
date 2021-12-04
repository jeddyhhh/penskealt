<html>
<head>
	<link rel="stylesheet" href="index.css">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="parser.js"></script>
	<script src="script.js"></script>
</head>
<body>
	<h4>Add Show</h4>
	<label for="addShow">Add a show to the database:</label>
	<input type="text" id="addShow" placeholder="Type show name..."><button type="button" id="submitShow">Add Show</button><br><br>
	<h4>Script/File Upload</h4>
	<label for="selectShow">Select a show before uploading:</label>
	<select id="selectShow">
  
	</select><br>
	<label for="myfile">Select a .srt file:</label>
	<input type="file" id="myfile">
	<button type="button" id="submitScript">Scrape .srt</button><br>
	
	<!-- <label for="myfile2">Upload Video:</label>
	<input type="file" id="myfile2">
	<button type="button" id="submitVideo">Load Video</button> -->
	
	<div id="dumpedText">
	</div>
	<div class="searchContainer">
		<h4>Search for an image via quote</h4>
		<label for="selectShow2">Select a show before searching:</label>
		<select id="selectShow2">
	  
		</select>
		<input type="text" class="searchInput" value="" placeholder="Search..." onfocus="var temp_value=this.value; this.value=''; this.value=temp_value">
	</div>
	<div id="mainContent"></div>
	<script src="phandler.js"></script>
</body>
</html>