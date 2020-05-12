$(document).ready(() => {
  $("#find-btn").click(e => {
    e.preventDefault();

    let corpus = { data: $("#corpus-textarea").val() };

    let alertDiv = $("#alert-div");
    let alertContent = $("<div>", {
      class: "alert alert-warning alert-dismissible fade show",
      role: "alert"
    }).text("You should type in some text!");
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

    if (corpus.data === "") {
      alertDiv.prepend(alertContent);
    } else {
      alertDiv.empty();
      $("svg").remove();

      postCorpus(corpus);
      // drawTree();
    }
  });
  function postCorpus(corpus) {
    axios
      .post("/api/anagrams/find", corpus)
      .then(res => {
        let cardParent = $("#find-card");

        let filteredData = res.data.filter(
          pattern => pattern.anagrams.length >= 2
        );

        filteredData.map((anagram, i) => {
          // create cards and add content

          let corpusContent = $("<div>", {
            class: "col-md-12 card"
          });
          let cardHeader = $("<div>", {
            class: "card-header"
          });
          let anagramHeader = $("<h5>", { class: "mb-0" });

          let collapseButton = $("<button>", {
            class: "btn btn-link",
            "data-toggle": "collapse",
            "data-target": `#collapse${i}`,
            "aria-expanded": "true",
            "aria-controls": `collapse${i}`
          }).text(`Pattern: ${anagram.pattern}`);

          anagramHeader.append(collapseButton);

          cardHeader.append(anagramHeader);
          corpusContent.append(cardHeader);

          // append corpusContent to parent div
          cardParent.append(corpusContent);

          let collapseDiv = $("<div>", {
            id: `collapse${i}`,
            class: `collapse ${i === 0 ? "show" : ""}`,
            "data-parent": "#find-card"
          });

          let cardBody = $("<div>", {
            class: "card-body"
          });

          anagram.anagrams.map(word => {
            let anagramPara = $("<p>").text(word);
            cardBody.append(anagramPara);
          });

          // add card body to collapsable div
          collapseDiv.append(cardBody);

          // append collapseDiv to parent div
          cardParent.append(collapseDiv);
        });
      })
      .catch(err => err);
  }
});
