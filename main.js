;(function () {
  "use strict";

  x = 5;

  var url =  "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";

  function query(q) {
    $.getJSON(url + q, null, function(xs) {
    });
  }

})(this);
