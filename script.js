window.onload = function() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'none'; // Hide spinner when everything is loaded
    getJsonData(); // Fetch JSON data once page is loaded
}

// Function to fetch and process JSON data
async function getJsonData() {
    try {
        // Fetch the JSON file
        const response = await fetch('./data.json');
        const jsonData = await response.json();
        const newsContainer = document.querySelector('.news-container');
        const newsTemplate = document.getElementById('news-template');

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Loop through each object in the JSON array
        jsonData.forEach(item => {
            // Clone the template
            const newsItem = newsTemplate.content.cloneNode(true);

            // Populate the template with data
            newsItem.querySelector('.news-title').textContent = item.title;
            newsItem.querySelector('.news-description').textContent = item.description;
            newsItem.querySelector('iframe').src = item.youtube;
            newsItem.querySelector('p').textContent = `Uploaded on: ${item.uploaded}`;

            // Append the populated template to the news-container
            newsContainer.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}