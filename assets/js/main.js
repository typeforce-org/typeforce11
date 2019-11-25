var Main = (function($) {

  var screen_width = 0,
      breakpoint_small = false,
      breakpoint_medium = false,
      breakpoint_large = false,
      breakpoint_array = [480,600,1200],
      $document,
      variableStyleEl;

  // User sensor data
  var userX = 0;
  var userY = 0;

  // Debugging Options / Vars
  var enableAxis = false;
  var enableKeyPositioning = false;
  var displayCoords = false;


  function _init() {

    $document = $(document);
    variableStyleEl = document.documentElement.style;

    // Set screen size vars
    _resize();

    // Set debugging vars based on query string
    readDebuggingVars();

    // Determine appropriate sensor
    initUserPositioning();

    // Animate
    // animate(); 

    // Esc handlers
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        // Esc
      }
    });

  } // end init()

  // Called in quick succession as window is resized
  function _resize() {
    screenWidth = document.documentElement.clientWidth;
    breakpoint_small = (screenWidth >= breakpoint_array[0]);
    breakpoint_medium = (screenWidth >= breakpoint_array[1]);
    breakpoint_large = (screenWidth >= breakpoint_array[2]);
  }

  // Built a bunch of debugging features that can be accessed by query strings
  function readDebuggingVars() {

    // Get query string vars
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }

    // See if any of the debugging options are present in query string vars
    if ( typeof vars.displayCoords !== 'undefined' ) { displayCoords = vars.displayCoords; }
  }


  function passUserCoordsToCSS() {
    // Update CSS
    variableStyleEl.setProperty('--user-x', userX);
    variableStyleEl.setProperty('--user-y', userY);
  }

  // Get the position of the users sensor (mouse of phone accelerometer) and map in a unit cartesian space [-1,1] for both x,y
  function initUserPositioning() {

    // For throttling
    var lastMove = 0;
    var eventThrottle = 10;

    // UI for testing acceleromater
    if(displayCoords) { $('body').append('<div class="user-coords"></div>'); }

    console.log('Modernizr');
    console.log(Modernizr);

    // UserX,Y will be given used to animate and will be read from accelerometers on devices that have those AND have touch screens
    // Otherwise we use mouse!
    // Note: Many laptops have acclerometers (hence the necessity of detecting touch)
    // It's not perfect but its the best I can figure to test...
    if (window.DeviceOrientationEvent && Modernizr.touchevents) {

      window.addEventListener("deviceorientation", function (event) {

        // Throttle (thanks Matt!)
        var now = Date.now();
        if (now > lastMove + eventThrottle) {
          lastMove = now;

          // Update debugging UI
          if(displayCoords) {
            $('.user-coords').empty().append('Gamma: '+event.gamma.toFixed(2)+'<br>userX: '+userX.toFixed(2)+'<br>Beta: '+event.beta.toFixed(2)+'<br>userY: '+userY.toFixed(2)+'<br>');
          }

          // Adjust position based on phone's angles
          userX = -Math.min(Math.max((event.gamma/90)*5,-1),1); // gamma: left to right  (negative to invert, multipliers and cutoffs are fine tunings to the mapping based on testing)
          userY = -Math.min(Math.max(((event.beta-45)/90)*2,-1),1); // beta: up and down

          // Update CSS
          variableStyleEl.setProperty('--user-x', userX);
          variableStyleEl.setProperty('--user-y', userY);
        }

        passUserCoordsToCSS();
      }, false);

    } else {

      var displayCoordsPreface='';
      // Update the debugging UI
      if (displayCoords) {
        displayCoordsPreface = 'Using mouse<br>'+(window.DeviceOrientationEvent ? 'Orientation Supported': 'No Orientation Event')+'<br>'+(Modernizr.touchevents ? 'Touch': 'No Touch');
      }

      // Adjust position based on mouse (if present)
      $(document).on('mousemove', function(e) {
        e.preventDefault();

        // Throttle (thanks Matt!)
        var now = Date.now();
        if (now > lastMove + eventThrottle) {
          lastMove = now;

          // Get vars
          var mouseX = e.clientX;
          var mouseY = e.clientY;
          var windowWidth = window.innerWidth;
          var windowHeight = window.innerHeight;

          // Map mouse x position to continuum [-1,1]
          userX = (mouseX/windowWidth)*2-1;
          userY = (mouseY/windowHeight)*2-1;

          // Update debugging UI
          if(displayCoords) {
            $('.user-coords').empty().append(displayCoordsPreface+'<br>userX: '+userX.toFixed(2)+'<br>userY: '+userY.toFixed(2)+'<br>');
          }

          passUserCoordsToCSS();
        }
      });
    }
  }

  // // Render the scene
  // function animate() {
  //   animationStarted = true;

  //   // Do this every time the system is ready to animate
  //   requestAnimationFrame( animate );

  // }

  // // Linearly progresses a value to a desired valuse
  // function rampToValue(desired,current,speed) {

  //   // If we are within speed of desired value, just return desired value
  //   if (desired < current+speed && desired > current-speed) {
  //     return desired;
  //   }

  //   // If we are bigger, subtract speed
  //   if (current > desired) {
  //     return current - speed;
  //   }

  //   // If we are smaller, add speed
  //   if (current < desired) {
  //     return current + speed;
  //   }
  // }

  // // Convenience function for converting degrees to radians
  // function d2r(degrees) {
  //   var radians = degrees * Math.PI/180;
  //   return radians;
  // }

  // // Convenience function for converting radians to degrees
  // function r2d(radians) {
  //   var degrees = radians * 180/Math.PI;
  //   return degrees;
  // }

  // Public functions
  return {
    init: _init,
    resize: _resize,
    scrollBody: function(section, duration, delay) {
      _scrollBody(section, duration, delay);
    }
  };

})(jQuery);

// Fire up the mothership
jQuery(document).ready(Main.init);

// Zig-zag the mothership
jQuery(window).resize(Main.resize);
