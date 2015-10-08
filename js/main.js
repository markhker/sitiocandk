
;( function( $, window, document, undefined )
	{
		'use strict';

		var elSelector		= '.main-nav',
			elClassHidden	= 'header--hidden',
			throttleTimeout	= 500,
			$element		= $( elSelector );

		if( !$element.length ) return true;

		var $window			= $( window ),
			wHeight			= 0,
			wScrollCurrent	= 0,
			wScrollBefore	= 0,
			wScrollDiff		= 0,
			$document		= $( document ),
			dHeight			= 0,

			throttle = function( delay, fn )
			{
				var last, deferTimer;
				return function()
				{
					var context = this, args = arguments, now = +new Date;
					if( last && now < last + delay )
					{
						clearTimeout( deferTimer );
						deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
					}
					else
					{
						last = now;
						fn.apply( context, args );
					}
				};
			};

    $window.on( 'scroll', throttle( throttleTimeout, function()
    {
        dHeight			= $document.height();
        wHeight			= $window.height();
        wScrollCurrent	= $window.scrollTop();
        wScrollDiff		= wScrollBefore - wScrollCurrent;

        if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
            $element.removeClass( elClassHidden );

        else if( wScrollDiff > 0 && $element.hasClass( elClassHidden ) ) // scrolled up; element slides in
            $element.removeClass( elClassHidden );

        else if( wScrollDiff < 0 ) // scrolled down
        {
            if( wScrollCurrent + wHeight >= dHeight && $element.hasClass( elClassHidden ) ) // scrolled to the very bottom; element slides in
                $element.removeClass( elClassHidden );

            else // scrolled down; element slides out
                $element.addClass( elClassHidden );
        }

        wScrollBefore = wScrollCurrent;
    }));
    
    //Change title
    var message = "Come back to fly again!";
    var original;

    $(window).focus(function() {
    if (original) {
        document.title = original;
    }
    }).blur(function() {
        var title = $('title').text();
        if (title != message) {
            original = title;
        }
        document.title = message;
    });
    
    //Main nav to white
    
    var offset_menu = $('#canvas').outerHeight();
    
    $(window).scroll(function() {
        ($(document).scrollTop() > offset_menu ? $('#up-nav').addClass('white-nav') : $('#up-nav').removeClass('white-nav'));
        ($(document).scrollTop() > offset_menu ? $('.main-nav').addClass('white-nav') : $('.main-nav').removeClass('white-nav'));
    });
    
    //Scroll To Top
    // browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 400,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
    
    //smooth scroll from header
	$('.arrow').on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: offset_menu ,
		 	}, scroll_top_duration
		);
	});

})( jQuery, window, document );




$(function() {
    $('.button-collapse').sideNav();
    
    //ScrollFire
    var xpoffset = 0;
    
    var options = [
        {selector: '#home-card', offset: xpoffset, callback: 'Materialize.fadeInImage("#home-card")'}
    ];
    Materialize.scrollFire(options);
    
    
});


























