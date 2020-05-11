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
});
