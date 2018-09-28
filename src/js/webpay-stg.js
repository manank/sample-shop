$(document).ready(function() {

  if (!window.PaymentRequest) {
    // PaymentRequest API is not available. Forwarding to
    // legacy form based experience.
    $("textarea#taCanMakePayment").val("PaymentRequest API is not available.");
    return;
  }

  $("textarea#taCanMakePayment").val("PaymentRequest API is available!");

  let networks = ['amex', 'diners', 'discover', 'jcb', 'mastercard', 'unionpay',
    'visa', 'mir'
  ];
  let types = ['debit', 'credit', 'prepaid'];

  let payData = {
    checkoutPartner: "VisaCheckout",
    requestPayload: {
      data: {
        checkoutPaymentInfo: null,
        visaIntentData: null,
        paymentInitParams: {}
      }
    }
  };

  let basicCardPaymentMethod = {
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: networks,
      supportedTypes: types
    }
  };

  let methodData = [{
    supportedMethods: ["https://ecomm.stg.mpay.samsung.com/ew/v1/vco/w3c"],
    data: payData
  }];
  let details = {
    total: {
      label: "Total due",
      amount: {
        currency: "USD",
        value: "00.00"
      }
    }
  };

  var paymentRequest = new PaymentRequest(methodData, details, {});

  // Feature detect canMakePayment()
  if (paymentRequest.canMakePayment) {
    canMakePaymentPromise = paymentRequest.canMakePayment();
  }

  canMakePaymentPromise.then((result) => {
      if (!result) {
        $("textarea#taCanMakePayment").val("Cannot make payment.");
        return;
      }

      $("textarea#taCanMakePayment").val("Can make payment!");
      $("#payButton").show();

      $("#payButton").click(function() {
        // Make PaymentRequest show to display payment sheet
        payment.show().then(paymentResponse => {
          console.log(paymentResponse);
        }).catch(err => {
          console.error("Uh oh, something bad happened", err);
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
})
