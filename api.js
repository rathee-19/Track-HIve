// Get the search term and duration filter from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const term = urlParams.get('term');
const durationFilter = urlParams.get('duration');

// Get the results container
const resultsContainer = document.getElementById('results');

// Make an AJAX request to the iTunes API
const url = `https://itunes.apple.com/search?term=${term}&media=music&limit=200`;
fetch(url, { method: 'POST' })
  .then(response => response.json())
  .then(data => {
    // Parse the response and filter the results
    const originalResults = data.results;
    let filteredResults = originalResults.slice();
    if (durationFilter) {
      filteredResults = originalResults.filter(result => result.trackTimeMillis / 1000 / 60 < durationFilter);
    }
    displayResults(filteredResults);

    const explicitCheckbox = document.getElementById('explicit-filter');
    explicitCheckbox.addEventListener('change', () => {
      const checked = explicitCheckbox.checked;
      if (checked) {
        // Filter out explicit songs
        filteredResults = filteredResults.filter(result => result.trackExplicitness !== 'explicit');
      } else {
        filteredResults = originalResults.slice();
        if (durationFilter) {
          filteredResults = filteredResults.filter(result => result.trackTimeMillis / 1000 / 60 < durationFilter);
        }
      }
      displayResults(filteredResults);
    });

    // Add an event listener to detect when the duration filter is changed
    const durationInput = document.getElementById('duration-filter');
    durationInput.addEventListener('change', () => {
      const durationValue = durationInput.value;
      if (durationValue) {
        filteredResults = originalResults.filter(result => result.trackTimeMillis / 1000 / 60 < durationValue);
        if (explicitCheckbox.checked) {
          filteredResults = filteredResults.filter(result => result.trackExplicitness !== 'explicit');
        }
      } else {
        filteredResults = originalResults.slice();
        if (explicitCheckbox.checked) {
          filteredResults = filteredResults.filter(result => result.trackExplicitness !== 'explicit');
        }
      }
      displayResults(filteredResults);
    });
      

    const clearFilterButton = document.getElementById('clear-filter-button');
    clearFilterButton.addEventListener('click', () => {
        filteredResults = originalResults.slice();
        displayResults(filteredResults);

        // Clear the explicit checkbox and duration filter
        const explicitCheckbox = document.getElementById('explicit-filter');
        explicitCheckbox.checked = false;
        const durationFilter = document.getElementById('duration-filter');
        durationFilter.value = '';
    });


    function displayResults(results) {
      resultsContainer.innerHTML = '';
      const numResults = Math.min(results.length, 10);
      for (let i = 0; i < numResults; i++) {
        const result = results[i];
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');

        const imageElement = document.createElement('img');
        imageElement.src = result.artworkUrl100;
        resultElement.appendChild(imageElement);

        const nameElement = document.createElement('p');
        nameElement.innerText = result.trackName;
        resultElement.appendChild(nameElement);

        const artistElement = document.createElement('p');
        artistElement.innerText = result.artistName;
        resultElement.appendChild(artistElement);

        if (result.previewUrl) {
          const audioElement = document.createElement('audio');
          audioElement.src = result.previewUrl;
          audioElement.controls = true;
          resultElement.appendChild(audioElement);
        }

        resultsContainer.appendChild(resultElement);
      }
    }
  })
  .catch(error => console.error(error));