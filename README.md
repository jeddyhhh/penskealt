# penskealt
Offline web-based Meme generator with database capabilities.<br>
MKV files with embedded subtitle files (.srt) only.

Requirements:<br>
PHP 5+, a database of some sort, ability to extract frames using FFMPEG, ability to use MKVCleaver to extract the .srt file.<br>
For Windows, it is recommended you install WAMP as this installs everything you need, download here: https://www.wampserver.com/en/

Installation:<br>
For WAMP, go to the install directory, then "www", delete everything in there and replace with the files in this repository.<br>
In the "www" folder, create a "images" directory.<br>
You will need to create a "penskealt" database.<br>
If you have just installed WAMP, left click green "WAMP" icon in your taskbar then click "PhpMysqlAdmin".<br>
Login using the default user/pass of "root" and "" (blank, no password).<br>
Click the "New" button on the left hand side, above "information_scema".<br>
Type "penskealt" in the "Database Name" field and press "Create".<br>
Congrats, you're ready to horde funny jery pictures.

Usage:<br>
<b>SCRIPT INGESTION/FRAME FINDING:</b></br>
Go to http://127.0.0.1<br>
This is the busted-ass web 1.0 interface that I cludged together.

The process of making this work and not explode is this order of actions.<br>
1. Create a new show catagory, at the top of the page type in a show name eg; "seinfeld", keep it lowercase and replace spaces with underscores.<br>
You are not limited to seinfeld, literally any show that you have the video files and subtitle (.srt) for can be added.

2. You will need to manually extract video frames using FFMPEG, download from here: http://www.ffmpeg.org/<br>
penskealt is designed to use 2 frames per second intervals, the FFMPEG command for 23.97fps video is:<br>
ffmpeg -i Seinfeld.S01E01.mkv -vf "select=not(mod(n\,12))" -vsync vfr -q:v 2 %d.jpg<br>
or to change the size of the picture it generates<br>
ffmpeg -i Seinfeld.S01E01.mkv -vf "scale=1280:720,setsar=1,select=not(mod(n\,12))" -vsync vfr -q:v 2 %d.jpg (change the "1280:720" part to whatever you want)

Replace "Seinfeld.S01E01.mkv" with the name of the video you are processing and run the command<br>
It will spit out thousands of frames and will take about 2 minutes to process.<br>
It is recommended you use a new folder to do this in, so the frames don't invade another folder.

3. In the root directory of you webserver, go to your "images" folder.<br>
Create a folder exactly the same name as the show catagory you've just create in step 1 eg; "seinfeld"<br>
Go into that folder and create a folder for the season of that show eg; "01" (for season 1)<br>
Go into that folder and create a folder for the episode of that season eg; 01 (for episode 1)<br>
Place the thosands of frames you've just generated into this folder eg "{root}/images/seinfeld/01/01/1.jpg 2.jpg etc..."
Repeat this for every episode for every show (have fun).

4. Download MKVCleaver https://www.videohelp.com/software/MKVcleaver<br>
Use this to load the episode file (need to be MKV format) and extract the subtitle file.

5. Go back to http://127.0.0.1<br>
Select the show the episode is related to using the dropdown menu<br>
Select the .srt file you just extracted using "Choose File"<br>
It will automatically load the .srt and find the related frames, you can double check things line up by scrolling down and manually checking.<br>
To finalise, click the "Scrape .srt" button at the top of the page.

6. Repeat for process for each show and/or episode. I'm currently looking for ways to make this more automated.

<b>MEME GENERATION</b></br>
1. The last section in the "Seatrch by quote" area, select a show using the dropdown menu.</br>
2. Type in a quote from the show you've just scraped, it will find those frames and display them with the original script text, scroll down to see more.</br>
3. You can change the text of the image using the textbox next to the image, limited to 4 lines.</br>
4. You can right-click copy/save this image, the text will be retain so you can paste it into photoshop/straight to facebook etc.



