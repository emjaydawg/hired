$(document).ready(function() {
				$("#menu-button").click(function(){
					$("#menu").toggle();
          var $jobs = $('#jobs');
          if ($jobs.is(':visible')) {
            $jobs.hide();
          } else {
            $jobs.show();
          }
				})
				$('.heart').hover(
					function(){
						$(this).toggleClass('glyphicon-heart-empty');
						$(this).toggleClass('glyphicon-heart');
					}
				)
			});
