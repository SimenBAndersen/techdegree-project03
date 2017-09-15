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

  $CHECKBOXES.on("click", function() {
    $(".totalPrice").html("<h3>Total: </h3><p>$" + addToTotal() + "</p>");
  });

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

  $JSFRAMEWORKS.on("click", function(event) {
    $EXPRESS.attr("disabled", event.target.checked ? true : false);
    $EXPRESS.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  $EXPRESS.on("click", function(event) {
    $JSFRAMEWORKS.attr("disabled", event.target.checked ? true : false);
    $JSFRAMEWORKS.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  $JSLIBS.on("click", function(event) {
    $NODE.attr("disabled", event.target.checked ? true : false);
    $NODE.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  $NODE.on("click", function(event) {
    $JSLIBS.attr("disabled", event.target.checked ? true : false);
    $JSLIBS.parent().css("text-decoration", event.target.checked ? "line-through" : "");
  });

  function addToTotal() {
    let total = 0;
    for (let i = 0; i < $CHECKBOXES.length; i++) {
      if ($CHECKBOXES[i].checked === true) {
        total += parseInt($CHECKBOXES[i].dataset.price);
      }
    }
    return total;
  }

  function validateName() {
    return ($("#name").val() === "") ? false : true;
  }

  // Function to validate email
  // Found this function online on:
  // https://stackoverflow.com/questions/2507030/email-validation-using-jquery
  function validateEmail() {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test($("#mail").val());
  }

  function validateCheckboxes() {
    let $numbersChecked = 0;
    for (let i = 0; i < $CHECKBOXES.length; i++) {
      if ($CHECKBOXES[i].checked === true) {
        $numbersChecked++;
      }
    }
    return $numbersChecked > 0 ? true : false;
  }

  function validateZip() {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(($("#zip").val()));
  }

  function validateCreditCardNum() {
    return /[^0-9-]+/.test($("#cc-num").val());
  }

  function validateCvv() {
    return /^[0-9]{3,4}$/.test($("#cvv").val());
  }

  function validatePayment() {
    return ($("select[name='user_payment']").val() === "select_method") ? false : true;
  }

  // Run through the input-fields and validate the input
  $("button[type='submit']").on("click", function(event) {

    // Remove red border from previous errors before potential new ones are added
    $(".red-border").removeClass("red-border");

    if (!validateName() || !validateEmail() || !validateCheckboxes() || !validatePayment()) {
      event.preventDefault();
      event.stopPropagation();
    }

    if ($("select[name='user_payment']").val() === "credit card") {
      if (validateCreditCardNum() || !validateZip() || !validateCvv()) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (validateCreditCardNum() || $("#cc-num").val() == "") {
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
