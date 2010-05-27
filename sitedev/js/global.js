var GWU = {};
GWU.vars = {
		popupVideoHTML: '<div id="jsVideoPlayer" class="jsVideoPlayerLoader"><div id="jsVideoPlayerClose"></div></div><div id="jsVideoPlayerScreen"></div>'
	   };

// These variables will need to be set by the CMS
var currentHeroPlayerImage = 1;
var maxHeroPlayerImages = 8;

var slideID;

function slideSwitch() {    
    
    var $active = $('#heroImage #heroSlideSet img.activeHeroImage');
	var $activeCaption = $('#heroImage #heroCaption p.activeCaption');
	var $activeRollover = $('#heroRollover .activeRollover');
	
	
    if ( $active.length == 0 ) $active = $('#heroImage #heroSlideSet img:last');
    if ( $activeCaption.length == 0 ) $activeCaption = $('#heroImage #heroCaption p:first');
    if ( $activeRollover == 0 ) $activeRollover = $('#heroImage #heroRollover li:first');

    var $next =  $active.next().length ? $active.next()
        : $('#heroImage #heroSlideSet img:first');
	var $nextCaption =  $activeCaption.next().length ? $activeCaption.next()
        : $('#heroImage #heroCaption p:first');
   	var $nextRollover =  $activeRollover.next().length ? $activeRollover.next()
        : $('#heroImage #heroRollover li:first');
        
    $active.addClass('lastActiveHeroImage');
	$('#heroImage #heroCaption p').hide();
	
    $next.css({opacity: 0.0})
        .addClass('activeHeroImage')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('activeHeroImage lastActiveHeroImage');
        });
    
    $nextCaption.hide()
        .addClass('activeCaption')
        .fadeIn('slow',function() {
            $activeCaption.removeClass('activeCaption');
        });			

	$nextRollover.addClass('activeRollover')
    $activeRollover.removeClass('activeRollover');
}

function startSlideShow() {
   	slideID = setInterval( "slideSwitch()", 8000 );
    $('#playHeroPlayer').parent().hide();
    $('#pauseHeroPlayer').parent().fadeIn();
    
}
function pauseSlideShow() {
    clearInterval(slideID);
    $('#pauseHeroPlayer').parent().hide();
    $('#playHeroPlayer').parent().fadeIn();			    
}




$(document).ready(function()
{
	
	
	// FancyBox Setup
	/* This is basic - uses default settings */

	/* Using custom settings */

	$("a.photoGallery").fancybox({
		'type'				: 'iframe',
		'hideOnContentClick': true,
		'width'         	: 525,
		'height'        	: 510,
		'scrolling'			: 'no',
		'hideOnContentClick': false,
		'autoDimensions'	: false,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'overlayColor'		: '#000',
		'padding'			: 0,
		'overlayOpacity'	: 0.7,
		'onComplete'		: function() { }
	});
	
	$("a.youtube").fancybox({
		'type'				: 'swf',
		'hideOnContentClick': true,
		'width'         	: 615,
		'height'        	: 370,
		'scrolling'			: 'no',
		'hideOnContentClick': false,
		'autoDimensions'	: false,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'overlayColor'		: '#000',
		'padding'			: 0,
		'overlayOpacity'	: 0.7,
		'onComplete'		: function() { }
	});
	/* Apply fancybox to multiple items */

	// END: FancyBox
	
	/* TOP HAT NECESSITIES BEGIN */
	
	var searchValue;
	
	
	
	$('#search input').focus(
		function(){
		searchValue = $(this).attr('value');
		$(this).attr('value','');			
	}).blur(
		function(){					
		if($(this).val() == "")	
			$(this).attr('value',''+searchValue+'');
	});
	
	//Search string replace for LAW
	//val() == "3" will need to be altered to reflect the correct LAW choice once the search options are real
	$('div#search form').submit(function(){
		if($(this).find('select').val() == "3")
			$(this).attr('action','http://www.law.gwu.edu/Search/Default.aspx?k='+$(this).find('#searchInput').val());
	});
	
	$('#myselectbox').selectbox({debug: true});
	
	//close button in mainMenu
	$('#mainMenu ul.parent li ul.child li.close a').live('click',
		function() {
		$('div#header').animate({
			height: '47px'
		}, "fast", function() {
			$('ul.child:visible').hide()
		});	
		$('#mainMenu ul.parent li a').removeClass('current');		
	});
	
	
	$('#heroImage ul#heroRollover li a').hover(								
		function() {					
			var hoverID = $(this).attr('rel').replace(/\D/g,'');
			$('#heroImage #heroSlideSet img').removeClass('activeHeroImage');
			$('#heroImage #heroSlideSet img.heroSlideSet'+hoverID+'').addClass('activeHeroImage');
			$('#heroImage p').removeClass('activeCaption').hide();
			$('#heroImage p.'+hoverID+'').addClass('activeCaption').show();						
			$(this).parent().parent().children().removeClass('activeRollover');
			$(this).parent().addClass('activeRollover');									
	});	
	
	
	if($('#hero').hasClass('autoPlay'))
		startSlideShow();
		
	$('a.secondaryMenuOne').live('click',								
		function() {						
			if($('ul.child:last').is(':visible')) {
				$('ul.child:last').fadeOut()
				$('ul.child:first').fadeIn('slow')						
				$(this).parent().next().children().removeClass('current');
				$(this).addClass('current');
				exit();						
			}
			if($('div#header').height() < 100) {
				$('ul.child:first').show()
				$('div#header').animate({
					height: '205px'
				}, "fast");		
				$(this).addClass('current');
			} else {
				$('div#header').animate({
					height: '47px'
				}, "fast", function() {
					$('ul.child:first').hide()
				});	
				$(this).removeClass('current');						
			}	
						
	});
	$('a.secondaryMenuTwo').live('click',								
		function() {	
			if($('ul.child:first').is(':visible')) {
				$('ul.child:first').fadeOut()
				$('ul.child:last').fadeIn('slow')						
				$(this).parent().prev().children().removeClass('current');
				$(this).addClass('current');
				exit();							
			}					
			if($('div#header').height() < 100) {
				$('ul.child:last').show()
				$('div#header').animate({
					height: '205px'
				}, "fast");		
				$(this).addClass('current');
			} else {
				$('div#header').animate({
					height: '47px'
				}, "fast", function() {
					$('ul.child:last').hide()
				});	
				$(this).removeClass('current');						
			}	
						
	});
	
	/* TOP HAT NECESSITIES END */
	
	
	$('#heroImage #heroPlayer li a').live('click',								
		function() {	
			if($(this).attr('id') == 'prevHeroPlayer' || $(this).attr('id') == 'nextHeroPlayer' 
			   || $(this).attr('id') == 'playHeroPlayer') {
			   
				var $active = $('#heroImage #heroSlideSet img.activeHeroImage');
				var $activeCaption = $('#heroImage #heroCaption p.activeCaption');
				
			    if ( $active.length == 0 ) $active = $('#heroImage #heroSlideSet img:last');
				if ( $activeCaption.length == 0 ) $activeCaption = $('#heroImage #heroCaption p:first');
				
			    var $next =  $active.next().length ? $active.next()
			        : $('#heroImage #heroSlideSet img:first');
			    var $nextCaption =  $activeCaption.next().length ? $activeCaption.next()
			        : $('#heroImage #heroCaption p:first');
			    var $prev =  $active.prev().length ? $active.prev()
			        : $('#heroImage #heroSlideSet img:last');
				var $prevCaption =  $activeCaption.prev().length ? $activeCaption.prev()
			        : $('#heroImage #heroCaption p:first');
			        
			    $active.addClass('lastActiveHeroImage');
				$('#heroImage #heroCaption p').hide();
				
				if($(this).attr('id') == 'nextHeroPlayer' || $(this).attr('id') == 'playHeroPlayer') {
				    $next.addClass('activeHeroImage')
				        .show(function() {
				            $active.removeClass('activeHeroImage lastActiveHeroImage');
				        });		
				    $nextCaption.hide()
				        .addClass('activeCaption')
				        .fadeIn(function() {
				            $activeCaption.removeClass('activeCaption');
				        });	
				}
				else {
					$prev.addClass('activeHeroImage')
				        .show(function() {
				            $active.removeClass('activeHeroImage lastActiveHeroImage');
				        });	
				    $prevCaption.hide()
				        .addClass('activeCaption')
				        .fadeIn(function() {
				            $activeCaption.removeClass('activeCaption');
				        });	
				}				
					
			}	
			if($(this).attr('id') == 'playHeroPlayer' || $(this).attr('id') == 'pauseHeroPlayer') {
				if($(this).attr('id') == 'playHeroPlayer') {								
					startSlideShow();
				}
				if($(this).attr('id') == 'pauseHeroPlayer') {
					pauseSlideShow();
				}
			}							
	});
	
	/*$('#moduleSN1 ul li a').live('click',
		function() {
			if($(this).parent().parent().parent().attr('id') == 'moduleSN1') {
				$('#moduleSN1 ul li a').removeClass('current');
			}
			$(this).addClass('current');
			$(this).parent().siblings().children().siblings('ul').hide('slow');
			$(this).next().toggle('slow');
			
	});
	
	$('#moduleSN2 ul li a').live('click',
		function() {
			if($(this).parent().parent().parent().attr('id') == 'moduleSN2') {
				$('#moduleSN2 ul li a').removeClass('current');
			}
			$(this).addClass('current');
			$(this).parent().siblings().children().siblings('ul').hide('slow');
			$(this).next().toggle('slow');
			
	});
	*/
	
	
	//CM32
	$('#moduleCM32 div.dateNav ul li a').live('click',
		function() {
		$(this).parent().siblings().removeClass('current');
		$(this).parent().addClass('current');
		$('#moduleCM32 div.results').fadeOut();
		$('#moduleCM32 div.year'+$(this).text()+'').fadeIn();		
	});
	
	
	
	$('.spotlightCarousel a').live('click',
		function() {					
		var currentSpotlight = $(this).attr('rel');
		var lastSpotlight = $(this).parent().parent().children(':last').prev().children('a').attr('rel');
		$(this).parent().parent().parent().siblings('div:not(.line):not(.small)').hide();
		$(this).parent().parent().children().removeClass('current');
		$(this).parent().parent().find('a[rel='+$(this).attr('rel')+']').parent().addClass('current');
		$(this).parent().parent().parent().siblings('.modulePage'+$(this).attr('rel')+'').show();	
		// change the next/prev				
		var prev = 1;
		var next = 1;
		if(currentSpotlight == lastSpotlight)
			next = -lastSpotlight+1;
		if(currentSpotlight == '1')
			prev = -lastSpotlight+1;
		$(this).parent().parent().children('.prev').children('a').attr('rel',parseInt(currentSpotlight)-prev);					
		$(this).parent().parent().children('.next').children('a').attr('rel',parseInt(currentSpotlight)+next);				
	});
	
	//LIGHTBOX
	$('#moduleCM3 div.videoThumb, #moduleCM3-2 div.videoCarousel').live('click',								
		function() {	
		if($(this).hasClass('current')){
		//Lightbox Popup
		// media links
		    //$('a.media').click(function(){
		    		    
			if(($(this).find('a.media')).length>0){		    
			$(this).blur();

			$('body').append(GWU.vars.popupVideoHTML);

			$('#jsVideoPlayerScreen').css('opacity', 0.7);

			var u = $(this).find('a.media').attr('href');
			var c = $(this).find('a.media').attr('class').replace('imgLink ', '').replace('media ', '');

			var x = $(this).find('a.media').offset().left;
			var y = $(this).find('a.media').offset().top;

			var wStart = $(this).find('a.media').width() - 40; /* 40px padding */
			var hStart = $(this).find('a.media').height() - 40; /* 40px padding */

			if($(this).find('img').size() === 1) {
			    wStart = $(this).find('img').width() - 40;
			    hStart = $(this).find('img').height() - 40;
			    x = $(this).find('img').offset().left;
			    y = $(this).find('img').offset().top;
			}

			if(wStart < 1) { wStart = 1; }
			if(hStart < 1) { hStart = 1; }

			var w = parseInt(((c.match(/w:(\d+)/)||[])[1]||0), 10);
			var h = parseInt(((c.match(/h:(\d+)/)||[])[1]||0), 10);

			var l = parseInt($(window).width()/2, 10) - parseInt((w/2), 10);
			var t = parseInt($(window).scrollTop() + 140, 10);

			$('#jsVideoPlayer')
			    .css('width', wStart + 'px')
			    .css('height', hStart + 'px')
			    .css('top', y + 'px')
			    .css('left', x + 'px')
			    .css('display', 'block')
			    .animate({ 
				width: w + 'px',
				height: h + 'px',
				left: l - 20 + 'px',
				top: t -20 + 'px'
			    }, 
			    250, 
			    function(){
				$(this)
				    .find('#jsVideoPlayerClose')
				    .show()
				    .end()
				    .append('<div class="getFlashPlayer"></a>')
				    .find('div.getFlashPlayer')
				    .click(function(){
					location.href = 'http://www.adobe.com/go/EN_US-H-GET-FLASH';
				    })
				    .end()
				    .removeClass('videoPlayerLoader')
				    .find('div.getFlashPlayer')
				    .jmedia(
					{ version: '9,0' },
					{ src: u,
					  width: w,
					  height: h,
					  quality: 'best' }
				    );
			    });

			$('#jsVideoPlayerScreen, #jsVideoPlayerClose').click(function(){
			    $('#jsVideoPlayer')
				.addClass('videoPlayerLoader')
				.css('height', $('#jsVideoPlayer').height())
				.html('')
				.animate({
				    width: wStart + 'px',
				    height: hStart + 'px',
				    top: y + 'px',
				    left: x + 'px',
				    opacity: 0.1
				}, 
				250, 
				function(){
				    $('#jsVideoPlayer, #jsVideoPlayerScreen').remove();
				});
			});
			return false;
		    //});
		    }
		}		
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		$('#moduleCM3 div.videoDescription:visible').hide();
		$('#moduleCM3 div#videoDescription'+$(this).attr('id').replace(/\D/g,'')+'').show();	
		
	});

	$.fn.horizontalCarousel = function () {

	    function repeat(str, num) {
	        return new Array( num + 1 ).join( str );
	    }

	    return this.each(function () {
	        var $wrapper = $('div.wrapperCM9, div.wrapperMM1', this).css('overflow', 'hidden'),
	            $slider = $wrapper.find('> ul'),
	            $items = $slider.find('> li'),
	            $single = $items.filter(':first'),

	            singleWidth = $single.outerWidth(), 
	            visible = Math.ceil($wrapper.innerWidth() / singleWidth),
	            currentPage = 1,
	            pages = Math.ceil($items.length / visible);            

	        if (($items.length % visible) != 0) {
	            $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
	            $items = $slider.find('> li');
	        }

	        $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
	        $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
	        $items = $slider.find('> li');

	        $wrapper.scrollLeft(singleWidth * visible);

	        function gotoPage(page) {
	            var dir = page < currentPage ? -1 : 1,
	                n = Math.abs(currentPage - page),
	                left = singleWidth * dir * visible * n;

	            $wrapper.filter(':not(:animated)').animate({
	                scrollLeft : '+=' + left
	            }, 500, function () {
	                if (page == 0) {
	                    $wrapper.scrollLeft(singleWidth * visible * pages);
	                    page = pages;
	                } else if (page > pages) {
	                    $wrapper.scrollLeft(singleWidth * visible);
	                    page = 1;
	                } 

	                currentPage = page;
	            });                

	            return false;
	        }

	        $wrapper.after('<a class="arrow back">&laquo;</a><a class="arrow forward">&raquo;</a><div class="clear"></div>');

	        $('a.back', this).click(function () {
	            return gotoPage(currentPage - 1);                
	        });

	        $('a.forward', this).click(function () {
	            return gotoPage(currentPage + 1);
	        });

			$('#moduleMM1 li.carouselItem').live('click',
				function() {
				$(this).siblings().removeClass('current');
				$(this).addClass('current');
				$('#moduleMM1 div.carouselDescription:visible').hide();
				$('#moduleMM1 div#carouselDescription'+$(this).attr('id').replace(/\D/g,'')+'').fadeIn();
			});
			
			$('#moduleCM9 li.carouselItem').live('click',
				function() {
				$(this).siblings().removeClass('current');
				$(this).addClass('current');
				$('#moduleCM9 div.carouselDescription:visible').hide();
				$('#moduleCM9 div#carouselDescription'+$(this).attr('id').replace(/\D/g,'')+'').fadeIn();
			});

	        $(this).bind('goto', function (event, page) {
	            gotoPage(page);
	        });
	    });  
	};


	$(document).ready(function () {
	  $('#moduleCM9, #moduleMM1').horizontalCarousel();
	});
	
	$('select#exploreList').change(
		function() {
		$('#moduleCM10 ul:visible').hide();
		$('#moduleCM10 ul[id=linkList'+$(this).attr('value')+']').show();
	});
	
		
	
	
	//ACCORDIAN CALL
	$(function(){
		$(".heroSlider").heroSlider();
	});
	
	
	
	

	
});




// HORIZONTAL ACCORDING

jQuery.fn.extend({
  heroSlider: function(params){
    var jQ = jQuery;
    var params = jQ.extend({
      speed: 300,
      headerclass: "header",
      contentclass: "content",
      contentwidth: 482
    },params);
    return this.each(function(){
      this.opened = jQ("."+params.contentclass,this).filter(".visible").prev();
      jQ("."+params.headerclass,this).click(function(){
        var p = jQ(this).parent()[0];
        if (p.opened != "undefined"){
          jQ(p.opened).next("div."+params.contentclass).animate({
            width: "0px"
          },params.speed);
        }        
        p.opened = this;
        $(this).parent().children().removeClass('current');
       	$(this).addClass('current');
        jQ(this).next("div."+params.contentclass).animate({
          width: params.contentwidth + "px"
        }, params.speed);
      });
    });
  }
});