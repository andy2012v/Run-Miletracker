$(document).one('pageinit', function(){
  //Display runs
  showRuns();

  // Add Handler
  $('#submitAdd').on('tap', addRun);

  //show all runs on homepage
  function showRuns(){
    //get runs object
    var runs = getRunsObject();

    //check if empty
    if(runs != '' && runs != null) {
      for(var i = 0; i < runs.length; i++) {
        $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]['date']+
        ' <br><strong>Distance: </strong>'+runs[i]['miles']+' miles<div class="controls">'+
        '<a href="#edit">Edit</a> | <a href="#">Delete</a></li>');
      }
      $('#home').bind('pageinit', function(){
        $('#stats').listview('refresh');
      })
    }
  }


  //Add a run
  function addRun(){
    // get form values
    var miles = $('#addMiles').val();
    var date = $('#addDate').val();

    //create 'run' object
    var run = {
      date: date,
      miles: parseFloat(miles)
    };

    var runs = getRunsObject();

    //add run to runs Array
    runs.push(run);

    alert('Runs Added');

    //set stringified object to localStorage
    localStorage.setItem('runs', JSON.stringify(runs));

    //redirect
    window.location.href="index.html";

    return false;
  }
  /*
  * Get the runs object
  */
  function getRunsObject() {
    // set runs array
    var runs = [];
    //get current runs from local storage
    var currentRuns = localStorage.getItem('runs');

    //check local storage
    if(currentRuns != null){
      //set to runs
      var runs = JSON.parse(currentRuns);
    }
    //return runs object
    return runs.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date)
    });
  }

});
