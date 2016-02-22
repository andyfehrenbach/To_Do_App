var values = {};
var taskData = [];


$(document).ready(function() {
  getData();
  $('#tasks').on('click', showPopup);


  $('#submit-button').on('click', sendTask);
  $('#submit-button').on('click', closePopup);
  $('.taskList').on('click', '.remove', deleteTask);
  $('.taskList').on('click', '.complete', completeTask);
 });

 function showPopup () {
   $('.popup').fadeIn(300);
   //center form:
   $('.taskInput').center();
     $('#task').on('click', function () {
       $(this).val('');
     });
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
  var $el = $(this).parent();
  var thisId = $(this).parent().attr('id');
  console.log(thisId);
  var newObj = {task_id: thisId};
  console.log(newObj);
  deleteData(newObj, $el);

}

      function deleteData(newObj, $el) {
        $.ajax({
          type: 'DELETE',
          url:'/task_data/delete',
          data: newObj,
          success: function (data) {
            console.log('it worked');
              $el.slideUp(100);
          }
        });
      }




function completeTask () {
  $(this).parent().find('.lineItem').addClass('taskComplete');
  $elComplete = $(this).parent().find('.itemContainer');

  var thisId = $(this).parent().attr('id');
  console.log(thisId);
  var newObj = {task_id: thisId};
  //  var thisID = $(this).parent.data('id');
  //  console.log(thisId);

  // console.log(taskData[x].task_complete);
  putData(newObj);
  $('.completedTasks').append($(this).parent());
}


function appendTasks(data) {
  $('.taskList').empty();

  for (var i = 0; i < data.length; i++) {
    if (data[i].task_complete == false) {
    $('.taskList').append(
      '<div class="itemContainer" id="' + data[i].id + '">' +
        '<div class="halfHeight lineItem task">' + '<li>' + data[i].task_name + '</li>' + '</div>'+
        '<div class="complete halfHeight lineItem">' + '<i class="material-icons">' + 'done' + '</i>' + '</div>' +
        '<div class="remove halfHeight lineItem">' + '<i class="material-icons">' + 'clear' + '</i>' + '</div>' +
      '</div>');

    $('.itemContainer').data('id', data[i].id);
}
  }
  $('.taskList').append('<div class="completedTasks"></div>');
  $('.taskList').children().last().append('<header class="standardHeight completeTask marginTop"><h1>Completed Tasks</h1></header>');

  for (var i = 0; i < data.length; i++) {
    if (data[i].task_complete == true){
      $('.taskList').children().last().append(
        '<div class="itemContainer" id="' + data[i].id + '">' +
          '<div class="halfHeight lineItem task taskComplete">' + '<li>' + data[i].task_name + '</li>' + '</div>'+
          '<div class="complete halfHeight lineItem taskComplete">' + '<i class="material-icons green">' + 'done' + '</i>' + '</div>' +
          '<div class="remove halfHeight lineItem taskComplete">' + '<i class="material-icons">' + 'clear' + '</i>' + '</div>' +
        '</div>');

      $('.itemContainer').data('id', data[i].id);

    }

}
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

function putData (newObj) {
  $.ajax({
      type: 'PUT',
      url: '/task_data/complete',
      data: newObj,
      success: function(data) {


        //  getData(data);
      }

    });
}
