/* Add This configuration */
var addthis_pub = 'gwunifiedweb';
var addthis_brand = '';
var addthis_header_color = '#ffffff';
var addthis_header_background = '#296186';
var addthis_offset_top = 0;
var addthis_offset_left = 0;
var addthis_hover_delay = 50;
var addthis_options = 'delicious, digg, email, facebook, friendfeed, furl, google, linkedin, myspace, reddit, slashdot, stumbleupon, technorati, twitter, more';

/* Audio player configuration */
AudioPlayer.setup('/GWU/@res/swf/audioPlayer.swf', {
    width: 460, 
    transparentpagebg: 'yes',  
    bg: '2971A7',             // Background
    leftbg: '03314B',         // Speaker icon/Volume control background
    lefticon: 'FFFFFF',       // Speaker icon
    voltrack: 'FFFFFF',       // Volume track
    volslider: '999999',      // Volume slider
    rightbg: '2971A7',        // Play/Pause button background
    rightbghover: '03314B',   // Play/Pause button background (hover state)
    righticon: 'FFFFFF',      // Play/Pause icon
    righticonhover: 'FFFFFF', // Play/Pause icon (hover state)
    loader: 'FFFFCC',         // Loading bar
    track: 'FFFFFF',          // Loading/Progress bar track backgrounds
    tracker: 'A2D6FF',        // Progress track
    border: '2971A7',         // Progress bar border
    skip: '666666',           // Previous/Next skip buttons
    text: '03314B'            // Text
});

var GWU = {};

GWU.vars = {
    /* Delay and Speed vars are in seconds. */
    homepageAjaxDelay: 0.75, 
    homepageSlideshowSpeed: 8, 
    admissionsTickerSpeed: 8, 
    marketingFeaturesSlideSpeed: 8, 
    largeMarketingFeaturesSlideSpeed: 8, 
    sidebarRotatorSpeed: 8, 
    
    azNavOffset: 0,
    
    globalNavDelay: 0.5, 
    globalNavTimer: '', /* a setTimeout var for the global navigation mouseout delay. */
    
    mainNavDelayOver: 0.25,
    mainNavDelayOut: 0.50,
    mainNavTimerOver: '', /* a setTimeout var to start the mouseOver event of the main nav. */
    mainNavTimerOut: '', /* a setTimeout var to start the mouseOut event of the main nav. */
    
    stylesheetCookieName: 'gwuFontSize', /* name of the cookie used to store what font size should be displayed. */
    stylesheetCookieValue: '',
    
    homepageSlideshowUrl: [], /* URL collection for the homepage Ajax calls. */
    
    programFinderMatchedUrl: '/GWU/@res/ajax/results.html',
    
    marketingFeaturesNavHTML: '<div id="jsMarketingFeaturesNav"><p class="module">Features</p><div id="jsMarketingFeaturesNavList"></div><a href="#" id="jsMarketingFeaturesNavPrev"></a><a href="#" id="jsMarketingFeaturesNavNext"></a></div>',
    largeMarketingFeaturesNavHTML: '<div id="jsLargeMarketingFeaturesNav"><div id="jsLargeMarketingFeaturesNavList"></div><a href="#" id="jsLargeMarketingFeaturesNavPrev"></a><a href="#" id="jsLargeMarketingFeaturesNavNext"></a></div>',
    homeFeaturesNavHTML: '<div class="jsHomeFeaturesNav"><p class="module">Features</p><div class="jsHomeFeaturesNavList"></div><a href="#" class="jsHomeFeaturesNavPrev"></a><a href="#" class="jsHomeFeaturesNavNext"></a></div>',
    toolsHTML: '<div id="jsTools"><div id="jsToolsFunctions"><table align="right"><tr><td id="jsPrint"><a>Print<span class="jsIcon"></span></a></td><td id="jsAdd"><a href="http://www.addthis.com/bookmark.php" onmouseover="return addthis_open(this, \'\', \'[URL]\', \'[TITLE]\');" onmouseout="addthis_close();" onclick="return addthis_sendto();">Add This<span class="jsIcon"></span></a></td><td id="jsText"><span>Text Size</span></td><td id="jsTextSmall"><a class="on">Small<span></span></a></td><td id="jsTextLarge"><a>Large<span></span></a></td></tr></table></div></div>',
    containerHTML: '<div id="jsContainerWrapper2"><div id="jsContainerWrapper1"></div></div>',
    sidebarRotatorNavHTML: '<div id="jsSidebarRotatorNav"><div id="jsSidebarRotatorNavList"></div><a href="#" id="jsSidebarRotatorNavPrev"></a><a href="#" id="jsSidebarRotatorNavNext"></a></div>',
    popupVideoHTML: '<div id="jsVideoPlayer" class="jsVideoPlayerLoader"><div id="jsVideoPlayerClose"></div></div><div id="jsVideoPlayerScreen"></div>',
    landingSectionHTML: '<div class="jsLandingSectionX"></div>',
    iconHTML: '<span class="jsIcon"></span>'
};

GWU.functions = {
    /* activates the slideshows on the homepage */
    initalizeHomepageSlideshow: function(obj){
        /* no longer needs to look like it is loading, this DIV has an animated GIF background. */
        $('#' + obj).find('div.jsHomeFeaturesLoader').css('background-image', 'none'); 
        $('#' + obj).prepend(GWU.vars.homeFeaturesNavHTML);
        $('#' + obj + ' ul')
            .cycle({ 
                pause:    true,
                fx:     'scrollVert', 
                speed:  'fast', 
                timeout: GWU.vars.homepageSlideshowSpeed * 1000, 
                pager:  '#' + obj + ' div.jsHomeFeaturesNavList',
                next:   '#' + obj + ' a.jsHomeFeaturesNavNext', 
                prev:   '#' + obj + ' a.jsHomeFeaturesNavPrev'
            });
    },
    /* allows the enable/disable of additional stylesheets, used to enable larger fonts.
       yes, even though all browsers do this by default. */
    stylesheetSwitcher: function(id){
        if(id !== null) {
            var stylesheetName = id.replace('jsText', '');
            $('link[rel*=style][title]').each(function(i) {
                this.disabled = true;
                if (this.getAttribute('title') == stylesheetName) {
                    this.disabled = false;
                }
            });
            $.cookie(GWU.vars.stylesheetCookieName, stylesheetName, { expires: 7, path: '/' });
            
            $('#jsToolsFunctions a.on').removeClass('on');
            $('#jsText' + stylesheetName + ' a').addClass('on');
        }
    },
    /* applied to DIV#navMain>UL>LI */
    mainNavMouseOver: function(obj, i){ 
        /* is this the homepage?
           homepage is different because of the slideshows. */
        if ($('body').is('.templateHome') === true) {
            // disable the active nav item, and hide the visible slideshow
            $('#navMain li.active').removeClass('active');
            $('div.jsHomeFeatures').hide();
            // mark this one as the new active
            $(obj).addClass('active');
            // if this slideshow hasn't been loaded yet, load it and show; otherwise just show the slideshow
            if($('#jsHomeFeatures' + i).size() === 0) {
                // add the slideshow wrapper with unique ID
                $('#homeFeatures').append('<div id="jsHomeFeatures' + i + '" class="jsHomeFeatures"><div class="jsHomeFeaturesLoader"></div></div>');
                // after a delay load the content of the slideshow via Ajax and initalize it
                $(obj).delay(GWU.vars.homepageAjaxDelay * 1000, function(){
                    $('#jsHomeFeatures' + i + ' div.jsHomeFeaturesLoader').load(GWU.vars.homepageSlideshowUrl[i] + ' ul', function(){
                        GWU.functions.initalizeHomepageSlideshow('jsHomeFeatures' + i);
                    });
                });
            }
            else {
                $('#jsHomeFeatures' + i).show();
            }
        }
        else {
            $('#navMain li.hover').removeClass('hover'); // doubles up with the mouseOut, this is more for the Blur event;
            $('#navMain li.active li.active').removeClass('active').addClass('activeXXX');
            
            if ($(obj).is('.active') === true || $(obj).is('.activeOff') === true) {
                $('#navMain li.activeOff').removeClass('activeOff').addClass('active');
                $('body').removeClass('hover');
            }
            else {
                $('#navMain li.active').removeClass('active').addClass('activeOff');
                $(obj).addClass('hover');
                $('body').addClass('hover');
            }
        }
    },
    mainNavMouseOut: function(){ // applied to #navMain LI
        if ($('body').is('.templateHome') === false) {
            $('#navMain li.activeOff').removeClass('activeOff').addClass('active');
            $('#navMain li.activeXXX').removeClass('activeXXX').addClass('active');
            $('#navMain li.hover').removeClass('hover');
            $('body').removeClass('hover');
        }
    },
    mainNavFocus: function(obj, i){ // applied to #navMain A
        // grab the parent LI, this is what we'll be manipulating
        var tmp = $(obj).parents('li').eq(0);
        // since it's the same effect as a mouseOut, reuse that code
        GWU.functions.mainNavMouseOver(tmp, i);
    },
    globalNavMouseOver: function(obj){
        clearTimeout(GWU.vars.globalNavTimer);
    
        // disable any active LI
        GWU.functions.globalNavClear();
        // activate the current LI
        $(obj).addClass('hover');
        // if the current LI is the first one, resize the UL underneath it
        if($(obj).attr('id') == 'navGlobalLi0') {
            var x = $('#container').offset().left;
            var y = $(obj).offset().left;
            var z = (960-(y-x)); // 960 is the page width
            $('ul', obj).css('width', z + 'px');
        }
    },
    globalNavMouseOut: function(){
        GWU.vars.globalNavTimer = setTimeout(
            function() {
                GWU.functions.globalNavClear();
            }, 
            GWU.vars.globalNavDelay * 1000
        );
    },
    globalNavClear: function(){
        // disable any active LI
        $('#navGlobal li.hover').removeClass('hover');
    },
    sidebarResize: function(){
        var objContainer = $('div.sidebars');
        var objActive = $('div.sidebars div.sidebar:visible');
        
        var heightContainer = objContainer.height();
        var heightSlide = objActive.height();
        
        if(heightContainer < heightSlide) {
            //objContainer.animate( { height: heightSlide } , 10 );
            objContainer.height(heightSlide);
        }
    }
    
};



/* jQuery DOMdocument.ready */
$(document).ready(function($){
    /* Add HTML */
        $('#container').wrap(GWU.vars.containerHTML);
        
        if ($('body.templateHome').size() === 0) {
            $('#nav').after(GWU.vars.toolsHTML);
        }
        
        $('#navGlobal>ul>li>a, #jsPrint a, div.alert h1, span.advisory, #largeMarketingFeatures h1 a, #storyNavPrev a, a.all').prepend(GWU.vars.iconHTML);
        $('a.more, #storyNavNext a, div.searchFeatures, a.rss').append(GWU.vars.iconHTML);
        
    /* Interactions */
        // everything
            $('*').focus(function(){
                // check to see if the current focus is in #navGlobal, if it isn't remove the hover effects
                if($(this).parents('#navGlobal').size() === 0) {
                    GWU.functions.globalNavMouseOut();
                }
                // check to see if the current focus is in #navMain, if it isn't remove the hover effects
                if($(this).parents('#navMain').size() === 0) {
                    GWU.functions.mainNavMouseOut();
                }
            });
        // Global Navigation
            $('#navGlobal>ul>li').each(function(i){
                $(this)
                    .attr('id', 'navGlobalLi' + i) // needs a unique ID so we know when we're working with the first one
                    .hover(
                        function(){
                            GWU.functions.globalNavMouseOver(this);
                        },
                        function(){
                            GWU.functions.globalNavMouseOut();
                        }
                    );
            });
            // focus should act like a hover
            $('#navGlobal>ul>li>a').focus(
                function(){
                    var tmp = $(this).parents('li').eq(0);
                    GWU.functions.globalNavMouseOver(tmp);
                }
            );
        
        
        // Main Navigation
            $('#navMain>ul>li').each(function(i){
                $(this)
                    .attr('id', 'navMainLi' + i) // needs a unique ID for image replacement
                    .find('a').eq(0).attr('id', 'navMainA' + i).append('<span></span>') // needs the SPAN to put the image in
                    .end().end()
                    .hover(
                        function(){
                            var obj = $(this);
                            clearTimeout(GWU.vars.mainNavTimerOut);
                            GWU.vars.mainNavTimerOver = setTimeout(
                                function() {
                                    GWU.functions.mainNavMouseOver(obj, i);
                                },
                                GWU.vars.mainNavDelayOver * 1000
                            );
                        },
                        function(){
                            clearTimeout(GWU.vars.mainNavTimerOver);
                            GWU.vars.mainNavTimerOut = setTimeout(
                                function() {
                                    GWU.functions.mainNavMouseOut();
                                },
                                GWU.vars.mainNavDelayOut * 1000
                            );
                        }
                    );
            });
            // focus should act like a hover
            $('#navMain>ul>li>a').each(
                function(i){
                    $(this).focus(function(){
                        GWU.functions.mainNavFocus(this, i);
                    });
                }
            );
        
        
        
        // Homepage slideshows (only one will be present on the page onLoad)
            if ($('div.jsHomeFeatures').size() > 0) {
                $('div.jsHomeFeatures').attr('id', 'jsHomeFeatures0'); // all dynamically added DIVs will have an ID set too
                
                // if there is more than one slide
                if($('#jsHomeFeatures0 li').size() > 1) {
                    GWU.functions.initalizeHomepageSlideshow('jsHomeFeatures0');
                }
            }
        
        // Landing Page slideshow (if present)
            if ($('#marketingFeatures').size() > 0) {
                // if there is more than one slide
                if($('#marketingFeatures li').size() > 1) {
                    $('#marketingFeatures')
                        .prepend(GWU.vars.marketingFeaturesNavHTML) // add cycle navigation
                        .find('ul')
                        .eq(0)
                        .cycle({  // initialize the cycle plugin
                            pause:    true,
                            fx:     'scrollVert', 
                            speed:  'fast', 
                            timeout: GWU.vars.marketingFeaturesSlideSpeed * 1000, 
                            pager:  '#jsMarketingFeaturesNavList',
                            next:   '#jsMarketingFeaturesNavNext', 
                            prev:   '#jsMarketingFeaturesNavPrev'
                        });
                }
            }
        
        // Landing Page slideshow (if present)
            if ($('#largeMarketingFeatures').size() > 0) {
                // if there is more than one slide
                if($('#largeMarketingFeatures li').size() > 1) {
                    $('#largeMarketingFeatures')
                        .prepend(GWU.vars.largeMarketingFeaturesNavHTML) // add cycle navigation
                        .find('ul')
                        .eq(0)
                        .cycle({  // initialize the cycle plugin
                            pause:    true,
                            fx:     'scrollVert', 
                            speed:  'fast', 
                            timeout: GWU.vars.largeMarketingFeaturesSlideSpeed * 1000, 
                            pager:  '#jsLargeMarketingFeaturesNavList',
                            next:   '#jsLargeMarketingFeaturesNavNext', 
                            prev:   '#jsLargeMarketingFeaturesNavPrev'
                        });
                }
            }
        
        // Admissions Ticker (if present)
            if ($('#admissionsTicker').size() > 0) {
                $('#admissionsTicker').find('h1').append('<span></span>'); // this gets styled even if there is only one slide
                // if there is more than one slide
                if($('#admissionsTicker li').size() > 1) {
                    $('#admissionsTicker')
                        .find('ul').cycle({ // initialize the cycle plugin
                            fx: 'scrollVert',
                            speed: 'fast',
                            timeout: GWU.vars.admissionsTickerSpeed * 1000
                        })
                        .end()
                        .find('li').hover(
                            function() {
                                $('#admissionsTicker ul').cycle('pause');
                            }, 
                            function() {
                                $('#admissionsTicker ul').cycle('resume'); 
                            }
                        );
                }
            }
        
        // RAIL: The GW Experience
            $('div.experienceHighlight h2').each(function(i){
                if($(this).is('.active') === false) {
                    $(this).next().hide();
                }
                $(this)
                    .html('<a>' + $(this).html() + GWU.vars.iconHTML + '</a>') // make it selectable by tabbing
                    .find('a').click(function(){
                        // if the one clicked is already open, do nothing
                        if($(this).parents('h2').is('.active') === false) {
                            $(this).parents('div.experienceHighlight')
                                .find('h2.active').removeClass('active')
                                .end()
                                .find('div:visible').slideUp();
                            $(this).parent()
                                .addClass('active')
                                .next().slideDown();
                        }
                        return false;
                    });
            });
        
        // RAIL: Sidebar Rotator (if present)
            if ($('div.sidebars').size() > 0) {
                // if there is more than one slide
                if($('div.sidebars>div').size() > 1) {
                    $('div.sidebars>div').each(function(i){
                        if(i === $('div.sidebars>div').size()-1) {
                        //    GWU.functions.sidebarResize();
                            $('#sidebarRotator')
                                .append(GWU.vars.sidebarRotatorNavHTML) // add cycle navigation
                                .find('div.sidebars')
                                .eq(0)
                                .cycle({  // initialize the cycle plugin
                                    pause:    true,
                                    fx:     'scrollVert', 
                                    speed:  'fast', 
                                    timeout: GWU.vars.sidebarRotatorSpeed * 1000, 
                                    pager:  '#jsSidebarRotatorNavList',
                                    next:   '#jsSidebarRotatorNavNext', 
                                    prev:   '#jsSidebarRotatorNavPrev',
                                    after:    function(){
                                                GWU.functions.sidebarResize();
                                            }
                                })
                                .end()
                                .end()
                                .find('#jsSidebarRotatorNavList a')
                                .append('<span></span>');
                        }
                    });
                }
            }
        
        // TOOLBAR
            if($('#jsTools').size() > 0) {
                // TOOLBAR: Font Size
                $('#jsTextSmall a, #jsTextLarge a')
                    .focus(function(){
                        if ($(this).is('.on') === false) {
                            $('#jsText span').addClass('focus');
                        }
                    })
                    .blur(function(){
                        $('#jsText span').removeClass('focus');
                    })
                    .hover(
                        function(){
                            if ($(this).is('.on') === false) {
                                $('#jsText span').addClass('focus');
                            }
                        }, 
                        function() {
                            $('#jsText span').removeClass('focus');
                            $('#jsTextSmall a, #jsTextLarge a').blur();
                        }
                    )
                    .click(function(){
                        if($(this).is('.on') === false) {
                            GWU.functions.stylesheetSwitcher($(this).parent().attr('id'));
                        }
                        return false;
                    });
                
                // TOOLBAR: Print
                $('#jsPrint').click(function(){
                    window.print();
                    return false;
                });
                
                // TOOLBAR: Share This Page
                $('#jsShare').click(function(){
                    alert('Feature not implemented');
                    return false;
                });
            }
        
        // Audio Player
            $('a.audioPlayer').each(function(i){
                $(this).attr('id', 'jsAudioPlayer' + i);
                var URL = $(this).attr('href');
                AudioPlayer.embed('jsAudioPlayer' + i, {
                    soundFile: URL
                });
            });
        
        // Captcha
            if($('#reCaptcha').size() === 1) {
                $('#reCaptchaNJS').remove();
                $('#reCaptchaWJS').show();
                Recaptcha.create('6LeDGQgAAAAAAKSVR7y0yH8P8n7WlqWD_FwDtBEI', 'reCaptchaJSreplace', {
                    theme: 'clean',
                    callback: Recaptcha.focus_response_field
                });
            }
        
        // Program Finder list
            if($.browser.msie === true && parseInt($.browser.version, 10) < 7) {}
            else {
                $('div.programFinderItem').each(function(i){
                    $(this)
                        .append('<a href="" class="jsQuickViewOpen"></a><a href="" class="jsQuickViewClose"></a>')
                        .find('a.jsQuickViewOpen')
                            .click(function(){
                                $(this)
                                    .parent()
                                    .find('div.more')
                                    .slideDown(function(){
                                        $(this)
                                            .parent()
                                            .find('a.jsQuickViewClose')
                                            .show();
                                    })
                                    .end()
                                    .end()
                                    .hide();
                                return false;
                            })
                        .end()
                        .find('a.jsQuickViewClose')
                            .click(function(){
                                $(this)
                                    .parent()
                                    .find('div.more')
                                    .slideUp(function(){
                                        $(this)
                                            .parent()
                                            .find('a.jsQuickViewOpen')
                                            .show();
                                    })
                                    .end()
                                    .end()
                                    .hide();
                                return false;
                            })
                        .end()
                        .find('div.more')
                        .hide()
                        .end()
                        .find('div.moreOpen')
                        .parent()
                        .find('a.jsQuickViewOpen')
                        .click();
                });
            }
        
        // Program Finder - Grad Program Detail
            if($.browser.msie === true && parseInt($.browser.version, 10) < 7) {}
            else {
                $('div.programFinderGradDetail').each(function(i){
                    $(this)
                        .append('<a href="" class="jsViewMoreOpen"></a><a href="" class="jsViewMoreClose"></a>')
                        .find('a.jsViewMoreOpen')
                            .click(function(){
                                $(this)
                                    .parent()
                                    .find('div.more')
                                    .slideDown(function(){
                                        $(this)
                                            .parent()
                                            .find('a.jsViewMoreClose')
                                            .show();
                                    })
                                    .end()
                                    .end()
                                    .hide();
                                return false;
                            })
                        .end()
                        .find('a.jsViewMoreClose')
                            .click(function(){
                                $(this)
                                    .parent()
                                    .find('div.more')
                                    .slideUp(function(){
                                        $(this)
                                            .parent()
                                            .find('a.jsViewMoreOpen')
                                            .show();
                                    })
                                    .end()
                                    .end()
                                    .hide();
                                return false;
                            })
                        .end()
                        .find('div.more')
                        .hide()
                        .end()
                        .find('div.moreOpen')
                        .parent()
                        .find('a.jsViewMoreOpen')
                        .click();
                });
            }
        
        // Program Finder Tabs
            $('ul.tabs a').each(function(){
                var i = $(this).attr('href');
                if($(this).parent().is('.active') === false) {
                    $(i).hide();
                }
                
                $(this).click(function(){
                    var j = $(this).parents('ul').find('li.active a').attr('href');
                    $(j).hide();
                    
                    var k = $(this).attr('href');
                    $(k).show();
                  
                    $(this).parents('ul').find('li.active').removeClass('active');
                    $(this).parent().addClass('active');
                    
                    $(this).blur();
                    
                    return false;
                });
            });

    // Graduate Program Finder form 
        $('form.programFinderWizard')
            .find('input[type=checkbox]').click(function(){
                var s = '0';
                $('input[name=s]:checked').each(function(){
                    s = s + ',' + $(this).attr('value');
                });
                var a = '0';
                $('input[name=a]:checked').each(function(){
                    a = a + ',' + $(this).attr('value');
                });
                
                $.getJSON(
                        GWU.vars.programFinderMatchedUrl,
                        { 
                            a: a, 
                            s: s
                        },
                        function(data){
                            $('div.programFinderMatched span').html(data.results);
                        }
                    );
            })
            .end()
            .find('button[type=reset]').click(function(){
                $.getJSON(
                        GWU.vars.programFinderMatchedUrl,
                        { 
                            a: '0', 
                            s: '0'
                        },
                        function(data){
                            $('div.programFinderMatched span').html(data.results);
                        }
                    );
            });
        
        // Graduate Program Finder locations box
            $('div.programFinderBox div.more')
                .hide()
                .after('<p class="more"><a href="">More Locations</a></p>');
                
            $('div.programFinderBox p.more a').click(function(){
                $(this).parents('div.programFinderBox').find('div.more').slideDown();
                $(this).parent().hide();
                return false;
            });
        
        // Program Finder Alphabet list, scrolls with the user as they move down the page
            if($('div.programFinderAZ').size() > 0) {
                $('div.programFinderAZ').parent().append('&nbsp;'); // add spacer so DIV doesn't collapse 
                
                GWU.vars.azNavOffset = $('div.programFinderAZ').offset().top-20;
            
                // if we scroll past it's original offset, set it to position: fixed.
                $(window).bind('scroll', function(){
                    var obj = $('div.programFinderAZ');
                    
                    if(GWU.vars.azNavOffset < $(window).scrollTop()) {
                        if($(obj).css('position') == 'static') {
                            $(obj)
                               .css('position', 'fixed')
                               .css('top', '20px');
                        }
                    }
                    if(GWU.vars.azNavOffset > $(window).scrollTop()) {
                        if($(obj).css('position') == 'fixed') {
                            $(obj)
                               .css('position', 'static');
                        }
                    }
                });
            }
    
    
    
    /* Visual Clean-Up */
        // style external links
            $('#content a')
                .filter(function(){
                    return this.hostname &&                             // check to see if it's a link
                           this.hostname.indexOf('localhost') === -1 && // check to see if it's a local link
                           this.hostname.indexOf('.local') === -1 &&    // check to see if it's a local link
                           this.hostname.indexOf('.gwu.edu') === -1 &&  // check to see if it's a ***.gwu.edu link
                           this.hostname.indexOf('mailto') === -1 &&    // check to see if it's an email link
                           $(this).find('img').size() === 0 &&          // make sure the A isn't wrapped around a IMG
                           !$(this).is('.media') &&                     // make sure it's not A.media
                           !$(this).is('.more');                        // make sure it's not A.more, we don't want 2 SPANs
                })
                .addClass('external')
                .end()
                .end()
                .find('a.external')
                .append(GWU.vars.iconHTML)
                .attr('target', '_blank');
        
        // section landing pages
            $('div.articleSet').each(function(i){
                $(this).find('div.articleSetItem:last').addClass('articleSetItemLastChild');
            });
            $('div.articleMatrix').each(function(i){
                $(this).find('div.articleMatrixSection:last').addClass('articleMatrixSectionLastChild');
            });
            $('div.articleMatrixSection').each(function(i){
                $(this).find('div.articleMatrixItem:last').addClass('articleMatrixItemLastChild');
            });
            $('div.admissionsCalendar').each(function(i){
                $(this).find('div.admissionsCalendarItem:last').addClass('admissionsCalendarItemLastChild');
            });
        
        // multimedia Gallery adjustments
            $('div.multimediaGallery div:nth-child(3n+1)').addClass('multimediaGalleryItemFirstChild');
            $('div.multimediaFeatured div:nth-child(3n+1)').addClass('multimediaFeaturedItemFirstChild');
            $('div.pgSlideshowNav ul li:nth-child(6n+1)').addClass('pgSlideshowNavFirstChild');
        
        // article extras
            if($('div.articleExtrasRelated').size() === 1 && $('div.articleExtrasDownloads').size() === 0) {
                $('div.articleExtrasRelated').addClass('articleExtrasAlone');
            }
            else if($('div.articleExtrasRelated').size() === 0 && $('div.articleExtrasDownloads').size() === 1) {
                $('div.articleExtrasDownloads').addClass('articleExtrasAlone');
            }
        
        // activate proper stylesheet
            GWU.vars.stylesheetCookieValue = $.cookie(GWU.vars.stylesheetCookieName);
            if (GWU.vars.stylesheetCookieValue !== '') {
                GWU.functions.stylesheetSwitcher(GWU.vars.stylesheetCookieValue);
            }
        
        // define that JS in enabled in the browser
            $('body').addClass('wjs');
        
        // test browsers
            if($.browser.safari === true) {
                $('body').addClass('isSafari');
            }
            if($.browser.opera === true) {
                $('body').addClass('isOpera');
            }
        
        // restyle button
            $('p.button').each(function(i){
                $(this)
                    .removeClass('button')
                    .addClass('buttonWjs')
                    .find('a')
                    .append(GWU.vars.iconHTML);
            });
        
        // :psuedo class fix
            $('ul>li:first-child, tr>td:first-child, tr>th:first-child').addClass('firstChild');
            $('ul>li:last-child,  tr>td:last-child,  tr>th:last-child').addClass('lastChild');
        
        // :psuedo class fix
            $('#navGlobal ul ul, div.gwExperience ul').each(function(i){
                $(this).find('li:even').addClass('odd'); /* starts counting at 0 */
                $(this).find('li:odd').addClass('even'); /* starts counting at 0 */
            });
        
        // landing page All button
            $('div.landingSectionAll').append(GWU.vars.landingSectionHTML);
            $('div.landingSection a.all').click(function(){
                $(this).blur();
                $('div.landingSectionAll').fadeOut();
                
                var parentObj = $(this).parents('div.landingSection');
                var parentObjHeight = $(parentObj).height();
                var hoverObj = $(parentObj).find('div.landingSectionAll');
                
                $(hoverObj)
                    .height(parentObjHeight + 'px')
                    .css('left', '-160px')
                    .css('opacity', 0)
                    .css('display', 'block')
                    .animate({
                        left: '-240px',
                        opacity: 1
                    }, 
                    250, 
                    function(){
                        $(hoverObj).find('div.jsLandingSectionX').click(function(){
                            $('div.landingSectionAll').animate({
                                left: '-320px',
                                opacity: 0
                            },
                            250,
                            function(){
                                $(this).hide();
                            });
                        });
                    });
                // if there is an ALL (sometimes there isn't) prevent the link from going anywhere
                if($(hoverObj).size() > 0) {
                    return false;
                }
            });
        
        // media links
            $('a.media').click(function(){
                $(this).blur();
                
                $('body').append(GWU.vars.popupVideoHTML);
                
                $('#jsVideoPlayerScreen').css('opacity', 0.7);
                
                var c = $(this).attr('class').replace('imgLink ', '').replace('media ', '');
                var u = $(this).attr('href');
                
                var x = $(this).offset().left;
                var y = $(this).offset().top;
                
                var wStart = $(this).width() - 40; /* 40px padding */
                var hStart = $(this).height() - 40; /* 40px padding */
                
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
            });
    
    // IE homepage h1.module needs to be bold becuase of lack of cleartype on XP (by default)
        if (navigator.appVersion.indexOf('Windows NT 5.1') > -1 && $('body.templateHome').size() > 0) {
            $('body').addClass('winXP');
        }
    
    // media slideshow
        if ($('div.pgSlideshow').size() > 0) {
            $('div.pgSlideshowSlides li:not(.active)').hide();
            $('div.pgSlideshowNav').prepend('<a class="info">Info' + GWU.vars.iconHTML + '</a>').find('a.info').click(function(){
                if($(this).is('.closed')) {
                    $(this).removeClass('closed');
                    $('div.pgSlideshowSlides li div').animate(
                        { bottom: '0' }, 250
                    );
                }
                else {
                    $(this).addClass('closed');
                    $('div.pgSlideshowSlides li div').animate(
                        { bottom: '-71px' }, 250
                    );
                }
            });
            $('body').append('<div class="activeX"></div>');
            $('div.pgSlideshowNav').find('li').click(function(){
                var pos = $(this).offset();
                
                $('div.activeX').animate(
                    { top: pos.top-3 + 'px', left: pos.left-3 + 'px' }, 500
                );
                
                $('div.pgSlideshowNav li.active').removeClass('active');
                $(this).addClass('active');
                var index = $("div.pgSlideshowNav li").index(this);
                $('div.pgSlideshowSlides li.active').removeClass('active').fadeOut('fast');
                $('div.pgSlideshowSlides li').eq(index).addClass('active').fadeIn('slow');
            });
            
            
            var x = $('div.pgSlideshowNav li.active').offset();
            $('div.activeX').css({ top: x.top-3 + 'px', left: x.left-3 + 'px' }).fadeIn();
            
            $(window).resize(function(){
                var x = $('div.pgSlideshowNav li.active').offset();
                $('div.activeX').css({ top: x.top-3 + 'px', left: x.left-3 + 'px' });
            });
        }
    
    // program finder
        $('div.programFinderIntro ul:first').addClass('firstChild');
        $('div.programFinderIntro ul:last').addClass('lastChild');
});

