var myFile

$('.chooseFile').on("change", function(){
    myFile = $('.chooseFile').name()
    console.log(myFile);
})

$('.radio').on("click", function() {
    // if selected already, deselect
    if ($(this).hasClass('selected')) {
      $(this).prop('checked', false);
      $(this).removeClass('selected');
    }
    // else select
    else {
      $(this).prop('checked', true);
      $(this).addClass('selected');
    }
    // deselect sibling inputs
    $(this).siblings('input').prop('checked', false);
    $(this).siblings('input').removeClass('selected');
  })