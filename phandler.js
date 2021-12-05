document.getElementById('myfile').onchange = function() {

  var file = this.files[0];
  var fileName = this.files[0].name;
  var epDet = fileName.match(/\d+/g);
  var season = epDet[0];
  var episode = epDet[1];
  var FR = new FileReader();
  var startFrame = "1";
  var frameArray = [];
  var show = $("#selectShow option:selected").text();
  var rootDir = "/images/" + show + "/" + season + "/" + episode + "/";
  var urlArray = [];
  
  FR.readAsText(file);
  
  FR.onload = function(data) {
	var myVar = data.target.result;
	//Array with {line, startTime, endTime, text}
	var result = PF_SRT.parse(myVar);
	for (var i = 0; i < result.length; i++){
	  var obj = result[i];
	  var startTime = obj["startTime"];
		var sTMS = startTime.split(/\D/).reduce((acc, v, i) => acc += v*[3.6e6,6e4,1e3,1][i], 0);
		var sTS = parseInt(Math.floor(sTMS / 1000));
	  var endTime = obj["endTime"];
		var eTMS = endTime.split(/\D/).reduce((acc, v, i) => acc += v*[3.6e6,6e4,1e3,1][i], 0);
		var eTS = parseInt(Math.floor(eTMS / 1000));
		
	  var tD = Math.abs(sTS - eTS);
	  var dia = obj["text"];
	  
	  if(sTS == 1){
		frameArray.push(startFrame);
		for(var z = 0; z < tD; z++){
			frameArray.push(tD + (z * 2));
		}
	  } else if (sTS >= 2) {
		frameArray.push(sTS * 2);
		for(var b = 1; b < tD * 2; b++){
			frameArray.push(((sTS * 2) + (b)));
		}
		frameArray.push(eTS * 2);
	  }
	  
	  for(var c = 0; c < frameArray.length; c++){
		  urlAObj = frameArray[c];
		  var thumbURL = rootDir + urlAObj + ".jpg";
		  urlArray.push("<img src='" + thumbURL + "' onclick='window.open(this.src)' width='120' height='70'>");
	  }

	  $("#dumpedText").append("<div class='oneLine'><span id='startTime'>" + sTS + "</span> - <span id='endTime'>" + eTS + "</span> - <span id='text'>" + dia + "</span> - <span id='frameArray'>" + frameArray + "</span><br>" + urlArray + " - " + fileName + " - <span id='season'>" + season + "</span> - <span id='episode'>" + episode + "</span></div>" );
	  frameArray = [];
	  urlArray = [];
	}
  }
};

//$("#dumpedText").html(myVar);

$("#submitScript").click(function(){
	$('.oneLine').each(function(){
		var sT = $(this).find("#startTime").text();
		var eT = $(this).find("#endTime").text();
		var diaT = $(this).find("#text").text();
		var fA = $(this).find("#frameArray").text();
		var sS = $(this).find("#season").text();
		var sE = $(this).find("#episode").text();
		var show = $("#selectShow option:selected").text();
				
		var scriptData = new FormData();
		scriptData.append("startTime", sT);
		scriptData.append("endTime", eT);
		scriptData.append("text", diaT);
		scriptData.append("frameArray", fA);
		scriptData.append("season", sS);
		scriptData.append("episode", sE);
		scriptData.append("show", show);
	
	
		$.ajax({
		  url: 'addScript.php',
		  data: scriptData,
		  type: 'POST',
		  processData: false,
		  contentType: false,
		  success: function(data){
			  //var message = "data here -->" + data;
			  //alert(message);
		  },
		  error: function(data){
			alert("This didn't work " + data);
		  }
		});
		
	});
	alert("Finished");
});

$("#submitShow").click(function(){
	var newShow = $('#addShow').val();
	
	var newShowData = new FormData();
	newShowData.append("newShowTitle", newShow);
	
	$.ajax({
		  url: 'addShow.php',
		  data: newShowData,
		  type: 'POST',
		  processData: false,
		  contentType: false,
		  success: function(data){
			  alert(data);
		  },
		  error: function(data){
			alert("This didn't work");
		  }
		});
});
