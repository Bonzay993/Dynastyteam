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

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Loop through each object in the JSON array
        jsonData.forEach(item => {
            // Save each key into a variable
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('news');

            // Generate the inner HTML for the news item
            newsDiv.innerHTML = `
                <h1>${item.title}</h1>
                <h3>${item.description}</h3>
                <div class="youtube-embed">
                    <iframe width="420" height="315" src="${item.youtube}" frameborder="0" allowfullscreen></iframe>
                </div>
            `;

            // Append the news div to the news-container
            newsContainer.appendChild(newsDiv);
        });
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}