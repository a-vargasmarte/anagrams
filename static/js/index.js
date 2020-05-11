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
          $("iframe").remove();
          let cardBody = $("#compare-card-body");
          let resultContent = $("<div>", {
            class: "col-md-6 mx-auto"
          });

          let resultImage = $("<iframe>", {
            src: res.data
              ? "https://giphy.com/embed/K2MbdWVYVV3Tq"
              : "https://giphy.com/embed/TydZAW0DVCbGE",
            width: "200",
            height: "200",
            frameBorder: "0",
            class: "giphy-embed"
          });
          let resultLink = $("<a>", {
            href: res.data
              ? `https://giphy.com/gifs/giphyqa-K2MbdWVYVV3Tq`
              : `https://giphy.com/gifs/sad-crying-spongebob-squarepants-TydZAW0DVCbGE`
          });

          resultImage.append(resultLink);
          resultContent.append(resultImage);
          cardBody.append(resultContent);
        })
        .catch(err => err);
    }
  });
});
