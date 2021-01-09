console.log('js');

$(document).ready(function () {
  console.log('JQ');
 
  
  $('#submitBtn').on('click', addTask);

}); // end doc ready


// GET ROUTE

// POST ROUTE
function addTask() {
  console.log('clicked');

  const taskToSend = {
    task: $('#taskIn').val()
  
  }
  console.log('Adding task', taskToSend);

  // Send the new koala to the server as data
  $.ajax({
    method: 'POST',
    url: '/todo',
    data: taskToSend,
  })
    .then(function (response) {
      console.log(response);
      // need get route function here
      
    })
    .catch(function (error) {
      console.log('error in task post', error);
      alert('Error adding task. Please try again later.');
    });
}// end addTask
