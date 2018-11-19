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
        var node = document.createElement("option");
        node.innerHTML = book["volumeInfo"]["title"];
        var authors = book["volumeInfo"]["authors"];
        if (authors != null) {
            authors.forEach(author => {

                node.innerHTML = author;
            });
        }
        node.innerHTML = book["volumeInfo"]["publisher"];
        node.innerHTML = book["volumeInfo"]["publishedDate"];
        node.innerHTML = book["volumeInfo"]["description"];
        document.getElementById('fantasy').appendChild(node);
        console.log(path.get('subject'))
    });
});