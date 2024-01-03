// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Get the title from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const blogTitle = urlParams.get('title');

    if (blogTitle) {
        // Fetch your JSON data
        fetch('path/to/your/data.json')
            .then(response => response.json())
            .then(data => {
                // Find the blog with the matching title
                const blog = data.find(blog => blog.title === blogTitle);

                if (blog) {
                    // Update the content based on the found blog
                    updateContent(blog);
                } else {
                    console.error('Blog not found');
                }
            })
            .catch(error => {
                console.error('Error fetching JSON data:', error);
            });
    } else {
        console.error('Title not provided in the URL');
    }
});

function updateContent(blog) {
    // Update main article content
    const articleTitleElement = document.getElementById('articleTitle');
    const authorImageElement = document.getElementById('authorImage');
    const tagNameElement = document.getElementById('tagName');
    const authorNameElement = document.getElementById('authorName');
    const jobTitleElement = document.getElementById('jobTitle');
    const readTimeElement = document.getElementById('readTime');
    const dateElement = document.getElementById('date');
    const articleHeadingElement = document.getElementById('articleHeading');
    const articleTextElement = document.getElementById('articleText');
    
    if (articleTitleElement && authorImageElement && tagNameElement && authorNameElement &&
        jobTitleElement && readTimeElement && dateElement && articleHeadingElement && articleTextElement) {
        
        articleTitleElement.textContent = blog.title;
        authorImageElement.src = blog.img_link;
        tagNameElement.textContent = blog.tag_name;
        authorNameElement.textContent = blog.author_data.full_name;
        jobTitleElement.textContent = blog.author_data.job_title;
        readTimeElement.textContent = blog.author_data.read_time;
        dateElement.textContent = blog.author_data.date;
        articleHeadingElement.textContent = blog.title;
        articleTextElement.textContent = blog.content;

        // Update related posts
        const relatedPostsRow = document.getElementById('relatedPostsRow');
        // Assuming there's an array of related posts in your JSON data
        const relatedPosts = blog.related_posts || [];

        relatedPosts.forEach(post => {
            const postColumn = document.createElement('div');
            postColumn.className = 'col-sm-3';
            postColumn.innerHTML = `
                <div class="card sub-body">
                    <div class="sub-body-main-image">
                        <img src="${post.img_link}" alt="" class="img-fluid">
                    </div>
                    <div class="card-body">
                        <div>
                            <a href="" class="main-btn">${post.tag_name}</a>
                            <p class="main-text">${post.author_data.full_name} | ${post.author_data.job_title} | ${post.author_data.read_time} | ${post.author_data.date}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div>
                            <h2>${post.title}</h2>
                            <p>${post.content}</p>
                        </div>
                    </div>
                </div>
            `;
            relatedPostsRow.appendChild(postColumn);
        });
    } else {
        console.error('One or more elements not found');
    }
}
