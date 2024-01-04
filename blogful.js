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
        suggestionList.appendChild(listItem);
    });
}



// Event listener to handle suggestion selection
suggestionContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        const selectedValue = event.target.textContent;
        // Perform action with the selected value, e.g., navigate to a page or perform a search
        console.log("Selected Value:", selectedValue);
        const selectedRecord = jsonData.find(record => record.title === selectedValue);
        navigateToArticlePage(selectedRecord.id);

        // Clear the search input and hide suggestions
        searchInput.value = '';
        suggestionContainer.style.display = 'none';
    }
});
function navigateToArticlePage(id) {
    // Assuming you want to navigate to "article.html" with the ID as a query parameter
    const articleUrl = `article.html?id=${id}`;

    // Use location.href to navigate to the specified URL
    location.href = articleUrl;
}
// function to hide search bar when tap on navBar
const sI = document.querySelector('#searchInput'); // Replace with your actual search input ID
const sC = document.querySelector('#suggestionContainer'); // Replace with your actual suggestion container ID
document.addEventListener('click', (event) => {
    if (event.target !== sI && !sI.contains(event.target) && !sC.contains(event.target)) {
        // Clicked outside the search input and suggestion container
        sI.value = '';
        sC.style.display = 'none';
    }
});


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
    card.classList.add('card', 'entry-card', 'col-md-6','dark-mode');

    const cardImg = document.createElement('img');
    cardImg.addEventListener('click',()=>{
        location.href = `article.html?id=${entry.id}`;
    })
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

    const readMoreBtn = document.createElement('button');
    readMoreBtn.classList.add('btn', 'btn-link', 'read-more-btn', 'rounded-pill');
    readMoreBtn.textContent = 'Read More';

    let isContentExpanded = false;

    readMoreBtn.addEventListener('click', () => {
        isContentExpanded = !isContentExpanded;

        if (isContentExpanded) {
            contentParagraph.textContent = entry.content; // Show full content
            readMoreBtn.textContent = 'Read Less';
        } else {
            contentParagraph.textContent = entry.content.substring(0, 150); // Displaying only the first 150 characters
            readMoreBtn.textContent = 'Read More';
        }
    });

    // Add tag_name as a badge
    const tagLabel = document.createElement('span');
    tagLabel.classList.add('badge', 'bg-primary', 'rounded-pill');
    tagLabel.textContent = entry.tag_name;
    cardContent.appendChild(tagLabel);

    cardContent.appendChild(contentParagraph);
    cardContent.appendChild(readMoreBtn);

    const cardAuthor = document.createElement('p');
    cardAuthor.classList.add('card-text', 'text-muted');
    cardAuthor.textContent = `${entry.author_data.full_name}, ${entry.author_data.job_title} | ${entry.author_data.read_time} | ${entry.author_data.date}`;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardContent);
    cardBody.appendChild(cardAuthor);

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
        "id": "636e180d-c6dd-4eda-ae63-6c37f4de0f3a",
        "img_link": "Assets/templet-content.webp",
        "tag_name": "technology",
        "author_data": {
            "full_name": "Jennifer Weber",
            "job_title": "Amenity horticulturist",
            "read_time": "34 minutes",
            "date": "2024-01-02"
        },
        "title": "Or report reflect wrong old politics director.",
        "content": "Mouth bank only different represent. Possible senior well often.\nPolicy name after maybe dinner science. Remain experience ability put over energy. Sign religious science.\nTreatment green woman whom campaign fight imagine. Paper six voice clear.\nCollection address measure behavior opportunity. Own leader commercial seat.\nUs bad price. Crime piece grow if research senior. Far perform hour among weight its beyond. Listen born Congress out vote development worry.\nScene argue seat set successful fill.\nShould ask defense who find.\nServe pay wonder loss. Beautiful interest many house trip. Election range theory arrive.\nDiscover draw husband relationship family. What health stand experience gas artist. Various whom other red simple product else ahead.\nState until serve however main provide fall. Yes quite worry job. Option dream large conference line best.\nConsider or medical man cultural. Wide store who actually politics. Marriage citizen rock to provide century kitchen."
    },
    {
        "id": "4759f30a-7307-4308-80b3-fb3911d74159",
        "img_link": "https://picsum.photos/307/354",
        "tag_name": "idea",
        "author_data": {
            "full_name": "Daniel Marshall",
            "job_title": "Accountant, chartered",
            "read_time": "29 minutes",
            "date": "2024-01-02"
        },
        "title": "Data election own up.",
        "content": "Turn allow forget especially economy. Billion meet blood example church car rest. Policy choice natural bit.\nSix live important rise toward politics. All girl head Mr reality manage. Us finally range easy.\nDog recently east season. Sometimes and our hotel whether hotel local toward. Sit price rock. Kind lawyer now activity.\nSuch social place catch sign deal model pass. Important culture weight rule behind site control. Special inside rule various morning rich spring.\nKeep eat hard two feel fish best. Claim range bag or establish itself lose. Might beat feeling brother quite.\nBeat class food land beyond fly oil. Really must toward place majority baby support child.\nPlan now tonight occur hour. Soldier scientist firm eight toward write sea. Morning story back those card fight hope. Such theory general process town.\nTheir source car garden. Time third condition would home build sport. Others whatever full figure."
    },
    {
        "id": "672b2a78-d50a-48c5-850e-c6d1248c0c7c",
        "img_link": "https://dummyimage.com/196x462",
        "tag_name": "culture",
        "author_data": {
            "full_name": "Nancy Sanchez",
            "job_title": "Advertising account executive",
            "read_time": "57 minutes",
            "date": "2024-01-01"
        },
        "title": "Box resource source but those seek not.",
        "content": "Brother name who condition citizen. Room list case already situation assume. Really seek within lay picture represent officer.\nSerious most spring film well moment a. Order almost nor page political cause. Difficult majority model notice quality.\nOthers occur activity learn entire series. Wear before economic safe national.\nPage hundred information either ago test.\nShake today box alone rather. Me whole capital.\nRock fund group home admit something blue. Response couple keep partner local still produce last.\nWhat add send position debate newspaper. Itself expect in born only.\nRoom trouble for of memory. High cause need now establish report space.\nComputer break even prove. Enjoy entire record beautiful entire stage boy coach.\nAmount institution base must manage. Begin chair smile forget.\nBuy cold wrong environment no purpose usually. Who most a fund model young country.\nTrouble person involve history leave receive. Cup also nation position."
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
        index != 0 ? card.classList.add('card', 'col-md-6','dark-mode') :
        card.classList.add('card', 'col-md-12' ,'dark-mode');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body','dark-mode');

        const mainBodyDisplayImage = document.createElement('div');
        mainBodyDisplayImage.classList.add('main-body-display-image');
        const img = document.createElement('img');
        img.src = entity.img_link;
        img.alt = '';
        img.addEventListener('click' ,()=>{
            location.href = `article.html?id=${entity.id}`;
        })
        mainBodyDisplayImage.appendChild(img);

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = entity.title;

        const cardContent = document.createElement('p');
        cardContent.classList.add('card-text');
        cardContent.textContent = entity.content;

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer','dark-mode');

        const a1 = document.createElement('span');
        a1.href = '#';
        a1.classList.add('badge');
        a1.classList.add('bg-primary');
        a1.classList.add('rounded-pill');
        a1.classList.add('dark-mode');
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
function createCardInTrendingTopics(cardData) {
    const card = document.createElement('div');
    card.classList.add('col-sm-6', 'col-md-6', 'card','dark-mode');

    // Extract the first 5 words of the content
    const shortContent = getShortContent(cardData.content, 25);

    card.innerHTML = `
        <img src="${cardData.img_link}" alt="" class="card-img-top dark-mode">
        <div class="card-body dark-mode">
            <span class="badge bg-primary rounded-pill">${cardData.tag_name}</span>
            <p class="main-text dark-mode">
                ${cardData.author_data.full_name} | ${cardData.author_data.job_title} | ${cardData.author_data.read_time} read | ${cardData.author_data.date}
            </p>
        </div>
        <div class="card-footer dark-mode">
            <h2>${cardData.title}</h2>
            <p class="content-short dark-mode">${shortContent}</p>
            ${
                cardData.content.length > shortContent.length
                    ? `<button class="btn btn-link rounded-pill learn-more-btn">Learn More</button>`
                    : ''
            }
        </div>
    `;

    cardContainerTwo.appendChild(card);

    const learnMoreBtn = card.querySelector('.learn-more-btn');
    const contentShort = card.querySelector('.content-short');

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            if (contentShort.classList.contains('collapsed')) {
                // Expand the content
                contentShort.textContent = cardData.content;
                contentShort.classList.remove('collapsed');
                learnMoreBtn.textContent = 'Close';
            } else {
                // Collapse the content
                contentShort.textContent = shortContent;
                contentShort.classList.add('collapsed');
                learnMoreBtn.textContent = 'Learn More';
            }
        });
    }

    const imgElement = card.querySelector('.card-img-top');

    imgElement.addEventListener('click', () => {
        const id = cardData.id;
        location.href = `article.html?id=${id}`;
    });
}

// Helper function to get the first n words of a string
function getShortContent(content, numWords) {
    const words = content.split(' ');
    return words.slice(0, numWords).join(' ');
}


// Helper function to get the first n words of a string
function getShortContent(content, numWords) {
    const words = content.split(' ');
    return words.slice(0, numWords).join(' ');
}


function openNewArticlePage(articleId) {
    // Redirect to the new article page, passing the article ID
    window.location.href = 'path/to/new/article/page?id=' + articleId;
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

// font slider
const fontSlider = document.getElementById('sliderFontSize');
const fontSizeLabel = document.getElementById('fontSizeLabel');
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

fontSlider.addEventListener('input', () => {
    const fontSize = getFontSizeFromSliderValue(fontSlider.value);
    document.body.style.fontSize = `${fontSize}px`;
    fontSizeLabel.textContent = sizes[fontSlider.value - 1];
});

function getFontSizeFromSliderValue(sliderValue) {
    const baseSize = 14;
    return baseSize + (sliderValue - 1) * 2;
}

// loading  
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

// dark mode
function toggleDarkMode() {
    const body = document.body;
    const darkModeCheckbox = document.getElementById('darkModeCheckbox');
    if (darkModeCheckbox.checked) {
    body.style.backgroundColor = '#2B2B2B';
    body.style.color = 'white';
    document.querySelectorAll('.dark-mode').forEach(element => {
        element.style.setProperty('background-color', '#2B2B2B', 'important');
        element.style.setProperty('color', 'white', 'important');
    });
    } else {
    body.style.backgroundColor = 'white'; // You can set your default background color here
    body.style.color = 'black'
    document.querySelectorAll('.dark-mode').forEach(element => {
        element.style.setProperty('background-color', 'white', 'important');
        element.style.setProperty('color', '#2B2B2B', 'important');
    });
    
    }
}
