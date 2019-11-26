
var Main = (function($) {

  // Misc. Globals
  var screen_width = 0,
      $document,
      headerElementStyle,
      displayCoordsPreface;

  // For throttling
  lastMove = 0;
  eventThrottle = 10;

  // User sensor data
  var userX = 0.8; // I just like the way 0.8,0.8 looks. Default there before user interaction
  var userY = 0.8;

  // Debugging Options / Vars
  var forceFallback = false;
  var displayCoords = false;
  var displayBoxes = false;

  // Fallback
  var useFallback = true; // default

  function _init() {

    $document = $(document);
    headerElementStyle = $('.site-header')[0].style;

    passUserCoordsToCSS();

    // Set screen size vars
    _resize();

    // Set debugging vars based on query string
    readDebuggingVars();

    // Force fallback animation if debug variable says so
    // or if we are on iOS.  iOS seems to crash doing all the accel detection and 
    // variable font stuff.  Ran out of time to figure out why.  But iOS who's accel
    // actually works is such a sliver of use cases.  Whatever, fallback anim!
    if(forceFallback || iOS()) {
      initFallback();
    } else {
      initUserPositioning(); // Note: If we choose accelerometer mode and the deviceOrientation fails to get events, fallback animation will happen
    }

    // Create a nicer load-in experience, wait for images...
    $('body').waitForImages(function() {
      loaded();
    }, false, true);

  } // end init()

  function loaded() {
    $('body').addClass('-loaded');
  }

  // Called in quick succession as window is resized
  function _resize() {
    screenWidth = document.documentElement.clientWidth;
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
    if ( typeof vars.coords !== 'undefined' ) { displayCoords = vars.coords; }
    if ( typeof vars.boxes !== 'undefined' ) { displayBoxes = vars.boxes; }
    if ( typeof vars.fallback !== 'undefined' ) { forceFallback = vars.fallback; }

    // Init any debugging options

    // UI for testing acceleromater
    if(displayCoords) { $('body').append('<div class="user-coords"></div>'); }

    // UI for testing acceleromater
    if(displayBoxes) { $('body').addClass('debug-boxes'); }
  }

  // Detect iOS.  Thanks: https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
  function iOS() {

    var iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];

    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
      }
    }

    return false;
  }

  // Update CSS with our coords
  function passUserCoordsToCSS() {
    headerElementStyle.setProperty('--user-x', userX);
    headerElementStyle.setProperty('--user-y', userY);
  }

  // Read DeviceOrientation to user-x/y
  function readDeviceOrientation(e) {

    preventFallback();

    // Throttle -- Thanks Matt!
    var now = Date.now();
    if (now > lastMove + eventThrottle) {
      lastMove = now;

      // Adjust position based on phone's angles
      var gammaUnit = (e.gamma+45)/90; // 45deg rotation in either direction gives range [0,1]
      var gammaUnitAdjusted = gammaUnit/2+0.25; // Map to [.25,.75]
      userX = Math.min(Math.max( gammaUnitAdjusted ,0),1); // Create strict [0,1] limit, jic

      var betaUnit = (e.beta)/90; // 0-90deg rotation gives range [0,1]
      var betaUnitAdjusted = betaUnit; // No adjustment as of yet.
      userY = Math.min(Math.max( betaUnitAdjusted ,0),1); // Create strict [0,1] limit, jic

      // Update debugging UI
      if(displayCoords) {
        $('.user-coords').empty().append(displayCoordsPreface+'<br>Gamma: '+e.gamma.toFixed(2)+'<br>Unit: '+gammaUnit.toFixed(2)+'<br>Adjusted: '+gammaUnitAdjusted.toFixed(2)+'<br>userX: '+userX.toFixed(2)+'<br>Beta: '+e.beta.toFixed(2)+'<br>userY: '+userY.toFixed(2)+'<br>');
      }

      // Let CSS know
      passUserCoordsToCSS();
    }
  }

  // Read mouse data to user-x/y
  function readMouse(e) {
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

      // Map mouse x position to continuum [0,1]
      userX = (mouseX/windowWidth);
      userY = (mouseY/windowHeight);

      // Update debugging UI
      if(displayCoords) {
        $('.user-coords').empty().append(displayCoordsPreface+'<br>userX: '+userX.toFixed(2)+'<br>userY: '+userY.toFixed(2)+'<br>');
      }

      passUserCoordsToCSS();
    }
  }

  // Get the position of the users sensor (mouse of phone accelerometer) and map in a unit cartesian space [0,1] for both x,y
  function initUserPositioning() {

    // UserX,Y will be given used to animate and will be read from accelerometers on devices that have those AND have touch screens
    // Otherwise we use mouse!
    // Note: Many laptops have accelerometers (hence the necessity of detecting touch)
    // It's not perfect but its the best I can figure...

    // First, do we have DeviceOrientationEvent and touchscreen?
    if (window.DeviceOrientationEvent && Modernizr.touchevents) {

      // Update the debugging UI
      if (displayCoords) {
        displayCoordsPreface = 'Using orientation<br>'+(window.DeviceOrientationEvent ? 'Orientation Supported': 'No Orientation Event')+'<br>'+(Modernizr.touchevents ? 'Touch': 'No Touch');
        $('.user-coords').empty().append(displayCoordsPreface);
      }

      // Attach readDeviceOrientation to Accel
      window.addEventListener("deviceorientation", readDeviceOrientation);

      // Pretty immediately try to fallback.  DeviceOrientation, if its working, will immediatly halt the fallback.  If not, we get a dance.
      fallbackTimer = setTimeout(initFallback, 50);

    // No?  Let's use the mouse!  (If by some chance we got here on a phone, the timeout animation process will have our back...)
    } else {

      // Update the debugging UI
      if (displayCoords) {
        displayCoordsPreface = 'Using mouse<br>'+(window.DeviceOrientationEvent ? 'Orientation Supported': 'No Orientation Event')+'<br>'+(Modernizr.touchevents ? 'Touch': 'No Touch');
        $('.user-coords').empty().append(displayCoordsPreface);
      }

      // Adjust position based on mouse (if present)
      $(document).on('mousemove', readMouse);
    }
  }

  function initFallback() {
    if(useFallback) {
      $('body').addClass('-fallback-anim');
    }
  }

  function preventFallback() {
    useFallback = false;
    $('body').removeClass('-fallback-anim'); // Just in case we got here late
  }

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
