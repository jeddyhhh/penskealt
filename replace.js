function replaceText(frameNumber, newText, imageURL){
	var c = document.getElementById("canvas" + frameNumber);
	var ctx = c.getContext("2d");

	//ctx.clearRect(0, 0, c.width, c.height);
	var img = new Image(640, 360);
    img.src = imageURL;
    img.onload = function () {
		ctx.drawImage(img, 0, 0, 640, 360);
		
		var lines = newText.split('\n');

		for (var i = 0; i<lines.length; i++){
			var lineHeight = 24;
			ctx.textAlign = "center";
			ctx.font = '24px Sans-serif';
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 4;
			ctx.strokeText(lines[i], 320, 280 + (i*lineHeight));
			ctx.fillStyle = 'white';
			ctx.fillText(lines[i], 320, 280 + (i*lineHeight));
		};
		
	}
};
