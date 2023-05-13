const playlistTable = document.getElementById('playlist');

function displayPlaylist() {
  const playlist = JSON.parse(localStorage.getItem('playlist')) || {};

  playlistTable.innerHTML = `
    <tr>
      <th>Song ID</th>
      <th>Title</th>
      <th>Duration</th>
      <th>Action</th>
    </tr>
  `;

  for (const trackId in playlist) {
    const {title, duration} = playlist[trackId];
    const row = playlistTable.insertRow();

    const idCell = row.insertCell(0);
    idCell.innerHTML = trackId;

    const titleCell = row.insertCell(1);
    titleCell.innerHTML = title;

    const durationCell = row.insertCell(2);
    durationCell.innerHTML = duration;

    const deleteCell = row.insertCell(3);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'glass', 'clear-a');
   
    deleteButton.innerText = 'Remove';
    deleteButton.dataset.track = trackId;
    deleteButton.addEventListener('click', () => {
      console.log('Delete button clicked');
      delete playlist[trackId];
      localStorage.setItem('playlist', JSON.stringify(playlist));
      displayPlaylist();
    
      // show the add button for the song that was deleted from the playlist
    const addBtn = document.querySelector(`button[data-track="${trackId}"]`);
    if (addBtn) {
      addBtn.style.display = 'block';
    }
    });
    deleteCell.appendChild(deleteButton);
  }
}

displayPlaylist();
