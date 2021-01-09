console.log('js');


$(document).ready(function () {
  console.log('JQ');
 
  getTasks();

  $('#submitBtn').on('click', addTask);
  $('#displayTasks').on('click', '.deleteBtn', deleteTask);

}); // end doc ready


// GET ROUTE
function getTasks() {
  $('#taskIn').val('');
  $('#displayTasks').empty();
  console.log('in getTasks');
  // ajax call to server to get tasks
  $.ajax({
    type: 'GET',
    url: '/todo',
  }).then(function (response) {
    for (let task of response) {

      $('#displayTasks').append(`
        <tr class="table-rows" data-id="${task.id}">
        <td><button class="completeBtn">Complete</button></td>
          <td>${task.task}</td>
          <td><button class="deleteBtn">Delete</button></td>
        </tr>
      `);
    };
  });
} // end getTasks


// POST ROUTE
function addTask() {
  console.log('clicked');

  const taskToSend = {
    task: $('#taskIn').val()
  
  }
  console.log('Adding task', taskToSend);

  // Send the new task to the server as data
  $.ajax({
    method: 'POST',
    url: '/todo',
    data: taskToSend,
  })
    .then(function (response) {
      console.log(response);
      // gets tasks from database
      getTasks();
    })
    .catch(function (error) {
      console.log('error in task post', error);
      alert('Error adding task. Please try again later.');
    });
}// end addTask


// DELETE ROUTE

function deleteTask() {
 
      const id = $(this).closest('tr').data('id');
      console.log(id);

      $.ajax({
        type: 'DELETE',
        url: `/todo/${id}`,
      })
        .then(function (response) {
          getTasks();
        })
        .catch(function (error) {
          alert('error in delete');
        });
    
    }
