// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var saveButtonEl = $('.saveBtn');
  saveButtonEl.on('click', function (event){
    localStorage.setItem("hour" + (event.target.closest("div").id), (event.target.closest("div").id));

    var actualEventtext = ($($(this).prev()[0]).val());
    localStorage.setItem("event" + (event.target.closest("div").id), actualEventtext);
  })
});

 //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var hourElement = $('[id^="hour-"]');
  var currentHour = dayjs().hour()

  hourElement.each (function(){
    var diffFromCurrentHour = (dayjs((parseInt((this.id.replace('hour-', ''))))).diff(currentHour));
    if (diffFromCurrentHour === 0) {
      $(this).addClass ("present");
    }
    else if (diffFromCurrentHour > 0) {
      $(this).addClass ("future");
    }
    else {
      $(this).addClass ("past");
    }
  })
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function getLocalStorageValues () {
    hourElement.each (function(){
      var hourID = localStorage.getItem("hour" + ($(this).attr('id')));
      var hourElementID = ($(this).attr('id'));
      if (hourElementID === hourID){
        console.log(localStorage.getItem("event"))
        //find related description event and insert text
        $(this).find('.description').text(localStorage.getItem("event" + ($)(this).attr('id')))
      }
    })
  }
  //
  // TODO: Add code to display the current date in the header of the page.
  function getDate (){
    var currentDate = (dayjs().format('dddd MMMM DD YYYY'));
    console.log(currentDate);
  }
