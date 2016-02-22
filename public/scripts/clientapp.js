var values = {};
var taskData = [];

$(document).ready(function() {
  getData();
  $('#tasks').on('click', showPopup);
  $('#task').on('click', function () {
    $(this).val('');
  });

  $('#submit-button').on('click', sendTask);
  $('#submit-button').on('click', closePopup);
  $('.taskList').on('click', '.remove', deleteTask);
  $('.taskList').on('click', '.complete', completeTask);
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
  values.task_name = $('#task').val();
  console.log(values);
  postData();
}

function getData() {

    $.ajax({
    type: 'GET',
    url: '/task_data',
    success: function(data) {
      console.log(data);
      appendTasks(data);
      taskData.push(data);
      console.log(taskData);
    }
  });
}

function deleteTask () {
  var lineItem = $(this).task_name;
  console.log(lineItem);
    $(this).parent().slideUp(100);
}

function completeTask () {
  $(this).parent().find('.lineItem').toggleClass('taskComplete');
  $elComplete = $(this).parent().find('.itemContainer');
  // var x = $elComplete.data('id');
  // taskData[x].task_complete = true;
  // console.log(taskData[x].task_complete);
  // putData();
$('.completedTasks').append($(this).parent());
}


function appendTasks(data) {
  $('.taskList').empty();
  for (var i = 0; i < data.length; i++) {
    $('.taskList').append(
      '<div class="itemContainer">'+
        '<div class="standardHeight lineItem task">' + '<li>' + data[i].task_name + '</li>' + '</div>'+
        '<div class="complete standardHeight lineItem">' + '<i class="material-icons">' + 'done' + '</i>' + '</div>' +
        '<div class="remove standardHeight lineItem">' + '<i class="material-icons">' + 'clear' + '</i>' + '</div>' +
      '</div>');

      $('.itemContainer').data('id', data[i].id);

  }
  $('.taskList').append('<div class="completedTasks"></div>');
  $('.taskList').children().last().append('<header class="standardHeight completeTask marginTop"><h1>Completed Tasks</h1></header>');
}

function postData () {
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

function putData () {
  $.ajax({
      type: 'PUT',
      url: '/task_data/complete',
      data: values.task_complete,
      success: function(data) {
        console.log('form server: task complete ' + values.task_name);
         getData(data);
      }

    });
}
