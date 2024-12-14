document.addEventListener('DOMContentLoaded', displayBookmarks);
document.getElementById('bookmarkForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    clearErrorMessage();
    const siteNameInput = document.getElementById('siteName');
    const siteUrlInput = document.getElementById('siteUrl');
    const siteName = siteNameInput.value.trim();
    const siteUrl = siteUrlInput.value.trim();
    const validationError = validateInputs(siteName, siteUrl);
    if (validationError) {
        displayErrorMessage(validationError);
        return;
    }
    saveBookmark(siteName, siteUrl);
    resetForm();
    displayBookmarks();
}

function validateInputs(name, url) {
    if (!name || !url) {
        return 'Please fill in the both fields';
    }
    if (!isValidUrl(url)) {
        return 'Please enter a valid URL starting with http:// or https:// and including a domain ending . or . any thing ';
    }

    return null;
}

function isValidUrl(url) {
    const pattern = /^https?:\/\/[^\s/$.?#].[^\s]*\.[^\s]{2,}$/i;
    return pattern.test(url);
}

function saveBookmark(name, url) {
    const bookmarks = getBookmarks();
    bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function getBookmarks() {
    const bookmarksStr = localStorage.getItem('bookmarks');
    return bookmarksStr ? JSON.parse(bookmarksStr) : [];
}

function deleteBookmark(index) {
    const bookmarks = getBookmarks();
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

function displayBookmarks() {
    const bookmarks = getBookmarks();
    const bookmarksList = document.getElementById('bookmarksList');
    bookmarksList.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
        const tr = document.createElement('tr');
        const siteNameTd = document.createElement('td');
        siteNameTd.textContent = bookmark.name;
        const siteUrlTd = document.createElement('td');
        siteUrlTd.textContent = bookmark.url;
        const actionTd = document.createElement('td');
        const visitBtn = document.createElement('a');
        visitBtn.className = 'btn btn-success btn-sm me-2';
        visitBtn.href = bookmark.url;
        visitBtn.target = '_blank';
        visitBtn.textContent = 'Visit';
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteBookmark(index));
        actionTd.appendChild(visitBtn);
        actionTd.appendChild(deleteBtn);
        tr.appendChild(siteNameTd);
        tr.appendChild(siteUrlTd);
        tr.appendChild(actionTd);
        bookmarksList.appendChild(tr);
    });
}

function resetForm() {
    document.getElementById('bookmarkForm').reset();
}


function displayErrorMessage(message) {
    const errorAlert = document.getElementById('errorAlert');
    errorAlert.textContent = message;
    errorAlert.classList.remove('d-none');
}


function clearErrorMessage() {
    const errorAlert = document.getElementById('errorAlert');
    errorAlert.textContent = '';
    errorAlert.classList.add('d-none');
}