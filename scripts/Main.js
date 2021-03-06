﻿/*global

$: true,
ON_PRODUCTION: true,
Notification: true,
Settings: true,
PlaylistsManager: true,
video_Init: true,
volume_Init: true,
translations_Init: true,
spotifyImport_Init: true,
settings_Init: true,
search_Init: true,
queue_Init: true,
ping_Init: true,
notification_Init: true,
fatBar_Init: true,
url_Init: true,

*/

// GLOBALS
var playlistManager;
var youTubeApiReady = false;
var player = null;
var SOUNDCLOUD_API_KEY = '206f38d9623048d6de0ef3a89fea1c4d';

$(document).ajaxError(function (e, r, ajaxOptions, thrownError) {
    if (r.status === 500 && $.trim(r.responseText).length > 0) {
        if (ON_PRODUCTION) {
            Notification.say('Connection error! <i>' + r.responseText + '</i>');
        } else {
            $('body').html(r.responseText);
        }
    }
});

Date.prototype.getWeek = function (dowOffset) {
	/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
	dowOffset = typeof(dowOffset) === 'int' ? dowOffset : 0; //default dowOffset to zero
	var newYear = new Date(this.getFullYear(),0,1);
	var day = newYear.getDay() - dowOffset; //the day of week the year begins on
	day = (day >= 0 ? day : day + 7);
	var daynum = Math.floor((this.getTime() - newYear.getTime() - (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	var weeknum;
	//if the year starts before the middle of a week
	if(day < 4) {
		weeknum = Math.floor((daynum+day-1)/7) + 1;
		if(weeknum > 52) {
            var nYear, nday;
			nYear = new Date(this.getFullYear() + 1,0,1);
			nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			/*if the next year starts before the middle of
			the week, it is week #1 of that year*/
			weeknum = nday < 4 ? 1 : 53;
		}
	} else {
		weeknum = Math.floor((daynum+day-1)/7);
	}
	return weeknum;
};

$(document).ready(function() {
    var settings = new Settings();
	
    EventSystem.init();
    Menu.init();

    playlistManager = new PlaylistsManager();

	volume_Init();
	video_Init();
	translations_Init();
    spotifyImport_Init();
    settings_Init();
    Search.init();
    Queue.init();
    ping_Init();
    notification_Init();
    webstore_Init();
    player = new PlayerManager();
    player.init();
    Timeline.init();
    Flattr.init();
    VideoInfo.init();
    fatBar_Init();
    BottomPanel.init();
    Window.init();
    TopMenu.init();
    url_Init();
});

function onYouTubePlayerAPIReady() {
    youTubeApiReady = true;
	// 
	// Player cannot be loaded before
	// $(window).load()
}
