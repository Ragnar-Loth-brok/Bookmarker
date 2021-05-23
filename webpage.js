//Listen for form submit

document.querySelector('#my-form').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    e.preventDefault();

    //get form values

    var siteName = document.querySelector('#sitename').value.trim();
    var siteUrl = document.querySelector('#siteurl').value.trim();

    var sName = document.querySelector('#sitename');
    var sUrl = document.querySelector('#siteurl');

    if(!siteName || !siteUrl){
        // alert('Please fill in all fields');
        sName.setAttribute('class', 'danger');
        sUrl.setAttribute('class', 'danger');

        sName.setAttribute('placeholder', 'Invalid Website Name');
        sUrl.setAttribute('placeholder', 'Invalid Website URL');
        return false;
    }else{
        sName.setAttribute('class', '');
        sUrl.setAttribute('class', '');

        sName.setAttribute('placeholder', 'Website Name');
        sUrl.setAttribute('placeholder', 'Website URL');

        // console.log('repeat');
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        // alert('Please use a valid URL');
        sUrl.setAttribute('class', 'danger');
        sUrl.setAttribute('placeholder', 'Invalid Website URL');
        sUrl.value = '';

        return false;
    }else{
        sUrl.setAttribute('class', '');
        sUrl.setAttribute('placeholder', 'Website URL');

    }

    var bookMark = {
        name: siteName,
        url: siteUrl
    }
    

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('my-form').reset();

    fetchBookmarks();

}

function fetchBookmarks(){

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var addedBookmarks = document.querySelector('.added-bookmarkers');

    addedBookmarks.innerHTML = `<span></span>
    <span></span>
    <span></span>`;

    bookmarks.forEach( eachOne =>{
        var name = eachOne.name;
        var url = eachOne.url;
        //  console.log(name, url);
        addedBookmarks.innerHTML += `<div class="info">
            <h4>${name}</h4>
            <a href="${url}" target="_blank" >Visit</a>
            <button class="delete" onclick="deleteBookmark(\``+name+`\`) ">Delete</button>
        </div>`;
    })    
}


function deleteBookmark(name){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.forEach((eachOne, index) =>{
        if(eachOne.name == name){
            bookmarks.splice(index, 1);
        }
    })

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();

}