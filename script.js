var timer;
function openPage(url){

  //resets search timer on load
  if(timer != null){
    clearTimeout(timer);
  }

  //auto adds a ? to any loaded page for GET variables
  if(url.indexOf("?") == -1){
    url = url + "?";
  }

  //adds username to url for GET/SESSION
  var encodedUrl = encodeURI(url);

  //shoves the selected page into the mainContent div
  $("#mainContent").load(encodedUrl);
  $("body").scrollTop(0);

  //manipulates browser history so back doesn't screw things up
  history.pushState(null, null, url);
  //reloadNewMsg();
}

$( document ).ready(function() {
    $.ajax({
		  url: 'selectShow.php',
		  //data: scriptData,
		  type: 'POST',
		  processData: false,
		  contentType: false,
		  success: function(data){
			  var shows = data.split('+')
			  for(var a = 0; a < shows.length - 1; a++){
				$('#selectShow').append(`<option value="${shows[a]}">${shows[a]}</option>`);
				$('#selectShow2').append(`<option value="${shows[a]}">${shows[a]}</option>`);
			  }
		  },
		  error: function(data){
			alert("This didn't work");
		  }
		});
});



function addTextToImage(imagePath, text, number) {
    var circle_canvas = document.getElementById("canvas" + number);
    var context = circle_canvas.getContext("2d");

    // Draw Image function
    var img = new Image(640, 360);
    img.src = imagePath;
    img.onload = function () {
        context.drawImage(img, 0, 0, 640, 360);
		context.textAlign = "center";
		context.font = '24px Sans-serif';
		context.strokeStyle = 'black';
		context.lineWidth = 4;
		context.strokeText(text, 320, 335);
		context.fillStyle = 'white';
		context.fillText(text, 320, 335);
    };
}


$(function(){
  $(".searchInput").keyup(function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      var val = $(".searchInput").val();
	  var show2 = $("#selectShow2 option:selected").text();
      openPage("search.php?show=" + show2 + "&term=" + val);
    }, 2000);
  })
})