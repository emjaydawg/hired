$(document).ready(function() {
				$("#menu-button").click(function(){
					$("#menu").toggle();
				})
				$('.heart').hover(
					function(){
						$(this).toggleClass('glyphicon-heart-empty');
						$(this).toggleClass('glyphicon-heart');
					}
				)
			});