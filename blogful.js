let jsonData = [];
async function fetchData() {
    try {
        const response = await fetch('Assets/data.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        jsonData = await response.json();
        console.log('Fetched JSON data:', jsonData);
        showInitialCards();

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
fetchData();
// Event listener for input changes
const searchInput = document.getElementById('searchInput');
const suggestionContainer = document.getElementById('suggestionContainer');
const entryContainer = document.getElementById('entryContainer');

searchInput.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();

    // Display suggestions if search value is not empty, otherwise hide suggestions
    if (searchValue.trim() !== '') {
        const suggestions = getMatchingSuggestions(searchValue);
        displaySuggestions(suggestions);
        suggestionContainer.style.display = 'block';
    } else {
        suggestionContainer.style.display = 'none';
    }
});

// Handle focusing on search input
searchInput.addEventListener('focus', function () {
    const searchValue = this.value.toLowerCase();

    // Display suggestions if search value is not empty, otherwise hide suggestions
    if (searchValue.trim() !== '') {
        const suggestions = getMatchingSuggestions(searchValue);
        displaySuggestions(suggestions);
        suggestionContainer.style.display = 'block';
    }
});

// Function to filter suggestions based on search value
function getMatchingSuggestions(searchValue) {
    return jsonData.filter(entry => {
        // Check if the searchValue exists in any key of the entry
        for (const key in entry) {
            if (String(entry[key]).toLowerCase().includes(searchValue)) {
                return true;
            }
        }
        return false;
    });
}
// function to display suggestions 
function displaySuggestions(suggestions) {
    const suggestionList = document.getElementById('suggestionList');

    // Clear previous suggestions
    suggestionList.innerHTML = '';

    // Display new suggestions
    suggestions.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = item.title;

        // Add a click event listener to each suggestion item
        listItem.addEventListener('click', function () {
            const selectedTitle = item.title;

            // Update the article page with the selected title
            updateArticlePage(selectedTitle);

            // Clear the search input and hide suggestions (if needed)
            searchInput.value = '';
            suggestionContainer.style.display = 'none';
        });

        suggestionList.appendChild(listItem);
    });
}

// Function to update the article page with the selected title
function updateArticlePage(selectedTitle) {
    // Assuming your article page URL is 'article.html'
    const articlePageURL = `temp.html?title=${encodeURIComponent(selectedTitle)}`;
    console.log(articlePageURL)
    // Redirect to the article page with the selected title as a parameter
    window.location.href = articlePageURL;
}


// Event listener to handle suggestion selection
suggestionContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        const selectedValue = event.target.textContent;
        // Perform action with the selected value, e.g., navigate to a page or perform a search
        console.log("Selected Value:", selectedValue);
        // Clear the search input and hide suggestions
        searchInput.value = '';
        suggestionContainer.style.display = 'none';
    }
});

// function to hide search bar when tap on navBar
const hideme = document.querySelector(".navbar")
hideme.addEventListener('click',() =>{
    searchInput.value = '';
    suggestionContainer.style.display = 'none';
})

// underline the active thing
document.addEventListener("DOMContentLoaded", function () {
    // Get all navigation links
    var navLinks = document.querySelectorAll('.nav-link');

    // Add click event listener to each link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // Remove "active" class from all links
            navLinks.forEach(function (innerLink) {
                innerLink.classList.remove('active');
            });

            // Add "active" class to the clicked link
            link.classList.add('active');
        });
    });
});

// Function to all
function all(){
    var req = document.querySelector('.nav-all')
    req.addEventListener('click',(req) =>{
        req.classList.add('active')
    })  
}

// Function to show entries by category
function showEntriesByCategory(category) {
    const filteredEntries = jsonData.filter(entry => entry.tag_name === category);
    displayEntries(filteredEntries.slice(0, jsonData.length));
}

// Function to display entries
function displayEntries(entries) {
    entryContainer.innerHTML = '';

    entries.forEach(entry => {
        const entryCard = createEntryCard(entry);
        entryContainer.appendChild(entryCard);
    });
}

// Function to create an entry card
function createEntryCard(entry) {
const card = document.createElement('div');
card.classList.add('card', 'entry-card', 'col-md-6');

const cardImg = document.createElement('img');
cardImg.classList.add('card-img-top');
cardImg.src = entry.img_link;
card.appendChild(cardImg);

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');

const cardTitle = document.createElement('h5');
cardTitle.classList.add('card-title');
cardTitle.textContent = entry.title;

const cardContent = document.createElement('div');
cardContent.classList.add('card-content');
const contentParagraph = document.createElement('p');
contentParagraph.classList.add('card-text');
contentParagraph.textContent = entry.content.substring(0, 150); // Displaying only the first 150 characters

// Add tag_name as a badge
const tagLabel = document.createElement('span');
tagLabel.classList.add('badge', 'bg-primary', 'rounded-pill');
tagLabel.textContent = entry.tag_name;
cardContent.appendChild(tagLabel);

cardContent.appendChild(contentParagraph);

const cardAuthor = document.createElement('p');
cardAuthor.classList.add('card-text', 'text-muted');
cardAuthor.textContent = `${entry.author_data.full_name}, ${entry.author_data.job_title} | ${entry.author_data.read_time} | ${entry.author_data.date}`;

const moreContent = document.createElement('div');
moreContent.classList.add('more-content');

const fullContent = document.createElement('p');
fullContent.textContent = entry.content;
moreContent.appendChild(fullContent);




cardBody.appendChild(cardTitle);
cardBody.appendChild(cardContent);
cardBody.appendChild(cardAuthor);
cardBody.appendChild(moreContent);

card.appendChild(cardBody);

return card;
}


// Function to load more entries
function displayEntries(entries) {
    entryContainer.innerHTML = '';

    entries.forEach(entry => {
        const entryCard = createEntryCard(entry);
        entryContainer.appendChild(entryCard);
    });

}


// Event listener for logo click to reload the page
const logoElement = document.getElementById('logo');

logoElement.addEventListener('click', function () {
    location.reload();
});


// Today's picks

const entityData = [
    {
        tag_name: 'Technology',
        author_data: {
            full_name: 'Author 1',
            job_title: 'Job Title 1',
            read_time: '4 min read',
            date: 'May 24, 2022'
        },
        title: 'Lorem ipsum dolor sit amet.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, accusantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, asperiores!lorem15',
        img_link: 'https://via.placeholder.com/150' // Replace with actual image URL
    },
    {
        tag_name: 'Science',
        author_data: {
            full_name: 'Author 2',
            job_title: 'Job Title 2',
            read_time: '3 min read',
            date: 'May 25, 2022'
        },
        title: 'Lorem ipsum dolor sit amet.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, accusantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, asperiores!lorem15',
        img_link: 'https://via.placeholder.com/150' // Replace with actual image URL
    },
    {
        tag_name: 'Art',
        author_data: {
            full_name: 'Author 3',
            job_title: 'Job Title 3',
            read_time: '5 min read',
            date: 'May 26, 2022'
        },
        title: 'Lorem ipsum dolor sit amet.',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, accusantium?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, asperiores!lorem15',
        img_link: 'https://via.placeholder.com/150' // Replace with actual image URL
    },
];
document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.getElementById('cardContainer');

    if (cardContainer) {
        // Create cards for each entity
        entityData.forEach((entity,index) => {
            createCard(entity,index);
        });
    } else {
        console.error('Could not find the cardContainer element.');
    }
});
function createCard(entity,index) {
    const cardContainer = document.getElementById('cardContainer');
    if (cardContainer) {
        const card = document.createElement('div');
        index != 0 ? card.classList.add('card', 'col-md-6') :
        card.classList.add('card', 'col-md-12');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const mainBodyDisplayImage = document.createElement('div');
        mainBodyDisplayImage.classList.add('main-body-display-image');
        const img = document.createElement('img');
        img.src = entity.img_link;
        img.alt = '';
        
        mainBodyDisplayImage.appendChild(img);

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = entity.title;

        const cardContent = document.createElement('p');
        cardContent.classList.add('card-text');
        cardContent.textContent = entity.content;

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        const a1 = document.createElement('a');
        a1.href = '#';
        a1.classList.add('main-btn');
        a1.textContent = entity.tag_name;

        const p1 = document.createElement('p');
        p1.classList.add('main-text');
        p1.textContent = `${entity.author_data.full_name} | ${entity.author_data.job_title} | ${entity.author_data.read_time} | ${entity.author_data.date}`;

        cardFooter.appendChild(a1);
        cardFooter.appendChild(p1);

        cardBody.appendChild(mainBodyDisplayImage);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardContent);
        cardBody.appendChild(cardFooter);

        card.appendChild(cardBody);

        cardContainer.appendChild(card);
        img.classList.add('img-fluid');
        // kashyap@ todays 
        img.addEventListener('click',() =>{
            console.log(entity.title);
        })
    } else {
        console.error('Could not find the cardContainer element.');
    }
}
// new js for trending topics 
const cardContainerTwo = document.getElementById('cardContainerTwo');
const showMoreBtn = document.getElementById('showMoreBtn');
let currentIndex = 0;
// function createCardInTrendingTopics(cardData) {
//     const card = document.createElement('div');
//     card.classList.add('col-sm-6', 'col-md-6', 'card');
//     card.innerHTML = `
//         <img src="${cardData.img_link}" alt="" class="card-img-top" id = "${cardData.title}">
//         <div class="card-body">
//             <a href="#" class="main-btn">${cardData.tag_name}</a>
//             <p class="main-text">
//                 ${cardData.author_data.full_name} | ${cardData.author_data.job_title} | ${cardData.author_data.read_time} read | ${cardData.author_data.date}
//             </p>
//         </div>
//         <div class="card-footer">
//             <h2>${cardData.title}</h2>
//             <p>${cardData.content}</p>
//         </div>
//     `;
//     cardContainerTwo.appendChild(card); 
// }
function createCardInTrendingTopics(cardData) {
    // Function to create a sanitized ID
    const sanitizeId = (id) => {
        return id.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');
    };

    const sanitizedTitleId = sanitizeId(cardData.title);

    const card = document.createElement('div');
    card.classList.add('col-sm-6', 'col-md-6', 'card');
    card.innerHTML = `
        <img src="${cardData.img_link}" alt="" class="card-img-top" id="${sanitizedTitleId}">
        <div class="card-body">
            <a href="#" class="main-btn">${cardData.tag_name}</a>
            <p class="main-text">
                ${cardData.author_data.full_name} | ${cardData.author_data.job_title} | ${cardData.author_data.read_time} read | ${cardData.author_data.date}
            </p>
        </div>
        <div class="card-footer">
            <h2>${cardData.title}</h2>
            <p>${cardData.content}</p>
        </div>
    `;
    cardContainerTwo.appendChild(card);

    // Add event listener to the img tag
    const imgElement = card.querySelector(`#${sanitizedTitleId}`);
    
}

function showInitialCards() {
    for (let i = 0; i < 6 && currentIndex < jsonData.length; i++) {
        createCardInTrendingTopics(jsonData[currentIndex]);
        console.log(currentIndex);
        currentIndex++;
    }
}
function replaceInitialCards() {
    // Remove the initial 6 cards
    if (currentIndex < 10) {
        for (let i = 0; i < 6; i++) {
            cardContainerTwo.removeChild(cardContainerTwo.firstElementChild);
        }
    } else {
        for (let i = 0; i < 10; i++) {
            cardContainerTwo.removeChild(cardContainerTwo.firstElementChild);
        }
    }

    // Show the next 10 cards
    for (let i = 0; i < 10 && currentIndex < jsonData.length; i++) {
        createCardInTrendingTopics(jsonData[currentIndex]);
        console.log(currentIndex);
        currentIndex++;
    }

    // Hide the "Show More" button if all content is exhausted
    if (currentIndex >= jsonData.length) {
        showMoreBtn.style.display = 'none';
    }
}
// Show More button click event
showMoreBtn.addEventListener('click', function () {
    replaceInitialCards();
});


// new 
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingMessage = document.getElementById('loading-message');

    // Show loading screen
    loadingScreen.style.display = 'flex';

    // Simulate a delay using setTimeout
    setTimeout(function () {
        // Hide loading screen after the timeout
        loadingScreen.style.display = 'none';
    }, 2000); // Adjust the timeout duration as needed
});



// dark light mode
const backgroundCheckbox = document.getElementById('darknlightmode')
document.addEventListener('DOMContentLoaded', function () {
    const backgroundCheckbox = document.getElementById('backgroundCheckbox');

    // Toggle background color on checkbox change
    backgroundCheckbox.addEventListener('change', function () {
        document.body.classList.toggle('custom-background', backgroundCheckbox.checked);
    });
});
