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