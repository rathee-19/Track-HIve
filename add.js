const addBtns = document.querySelectorAll('.add-btn');
const playlist = JSON.parse(localStorage.getItem('playlist')) || {};

addBtns.forEach(btn => {
  const trackId = btn.dataset.track;

  if (playlist[trackId]) {
    // Song is already in playlist
    btn.innerText = 'Added';
    btn.disabled = true;
  }

  btn.addEventListener('click', () => {
    const songTitle = btn.parentNode.parentNode.childNodes[3].textContent;
    const songDuration = btn.parentNode.parentNode.childNodes[5].textContent;
    playlist[trackId] = {title: songTitle, duration: songDuration};
    localStorage.setItem('playlist', JSON.stringify(playlist));
    console.log('Song added to playlist successfully');
    btn.innerText = 'Added';
    btn.disabled = true;
  });
});
