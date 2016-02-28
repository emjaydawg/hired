$(function() {
  $('.apply button').on('click', function() {
    $(this).text('Applied');
    $(this).removeClass('btn-primary');
    $(this).addClass('btn-success');
  });
  
  $('.glyphicon').on('click', function() {
    if ($(this).hasClass('blue-heart')) {

      $(this).addClass('glyphicon-heart-empty');
      $(this).removeClass('glyphicon-heart');
      $(this).removeClass('blue-heart');
    } else {

      $(this).removeClass('glyphicon-heart-empty');
      $(this).addClass('glyphicon-heart');
      $(this).addClass('blue-heart');
    }
  });
});
