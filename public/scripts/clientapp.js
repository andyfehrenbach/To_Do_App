$(document).ready(function() {
  getData();
  $('#tasks').on('click', showPopup);
  $('#task').on('click', function () {
    $(this).val('');
  });

  $('#submit-button').on('click', sendTask);
  $('#submit-button').on('click', closePopup);
 });

 function showPopup () {
   $('.popup').fadeIn(300);
   //center form:
   $('.taskInput').center();
 }

 function closePopup() {
   $('.popup').fadeOut(100);
 }

 $.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
    return this;
 };

function sendTask() {
  event.preventDefault();

  var values = {};

  values.task_name = $('#task').val();
  console.log(values);

  $.ajax({
      type: 'POST',
      url: '/task_data',
      data: values,
      success: function(data) {
        console.log('form server :' + values.task_name);
         getData(data);
      }

    });
}

function getData() {
    $.ajax({
    type: 'GET',
    url: '/task_data',
    success: function(data) {
      console.log(data);
      appendDom(data);
    }
  });
}
//re-useable appendDom function ONLY WORKS WITH CLASSES

function appendDom(data) {
  $('.taskList').empty();
  var $el = $('.taskList');
  for (var i = 0; i < data.length; i++) {
    $el.append('<div class="standardHeight lineItem task">' + '<li>' + data[i].task_name + '</li>' + '</div>').slideDown(600);
    $el.append('<div class="complete standardHeight lineItem">' + '<i class="material-icons">' + 'done' + '</i>' + '</div>').slideDown(600);
    $el.append('<div class="remove standardHeight lineItem">' + '<i class="material-icons">' + 'clear' + '</i>' + '</div>').slideDown(600);

  }
}
