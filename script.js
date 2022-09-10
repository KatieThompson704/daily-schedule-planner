// Use Callback,  a function following a method, to loop over all time entries
$(document).ready(function () {
  // get custom date format using moment
  var time = moment().format("dddd, MMMM Do, YYYY");
  // display custom date to page
  $("#currentDay").text(time);
  console.log(time);
  // create loop over each business hour, starting at 9am (i=9) ending at 6pm
  for (var i = 9; i < 19; i++) {
    // link to CSS for past, present, and future color-coding
    var colorKey = "";
    var currentHour = moment().hours();
    if (currentHour > i) {
      colorKey = "past";
    } else if (currentHour === i) {
      colorKey = "present";
    } else {
      colorKey = "future";
    }
    // convert displayed hour to AM /PM
    var hourDisplay = "";
    if (i < 12) {
      hourDisplay = i + ":00 AM";
    } else if (i === 12) {
      hourDisplay = i + ":00 PM";
    } else {
      hourDisplay = i - 12 + ":00 PM";
    }
    // section out display into 3 total columns for: displayed hour(2/12), text area(8/12), and save button (2/12)
    // add class attributes for sectioning via bootstrap
    var row = $("<div>").addClass("row time-block").attr("id", i);
    var hourEl = $("<div>").addClass("col-2 hour").text(hourDisplay);
    var textArea = $("<textarea>")
      .addClass("col-8 description " + colorKey)
      .val(localStorage.getItem(i));
    var buttonDiv = $("<div>").addClass("col-2");
    var button = $("<button>")
      .addClass("btn btn-primary saveBtn")
      .attr("id", i)
      .on("click", function () {
        var hourKey = $(this).attr("id");
        var activity = $(this).parent().siblings(".description").val();
        localStorage.setItem(hourKey, activity);
      });
    // save button icon using font awesome
    var icon = $("<i>").addClass("fas fa-save");
    $(".container").append(
      row.append(hourEl, textArea, buttonDiv.append(button.append(icon)))
    );
  }
});
