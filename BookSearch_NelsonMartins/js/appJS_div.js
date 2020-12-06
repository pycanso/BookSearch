
function findBooks() {
    var search = document.getElementById("books").value;
    if (search == "") {
        alert("Please enter something in the field");
    }
    else {
        var result = document.getElementById('result');
        var url = "";
        var img = "";
        var title = "";
        var author = "";
        var readmore = "";
        var breakLn = "";

        //httpGet("https://www.googleapis.com/books/v1/volumes?q=" + search);
        httpGetAsync("https://www.googleapis.com/books/v1/volumes?q=" + search, volumeInfo);

        function volumeInfo(responseJSON) {
            response = JSON.parse(responseJSON);
            
            for (i = 0; i < response.items.length; i++) {
                divLivro = document.createElement('div');
                divLivro.id = 'book'+i;
                title = document.createElement('h5');
                divLivro.appendChild(title);
                title.outerHTML = '<h5 class="center-align white-text">' + response.items[i].volumeInfo.title + '</h5>';
                author = document.createElement('h5');
                divLivro.appendChild(author);
                author.outerHTML = '<h5 class="center-align white-text"> By:' + response.items[i].volumeInfo.authors + '</h5>';
                img = document.createElement('img');
                divLivro.appendChild(img);
                url = response.items[i].volumeInfo.imageLinks.thumbnail;
                img.setAttribute('src', url);
                breakLn = document.createElement('br');
                divLivro.appendChild(breakLn);
                breakLn = document.createElement('br');
                divLivro.appendChild(breakLn);
                readmore = document.createElement('a');
                divLivro.appendChild(readmore);
                readmore.outerHTML = '<a href=' + response.items[i].volumeInfo.infoLink + ' target="_blank"><button id="imagebutton" class="btn red">Read More</button></a>';
                
                btFav = document.createElement('button');
                divLivro.appendChild(btFav);
                btFav.outerHTML = '<button id="btnFav" class="btn red">Favoritos</button>'; //onclick="mostrarid(' + 'book' + i +')"
                result.appendChild(divLivro);
            }
            console.log(result.outerHTML);
        }
    }
    setTimeout(() => {
        sair();
    }, 300000);
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous request
    xmlHttp.send(null);
}
