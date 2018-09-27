$(document).ready(function() {

  if (!window.PaymentRequest) {
    // PaymentRequest API is not available. Forwarding to
    // legacy form based experience.
    $("textarea#taCanMakePayment").val("PaymentRequest API is not available.");
    return;
  }

  $("textarea#taCanMakePayment").val("PaymentRequest API is available!");

  //data to be used alongside spay
  var payData = {
    //product ID obtained from Samsung onboarding portal
    "version": '1',
    'allowedCardNetworks': ['AMEX', 'mastercard', 'visa'],
    'orderNumber': "1233123",
    'merchantName': 'Shop Samsung (demo)'
  }

  var supportedInstruments = [{
    supportedMethods: ['https://spay.samsung.com'], // current url
    data: payData
  }];

  // details contain info about the transaction
  var details = {
    total: {
      label: "Total due",
      amount: {
        currency: "USD",
        value: "00.00"
      }
    }
  };

  // collect additional information
  var options = {};

  var payment = new PaymentRequest(
    supportedInstruments, // required payment method data
    details, // required information about transaction
    options // optional parameter for things like shipping, etc.
  );

  if (!payment.canMakePayment()) {
    console.log("Cannot make payment.")
    $("textarea#taCanMakePayment").val("Cannot make payment.");
    return;
  }

  console.log("Can make payment")
  $("textarea#taCanMakePayment").val("Can make payment!");
})
