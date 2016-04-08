(function () {
  'use strict';
  
  var reg = /<%=\s*this.+?\s*%>/g;

  function processConfig(obj, target) {
    var object = typeof obj === 'string' ? JSON.parse(obj) : obj,
      currentField;
    
    target = target || object;

    for (var key in object) {
      currentField = object[key];
      if (currentField instanceof Object) {
        processConfig(currentField, target);
      } else {
        if (currentField.match(reg)) {
          object[key] = parseValue(target, object[key]);
        }
      }
    }
    
    return target;
  }

  function parseValue(object, value) {
    var newValue = value,
      parts = value.match(reg);

    if (!parts) {
      return;
    }

    parts.forEach(function (el) {
      var field = el.replace(/<%=\s*(.+?)\s*%>/g, '$1').replace('this.', ''),
        props = field.split('.'),
        length = props.length,
        index = 0,
        currentObject = object,
        keyObj;
      
      for (; index < length; index++) {
        keyObj = currentObject[props[index]];

        if (!keyObj) {
          break;
        }

        if (index === length - 1) {
          newValue = newValue.replace(el, keyObj);
        }

        currentObject = keyObj;

      }
    });

    return newValue;
  }
  
  module.exports = processConfig;
})();