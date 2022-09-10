// Use Callback function, which is a function following a method
$(document).ready(function () {
  var time = moment().format("dddd, MMMM Do, YYYY");
  $("#currentDay").text(time);
  console.log(time);
  for (var i = 9; i < 19; i++) {
    var colorKey = "";
    var currentHour = moment().hours();
    if (currentHour > i) {
      colorKey = "past";
    } else if (currentHour === i) {
      colorKey = "present";
    } else {
      colorKey = "future";
    }
    var hourDisplay = "";
    if (i < 12) {
      hourDisplay = i + "AM";
    } else if (i === 12) {
      hourDisplay = i + "PM";
    } else {
      hourDisplay = i - 12 + "PM";
    }
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
    var icon = $("<i>").addClass("fas fa-save");
    $(".container").append(
      row.append(hourEl, textArea, buttonDiv.append(button.append(icon)))
    );
  }
});
