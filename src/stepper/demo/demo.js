var demo = function (e) {
  // Stepper linear demonstration 
  var demoLinear = function () {
    // Select stepper container element      
    var element = document.querySelector('.mdl-stepper#demo-stepper-linear');
    if (!element) return false;
    // Get the MaterialStepper instance of element to control it          
    var stepper = element.MaterialStepper;
    var steps = element.querySelectorAll('.mdl-step');
    var step;
    // Just looping and adding listener to event onstepnext to the all steps          
    for (var i = 0; i < steps.length; i++) {
      step = steps[i];
      // When user clicks on [data-stepper-next] button of step          
      step.addEventListener('onstepnext', function (e) {
        // {element}.MaterialStepper.next() change the state of current step to "completed" 
        // and move one step forward        
        stepper.next();
      });
    }
    // When all steps are completed this event is dispatched          
    element.addEventListener('onsteppercomplete', function (e) {
      var toast = document.querySelector('#snackbar-stepper-complete');
      if (!toast) return false;
      toast.MaterialSnackbar.showSnackbar({
        message: 'Stepper linear are completed',
        timeout: 4000,
        actionText: 'Ok'
      });
    });
  };
  // Stepper non-linear demonstration 
  var demoNonLinear = function () {
    var element = document.querySelector('.mdl-stepper#demo-stepper-non-linear');
    if (!element) return false;
    var stepper = element.MaterialStepper;
    var steps = element.querySelectorAll('.mdl-step');
    var step;
    for (var i = 0; i < steps.length; i++) {
      step = steps[i];
      step.addEventListener('onstepnext', function (e) {
        stepper.next();
      });
    }
    element.addEventListener('onsteppercomplete', function (e) {
      var toast = document.querySelector('#snackbar-stepper-complete');
      if (!toast) return false;
      toast.MaterialSnackbar.showSnackbar({
        message: 'Stepper non-linear are completed',
        timeout: 4000,
        actionText: 'Ok'
      });
    });
  };
  // Stepper feedback demonstration 
  var demoFeedback = function () {
    var element = document.querySelector('.mdl-stepper#demo-stepper-feedback');
    if (!element) return false;
    var stepper = element.MaterialStepper;
    var steps = element.querySelectorAll('.mdl-step');
    var step;
    for (var i = 0; i < steps.length; i++) {
      step = steps[i];
      step.addEventListener('onstepnext', function (e) {
        // Just showing the transient effect for 3s     
        setTimeout(function () {
          // Nice now goes forward     
          stepper.next();
        }, 3000);
      });
    }
    element.addEventListener('onsteppercomplete', function (e) {
      var toast = document.querySelector('#snackbar-stepper-complete');
      if (!toast) return false;
      toast.MaterialSnackbar.showSnackbar({
        message: 'Stepper with feedback are completed',
        timeout: 4000,
        actionText: 'Ok'
      });
    });
  };
  // Editable steps demonstration 
  var demoEditableSteps = function () {
    var element = document.querySelector('.mdl-stepper#demo-editable-steps');
    if (!element) return false;
    var stepper = element.MaterialStepper;
    var steps = element.querySelectorAll('.mdl-step');
    var step;
    for (var i = 0; i < steps.length; i++) {
      step = steps[i];
      step.addEventListener('onstepnext', function (e) {
        stepper.next();
      });
    }
    element.addEventListener('onsteppercomplete', function (e) {
      var toast = document.querySelector('#snackbar-stepper-complete');
      if (!toast) return false;
      toast.MaterialSnackbar.showSnackbar({
        message: 'Stepper with editable step are completed',
        timeout: 4000,
        actionText: 'Ok'
      });
    });
  };
  // Optional steps demonstration 
  var demoOptionalSteps = function () {
    var element = document.querySelector('.mdl-stepper#demo-optional-steps');
    if (!element) return false;
    var stepper = element.MaterialStepper;
    var steps = element.querySelectorAll('.mdl-step');
    var step;
    for (var i = 0; i < steps.length; i++) {
      step = steps[i];
      // When user clicks on [data-stepper-skip] button of step                
      step.addEventListener('onstepskip', function (e) {
        // {element}.MaterialStepper.skip() move one step forward without change the
        // state of current step and only works in optionals steps           
        stepper.skip();
      });

      step.addEventListener('onstepnext', function (e) {
        stepper.next();
      });
    }
    element.addEventListener('onsteppercomplete', function (e) {
      var toast = document.querySelector('#snackbar-stepper-complete');
      if (!toast) return false;
      toast.MaterialSnackbar.showSnackbar({
        message: 'Stepper with optional step are completed',
        timeout: 4000,
        actionText: 'Ok'
      });
    });
  };
  // Error state demonstration 
  var demoErrorState = function () {
    var element = document.querySelector('.mdl-stepper#demo-error-state');
    if (!element) return false;
    var stepper = element.MaterialStepper;
    var steps = element.querySelectorAll('.mdl-step');
    var step;
    for (var i = 0; i < steps.length; i++) {
      step = steps[i];
      step.addEventListener('onstepnext', function (e) {
        var input = this.querySelector('input#step-error-number');
        if (input) {
          if (input.value > 10) {
            // If input number > 10 just move forward          
            stepper.next();
          } else {
            var message = this.querySelector('input#step-error-message').value;
            if (!message) {
              message = 'Please number greater than 10';
            }
            // {element}.MaterialStepper.error(message) change the state of current step to "error"
            // and display the message passed as parameter          
            stepper.error(message);
          }
        } else {
          stepper.next();
        }
      });
    }
    element.addEventListener('onsteppercomplete', function (e) {
      var toast = document.querySelector('#snackbar-stepper-complete');
      if (!toast) return false;
      toast.MaterialSnackbar.showSnackbar({
        message: 'Stepper with error state are completed',
        timeout: 4000,
        actionText: 'Ok'
      });
    });
  };

  demoLinear();
  demoNonLinear();
  demoFeedback();
  demoEditableSteps();
  demoOptionalSteps();
  demoErrorState();
};

// Call your functions after page load 
window.addEventListener('load', demo);