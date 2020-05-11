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

      postCorpus(corpus);
      drawTree();
    }
  });
  function postCorpus(corpus) {
    axios
      .post("/api/anagrams/find", corpus)
      .then(res => {
        let treeData = res.data.filter(
          pattern => [...new Set(pattern.anagrams)].length >= 2
        );

        console.log(treeData);
      })
      .catch(err => err);
  }

  function drawTree() {}
});
