var $window = $(window),
	$playBtn = $('.play-btn');
//global variable for the video objects
var vids = [];


/**
* @class Video
*
* @param vidElement - the video DOM element
* @param options - control over the basic gui of the video
*/

function Video(vidElement, options) {
	//assign the "this" to mediaPlayer object(self). Just to make it easier to read
	var self = this,
		// the html video is the first element of the vid object
		thisVideo = vidElement,
		//assign the video jQuery object to variable
		vidJayQryObject = $(vidElement),
		ORIGINALVIDEOWIDTH = 854,
		ORIGINALVIDEOHEIGHT = 480,
		VIDEOWIDTHTOHEIGHTRATIO = ORIGINALVIDEOWIDTH / ORIGINALVIDEOHEIGHT,
		button = vidJayQryObject.parent().find(".vid-controls"),
		duration;
		// console.log(self);
		// console.log(thisVideo);
		// console.log(vidJayQryObject);

	var init = function() {
	  vidElement.controls = false;

	  //add features based on provided options

	  if(options.clickPlayPause) {
	  	//if clicked anywhere in the video
	  	vidJayQryObject.click(function(){
	  		// console.log("CLICKED");
	  		self.togglePlayPause(thisVideo);
	  	});
	  	//if clicked in the button
	  	button.click(function(event){
	  		event.preventDefault();
	  		console.log("buttun CLICKED");
	  		self.togglePlayPause(thisVideo);
	  	});

	  }

	  thisVideo.addEventListener('timeupdate', self.timeController);
	  thisVideo.addEventListener('loadedmetadata', function() {
		    duration = thisVideo.duration;
    	});
	  thisVideo.addEventListener('ended', function(){
	  	console.log("video ended");
	  	 button.fadeIn();
	  	 thisVideo.load();	  	 
	  });
	  // thisVideo.addEventListener("canplay",function() { thisVideo.currentTime = 7;});
	};

	self.togglePlayPause = function() {
		// console.log(thisVideo.ended);
		// console.log('jquery  of the video cliked'+vidJayQryObject);
	  if (thisVideo.paused ) {
	    thisVideo.play();
	    button.fadeOut();
	  }
	  else if(thisVideo.ended){
	  	console.log("video ended should restart",thisVideo.currentTime);
	  	// thisVideo.currentTime = 0;
	  	// thisVideo.play();
	   //  button.fadeOut();
	  }
	  else {
	    thisVideo.pause();
	    // $("#play-btn").fadeIn("slow");
	    button.fadeIn();
	  }
	}
	
	self.getVideoHeight = function(){
	  vidHeight = Math.round( $window.width() / VIDEOWIDTHTOHEIGHTRATIO );
	  // console.log( $window.width() );
	  // console.log( vidHeight );
	  return vidHeight;
	}

	self.timeController = function(){
		var time = thisVideo.currentTime;
		console.log("time controler" + time, duration);
	}

	init();
	
}

///////////////////////////////////////////////////////////
//	U P D A T E
///////////////////////////////////////////////////////////

function update(){
  //keep track of where the top of the window is
  var windowPos = $window.scrollTop(),
      winHeight = $window.height();

     $('.section').each(function(){
     	var $this = $(this);
     	if($this.data("bg-ratio") !== undefined){
     		var bgSpeed   = +$this.data("bg-ratio"),
	     		bgOffset   = ( $this.data("bg-offset") !== undefined ) ? +$this.data("bg-offset") : 0 ,
		     	currentYpos =parseInt($this.css("background-position-y"), 10), //background-position-y is not supported in ff
		     	slideTopPos = $(this).position().top,
		     	thisPos = windowPos - slideTopPos,
		     	newYpos = Math.round(bgOffset + (thisPos*bgSpeed));

		     $this.css('backgroundPosition', "50% " + newYpos+"%");
		     // console.log(windowPos ,bgSpeed, currentYpos, newYpos );
     	}
     });
}


///////////////////////////////////////////////////////////
//	 helper functions
///////////////////////////////////////////////////////////

function scrollTo(where){
	event.preventDefault();
	var scrollTarget = where.attr("href"),
		yPosTarget = $('body').find(scrollTarget).position().top,
		headerHeight = $('header').height();

console.log(yPosTarget);
	var goToTarget = function(){
		$('body,html').animate({scrollTop: yPosTarget-headerHeight},1000);
		
	}();
}

function adjustToWindow(){
	$('#sec-1').css('min-height', vids[0].getVideoHeight());
}

function reveal(){
  $(this).hide();
  $(this).next().fadeToggle();
  console.log($(this));
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//		 M A I N 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
	//boostrap srollpy for the body.
	$('body').scrollspy({ target: '#navbar', offset: 200 });
	$('body').scrollspy({ target: '#sideNavBar', offset: 200 });
	//iterate over each video in the DOM and initialize it

	$('video').each(function(i,e) {
		vids.push(new Video(e, {
			clickPlayPause: true
		}));
	});

	$window.resize(adjustToWindow);
	$window.scroll(update);
	adjustToWindow();
	//a simple way of reavealing content. it hide the visible one and shows the next sibling
	$(".reveal").on('click', 'a', reveal);


	$(".nav").on('click', 'a', function(event){
		scrollTo($(this));
	});

    console.log("listo");
});










