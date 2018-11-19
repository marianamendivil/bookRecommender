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
        var description = book["volumeInfo"]["description"];

        var str = "<div class='col-md-4'>";
        str += "<div class='card'><img class='card-img-top' src='' alt='card image cap' /></div><div class='card-body'><p>"+(title)+"</p><p>"+(publishedDate)+"</p><p>"+(publisher)+"</p><p>"+(description)+"</p><p>"+(authors)+"</p></div>";
        str += "</div>";
        document.getElementById("rowbebe").innerHTML = str;
        // document.getElementByClass('card-body').innerHTML(`${}`);
        //console.log(path.get('subject'))
    });
});