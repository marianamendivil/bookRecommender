function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

// example request
var path = new URLSearchParams(window.location.search);

getAjax("https://www.googleapis.com/books/v1/volumes?q=:" + (path.get('subject')) + "&key=AIzaSyCbZ8Bgts91KrvGCds4KNtf_7rPaT3zhe0", function (data) {
    books = JSON.parse(data)['items'];
    books.forEach(book => {
        var title = book["volumeInfo"]["title"];
        var authors = book["volumeInfo"]["authors"];
        var authorS = "";
        if (authors != null) {
            authors.forEach(author => {
                authorS +=  author + ", ";
            });
        }
        var publisher = book["volumeInfo"]["publisher"];
        var publishedDate = book["volumeInfo"]["publishedDate"];
        var thumbnail = book["volumeInfo"]["imageLinks"]["thumbnail"];
        //var description = book["volumeInfo"]["description"];
        

        var str = "<div class='col-md-4'>";
         str += "<br><div class='mdc-card'><div><img class='center' src="+(thumbnail)+"></div><div class='card_primary'>"+(title)+"</div><div class='card_primary'>"+(authorS)+"</div><div class='card_primary'>"+(publishedDate)+"</div><div class='mdc-card__actions'>"+
        "<div class='mdc-card__action-icons'> <button class='mdc-icon-button mdc-card__action mdc-card__action--icon' aria-pressed='false' aria-label='Add to favorites' title='Add to favorites'>"+
        "<i class='material-icons mdc-icon-button__icon mdc-icon-button__icon--on'>favorite</i><i class='material-icons mdc-icon-button__icon'>favorite_border</i></button>"+
        "<button class='material-icons mdc-icon-button mdc-card_action mdc-card_action--icon' title='Share'>share</button>"+
        "<button class='material-icons mdc-icon-button mdc-card_action mdc-card_action--icon' title='More options'>more_vert</button></div></div></div>";
        // str += "<div class='card'><img class='card-img-top' src='' alt='card image cap' /></div><div class='card-body'><p>"+(title)+"</p><p>"+(publishedDate)+"</p><p>"+(publisher)+"</p><p>"+(authors)+"</p></div>";
        str += "</div>";

        $(document).ready(function () {
            $("#rowbebe").append(str);                       
        });
    });
});