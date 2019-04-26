window.onload = addBookmarks();

document.querySelector('#bookmarks-form').addEventListener('submit', (e) => {
    let siteName = document.querySelector('#siteName').value;
    let siteUrl = document.querySelector('#siteUrl').value;

    if (!validation(siteName, siteUrl)) {
        return false;
    }

    const bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    document.querySelector('#bookmarks-form').reset();
    addBookmarks();
    e.preventDefault();
})

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    addBookmarks();
}

function addBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarkReady = document.querySelector('#bookmarkReady');

    bookmarkReady.innerHTML = '';

    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarkReady.innerHTML +=
            `<div class="bookmark">
                <h3>${name}</h3>
                <a class="btn open" target="_blank" href="${addhttp(url)}">open</a>
                <a class="btn delete" onclick="deleteBookmark('${url}')" href="#">delete</a>
            </div>`
    }
}

function validation(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}


function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}