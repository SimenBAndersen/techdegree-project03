$(function() {
  // Checkbox/conference-events
  const $CHECKBOXES = $("input[type='checkbox']");
  const $JSFRAMEWORKS = $("input[name='js-frameworks']");
  const $JSLIBS = $("input[name='js-libs']");
  const $EXPRESS = $("input[name='express']");
  const $NODE = $("input[name='node']");

  // Hide the payment options to be later displayed when one is chosen
  $("#credit-card").hide();
  $("#paypal").hide();
  $("#bitcoin").hide();

  // Show the payment method that is chosen and hide previosuly shown ones
  $("select[name='user_payment']").on("change", function(event) {
    if (event.target.value === "credit card") {
      $("#credit-card").show();
      $("#paypal").hide();
      $("#bitcoin").hide();
    }
    else if (event.target.value === "paypal") {
      $("#credit-card").hide();
      $("#paypal").show();
      $("#bitcoin").hide();
    }
    else if (event.target.value === "bitcoin") {
      $("#credit-card").hide();
      $("#paypal").hide();
      $("#bitcoin").show();
    }
    else {
      $("#credit-card").hide();
      $("#paypal").hide();
      $("#bitcoin").hide();
    }
  });

  // When a checkbox is clicked:
  // - update the total price for all the checked activities
  $CHECKBOXES.on("click", function() {
    $(".totalPrice").html("<h3>Total: </h3><p>$" + addToTotal() + "</p>");
  });

  // Give the first text field (name input) focus when page loads
  $("#name").focus();

  // Dynamical error:
  // - as the name input loses focus, checks if it is correctly filled in
  // - if not: provide visible error
  $("#name").focusout(function() {
    if (!validateName()) {
      $("#name").addClass("red-border");
    }
    else {
      $("#name").removeClass("red-border");
    }
  });

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

  // Hide the color options
  $("#color").prop("disabled", true);

  // Change the T-shirt color option based on the chosen Design
  $("select[name='user_design']").on("change", function(event) {

    // If the JS Puns design is chosen:
    // - Show the JS Puns t-shirts & Hide the Heart JS t-shirts
    if (event.target.value === "js puns") {
      $("#color").prop("disabled", false);
      $("#color option").hide();
      $("#color option:contains('JS Puns')").show();
    }
    // If the JS Puns design is chosen:
    // - Hide the JS Puns t-shirts & Show the Heart JS t-shirts
    else if (event.target.value === "heart js") {
      $("#color").prop("disabled", false);
      $("#color option").hide();
      $("#color option:contains('JS shirt')").show();
    }
    // If "select theme"/none is chosen: show none
    else {
      $("#color").prop("disabled", true);
    }
  });

  // Enables/disables Express and its visibility as the JS Frameworks..
  // .. alternative is checked or unchecked
  $JSFRAMEWORKS.on("click", function(event) {
    $EXPRESS.attr("disabled", event.target.checked ? true : false);
    $EXPRESS.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  // Enables/disables JS Frameworks and its visibility as the Express..
  // .. activity is checked or unchecked
  $EXPRESS.on("click", function(event) {
    $JSFRAMEWORKS.attr("disabled", event.target.checked ? true : false);
    $JSFRAMEWORKS.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  // Enables/disables Node and its visibility as the JS Libs..
  // .. activity is checked or unchecked
  $JSLIBS.on("click", function(event) {
    $NODE.attr("disabled", event.target.checked ? true : false);
    $NODE.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  // Enables/disables JS Libs and its visibility as the Node..
  // .. activity is checked or unchecked
  $NODE.on("click", function(event) {
    $JSLIBS.attr("disabled", event.target.checked ? true : false);
    $JSLIBS.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  // Loops through the checkboxes and adds together the sum of all checked ones
  function addToTotal() {
    let total = 0;
    for (let i = 0; i < $CHECKBOXES.length; i++) {
      if ($CHECKBOXES[i].checked === true) {
        total += parseInt($CHECKBOXES[i].dataset.price);
      }
    }
    return total;
  }

  // Controls that the name field is correctly filled:
  // - Letters only
  // - Between 3 and 30 letters long
  function validateName() {
    return (/^[a-zA-Z]{3,30}$/.test($("#name").val())) ? true : false;
  }

  // Function to validate email:
  // - Must contain an @ and a dot ('.')
  function validateEmail() {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#mail").val());
  }

  // Validates that at least 1 box is checked
  function validateCheckboxes() {
    let $numbersChecked = 0;
    for (let i = 0; i < $CHECKBOXES.length; i++) {
      if ($CHECKBOXES[i].checked === true) {
        $numbersChecked++;
      }
    }
    return $numbersChecked > 0 ? true : false;
  }

  // Validates that a zip is 5 numbers long
  function validateZip() {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(($("#zip").val()));
  }

  // Validates that a Crecit Card number is only numbers and at least 16 numbers
  function validateCreditCardNum() {
    return (/[^0-9-]+/.test($("#cc-num").val()) || $("#cc-num").val().length < 16);
  }

  // Validates that a CVV is 3 or 4 digits and only numbers
  function validateCvv() {
    return /^[0-9]{3,4}$/.test($("#cvv").val());
  }

  // Validates that a option other than the default is chosen
  function validatePayment() {
    return ($("select[name='user_payment']").val() === "select_method") ? false : true;
  }

  // Run through the input-fields and validate the input
  $("button[type='submit']").on("click", function(event) {

    // Remove red border from previous errors before potential new ones are added
    $(".red-border").removeClass("red-border");

    // Prevent the form from submitting if one or more of the following..
    // .. validations return false
    if (!validateName() || !validateEmail() || !validateCheckboxes() || !validatePayment()) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Prevent the form from submitting if one or more of the following..
    // .. credit card specific validations return false
    if ($("select[name='user_payment']").val() === "credit card") {
      if (validateCreditCardNum() || !validateZip() || !validateCvv()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Returns specific error to the credit card input
      if (validateCreditCardNum() || $("#cc-num").val() == "") {

        // If the input contains anything other than a number
        if (/[^0-9-]+/.test($("#cc-num").val())) {
          $(".card-error").html("<p>The card number can only contain numbers</p>");
        }

        // If the input is too short
        else if ($("#cc-num").val().length < 16) {
          $(".card-error").html("<p>The card number needs to be at least 16 digits</p>");
        }

        // Adds visible error
        $("#cc-num").addClass("red-border");
      }
      if (!validateZip()) {
        $("#zip").addClass("red-border");
      }
      if (!validateCvv()) {
        $("#cvv").addClass("red-border");
      }
    }

    if (!validateName()) {
      $("#name").addClass("red-border");
    }

    if (!validateEmail()) {
      $("#mail").addClass("red-border");
    }

    if (!validateCheckboxes()) {
      $CHECKBOXES.addClass("red-border");
    }

    if (!validatePayment()) {
      $("#payment").addClass("red-border");
    }

  });
});
