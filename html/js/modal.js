var modal = (function(){
	var 
	method = {},
	$overlay,
	$modal,
	$content,
	$close;

	// Center the modal in the viewport
	method.center = function () {
		var top, left;

		top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
		left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

		var st = $(window).scrollTop();
		var sl = $(window).scrollLeft();
		
		//st = 0;
		//sl = 0;
		
		//alert( $modal.outerWidth()  );
		
		$modal.css({
			top:top + st, 
			left:left + sl
		});
	};

	// Open the modal
	method.open = function (settings) {
		$content.empty().append(settings.content);
		$modal.show();

		
		$modal.css({
			width: settings.width || 'auto', 
			height: settings.height || 'auto'
		});

		method.center();
		$(window).bind('resize.modal', method.center);
		$modal.show();
		$overlay.show();
	};

	// Close the modal
	method.close = function () {
		$modal.hide();
		$overlay.hide();
		$content.empty();
		$(window).unbind('resize.modal');
	};

	// Generate the HTML and add it to the document
	$overlay = $('<div id="overlay"></div>');
	$modal = $('<div id="modal"></div>');
	$content = $('<div id="content"></div>');
	$close = $('<a id="close" href="#">close</a>');

	$modal.hide();
	$overlay.hide();
	$modal.append($content, $close);

	$(document).ready(function(){
		$('body').append($overlay, $modal);						
	});

	$close.click(function(e){
		e.preventDefault();
		method.close();
	});
	
	//Fecha se clicar fora
	$overlay.click(function(e){
		e.preventDefault();
		method.close();
	});

	//fecha se clicar dentro
	$modal.click(function(e){
		e.preventDefault();
		method.close();
	});

	

	return method;
}());

// Wait until the DOM has loaded before querying the document
$(document).ready(function(){


	$('a#howdy').click(function(e){
		modal.open({content: "Hows it going?"});
		e.preventDefault();
	});
	
});
