(function () {
  // Helper function to extend objects with default values
  function extendDefaults(source, properties) {
    let result = {};
    for (let property in source) {
      if (source.hasOwnProperty(property)) {
        result[property] = source[property];
      }
    }
    for (let property in properties) {
      if (properties.hasOwnProperty(property)) {
        result[property] = properties[property];
      }
    }
    return result;
  }

  // Vanilla JavaScript version of the plugin
  function incircle(selector, options) {
    var elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0) {
      return;
    }

    // Default options.
    var defaults = {
      color: "#556b2f",
      backgroundColor: "white",
      type: 1, // circle type - 1 whole, 0.5 half, 0.25 quarter
      radius: "12em", // distance from center
      start: -90, // shift start from 0
      top: "200px",
      left: "200px",
    };

    // Merge the default options with the user-provided options
    var settings = extendDefaults(defaults, options);

    elements.forEach(function (element) {
      element.style.position = "relative";
      element.style.top = settings.top;
      element.style.left = settings.left;
      element.style.listStyleType = "none";
      element.style.margin = 0;
      element.style.padding = 0;

      var childElements = Array.from(element.children).filter(
        function (el, index) {
          return settings.type === 1 || index > 0;
        },
      );

      var numberOfElements =
        settings.type === 1 ? childElements.length : childElements.length - 1;
      var slice = (360 * settings.type) / numberOfElements;

      childElements.forEach(function (child, i) {
        var rotate = slice * i + settings.start;
        var rotateReverse = rotate * -1;

        child.style.position = "absolute";
        child.style.transition = "transform 2s linear";
        child.style.transform =
          "rotate(" +
          rotate +
          "deg) translate(" +
          settings.radius +
          ") rotate(" +
          rotateReverse +
          "deg)";
      });
    });
  }

  window.incircle = incircle;
})();

// Usage example:
incircle(".in-circle", {
  color: "red",
  backgroundColor: "yellow",
  type: 0.5,
  radius: "10em",
  start: 0,
  top: "100px",
  left: "100px",
});
