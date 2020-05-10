$(document).ready(() => {
  $("body").mousemove(e => {
    parallaxIt(e, ".jumbotron", -30);
  });
  function parallaxIt(e, target, movement) {
    let body = $("body");
    let relX = e.pageX - body.offset().left;
    let relY = e.pageY - body.offset().top;

    TweenMax.to(target, 1, {
      x: ((relX - body.width() / 2) / body.width()) * movement,
      y: ((relY - body.height() / 2) / body.height()) * movement,
      ease: Power2.easeOut
    });
  }
  $("#compare-btn").click(e => {
    e.preventDefault();

    let wordsToCompare = {
      firstWord: $("#compare-first-word").val(),
      secondWord: $("#compare-second-word").val()
    };

    let alertDiv = $("#alert-div");
    let alertContent = $("<div>", {
      class: "alert alert-warning alert-dismissible fade show",
      role: "alert"
    }).text("Please compare with two words");
    let alertButton = $("<button>", {
      class: "close",
      type: "button",
      "data-dismiss": "alert",
      "aria-label": "Close"
    });
    let alertSpan = $("<span>", {
      "aria-hidden": "true"
    }).html(`&times;`);

    alertButton.append(alertSpan);
    alertContent.append(alertButton);

    if (wordsToCompare.firstWord === "" || wordsToCompare.secondWord === "") {
      alertDiv.prepend(alertContent);
    } else {
      alertDiv.empty();
      axios
        .post("/api/anagrams/compare", wordsToCompare)
        .then(res => {
          console.log(res);
        })
        .catch(err => err);
    }
  });
});
