$(function() {

  // Give the first text field (name input) focus when page loads
  $("#name").focus();

  // Add/Remove text-box based on the value of the option
  $("select[name='user_title']").on("change", function(event) {

    // If the "other" alternative is clicked:
    // - show the text box and its label
    if (event.target.value === "other") {
      $("#other-title").removeClass("is-hidden");
      $("label[for='other-title']").removeClass("is-hidden");
    }
    // If any but the "other" alternative is clicked:
    // - hide the text box and its label
    else {
      $("#other-title").addClass("is-hidden");
      $("label[for='other-title']").addClass("is-hidden");
    }
  });

  // Change the T-shirt color option based on the chosen Design
  $("select[name='user_design']").on("change", function(event) {

    // If the JS Puns design is chosen:
    // - Show the JS Puns t-shirts & Hide the Heart JS t-shirts
    if (event.target.value === "js puns") {
      $("#color option:contains('JS Puns')").show();
      $("#color option:contains('JS shirt')").hide();
    }
    // If the JS Puns design is chosen:
    // - Hide the JS Puns t-shirts & Show the Heart JS t-shirts
    else if (event.target.value === "heart js") {
      $("#color option:contains('JS Puns')").hide();
      $("#color option:contains('JS shirt')").show();
    }
    // If none is chosen: show both
    else {
      $("#color option:contains('JS Puns')").show();
      $("#color option:contains('JS shirt')").show();
    }
  });

  

});
