const video = document.querySelector(".video");

video.addEventListener("mouseenter", function() {
  this.currentTime = 0;
  this.play();
});

video.addEventListener("mouseleave", function() {
  this.pause();
});

'use strict';

function typeWriter(el) {
    const textArray = el.innerHTML.split('');
    el.innerHTML = '';
    textArray.forEach((letter, i) =>
        setTimeout(() => (el.innerHTML += letter), 95 * i)
    );
    setInterval(() => typeWriter(el), 8000);
}

typeWriter(elementEl);