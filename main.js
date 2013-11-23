;(function (global) {
  "use strict";

  var url =  "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";

  var resultsTemplate = _.template($("#search-results").text()),
      templateCache   = {};

  _.mixin({
    partial: function(templateName, data) {
      var partialTemplate = templateCache[templateName];
      if(!partialTemplate) {
        var templateEl = $("#"+templateName);
        if(templateEl.length == 0) {
          console.error("No template", templateName, "exists");
        }
        partialTemplate = _.template(templateEl.text());
        templateCache[templateName] = partialTemplate
      }
      return partialTemplate(data);
    }
  });

  function message(str) {
    $("#message").html(str);
  }

  function query(q) {
    $.ajax({
      url: url + q,
      dataType: "jsonp",
      success: function(jsonp) {
        $("#results").html(
          resultsTemplate({results: jsonp[1]})
        );
      }
    });
  }

  var clearMessage = _.debounce(function() {
    message("");
  }, 3000);

  function init() {
    $("#search").on("click", function(e) {
      query($("#query").prop("value"));
    });

    $("#results").delegate("input[type=checkbox]", "click", function(e) {
      var id = $(e.target).parents("li").data("id");
      message(id + " clicked!");
      clearMessage();
    });
  }

  init();

})(this);
