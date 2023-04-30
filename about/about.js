// const video = document.querySelector(".video");

// video.addEventListener("mouseenter", function() {
//   this.currentTime = 0;
//   this.play();
// });

// video.addEventListener("mouseleave", function() {
//   this.pause();
// });

// 'use strict';

// function typeWriter(el) {
//     const textArray = el.innerHTML.split('');
//     el.innerHTML = '';
//     textArray.forEach((letter, i) =>
//         setTimeout(() => (el.innerHTML += letter), 95 * i)
//     );
//     setInterval(() => typeWriter(el), 8000);
// }

// typeWriter(elementEl);

var TxtType = function(t, e, i) {
  this.toRotate = e,
  this.el = t,
  this.loopNum = 0,
  this.period = parseInt(i, 10) || 2e3,
  this.txt = "",
  this.tick(),
  this.isDeleting = !1
};
TxtType.prototype.tick = function() {
  var t = this.loopNum % this.toRotate.length
    , e = this.toRotate[t];
  this.isDeleting ? this.txt = e.substring(0, this.txt.length - 1) : this.txt = e.substring(0, this.txt.length + 1),
  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
  var i = this
    , s = 200 - 100 * Math.random();
  this.isDeleting && (s /= 2),
  this.isDeleting || this.txt !== e ? this.isDeleting && "" === this.txt && (this.isDeleting = !1,
  this.loopNum++,
  s = 500) : (s = this.period,
  this.isDeleting = !0),
  setTimeout(function() {
      i.tick()
  }, s)
}
,

window.onload = function() {
  for (var t = document.getElementsByClassName("typewrite"), e = 0; e < t.length; e++) {
      var i = t[e].getAttribute("data-type")
        , s = t[e].getAttribute("data-period");
       
        i && new TxtType(t[e],JSON.parse(i),s)
  }
 
  var n = document.createElement("style");
  n.type = "text/css",
  n.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}",
  document.body.appendChild(n)
}
;
