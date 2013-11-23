;(function(global) {
  "use strict"

  var NolenMath = {};
  global.NolenMath = NolenMath;

  function inc(n) {
    return n+1;
  }

  function fooify(n) {
    return "foo" + n;
  }

  function map(f, xs) {
    var ret = [];

    for(var i = 0; i < xs.length; i++) {
      ret.push(f(xs[i]));
    }

    return ret;
  }

  function even(n) {
    return (n % 2) == 0;
  }

  function not(f) {
    return function(x) {
      return !f(x);
    };
  }

  function makePoint(x, y) {
    return {
      x: x,
      y: y,
      toString: function() {
        return ["<", x, ", ", y, ">"].join("");
      }
    };
  }

  var Point = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Point.prototype = {
    numComponents: 2,
    add: function(other) {
      this.x += other.x;
      this.y += other.y;
    },
    sub: function(other) {
      this.x -= other.x;
      this.y -= other.y;
    }
  };

  var get = function(propertyName) {
    return function(obj) {
      return obj[propertyName];
    };
  };

  // export
  NolenMath.Point = Point; 

  var data = [
    new Point(5, 7.5), 
    new Point(1.5, 2),
    new Point(1.5, 9)
  ];

  var sum = function(acc, n) {
    return acc + n;
  };

  var pointAdd = function(p1, p2) {
    return new Point(p1.x+p2.x,p1.y+p2.y);
  };

  var badData = [
     ["foos", 1, 2, 3],
     ["bars", 5, 6, 7],
     ["bazs", 8, 9, 0]
  ];

  var fixData = function(obj, dataElement) {
    obj[dataElement[0]] = dataElement.slice(1);
    return obj;
  };

  console.log(_([1,2,3,4,5]).reduce(sum, 0));
  var goodData = _(badData).reduce(fixData, {});

  console.log(goodData.foos);
  console.log(goodData.bars);

  function BaseComponent(name) {
    this.name = name;
  }
  BaseComponent.prototype = {
    foo: function() {
      console.log("this is foo method", this.name);
    },
    baz: function() {
      return 1;
    }
  }

  function SubComponent(name, otherField) {
    BaseComponent.call(this, name);
    this.otherField = otherField;
  }
  SubComponent.prototype = new BaseComponent();
  SubComponent.prototype.bar = function() {
    console.log("this is bar method", this.otherField);
  };

  var myObject = new SubComponent("David", "cool!");
  console.log(myObject);
  myObject.foo();
  myObject.bar();
  console.log(myObject.baz());

})(this);