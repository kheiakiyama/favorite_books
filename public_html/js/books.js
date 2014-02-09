$(document).ready(function () {
    $.ajax("js/books.json", {
        type: "get",
        dataType: "json",
        success: function (response) {
            $.each(response.contents, function (index, item) {
                var container = $("<span />");
                var link = $('<a href="' + item.Content.url + '"/>');
                var img = $('<img src="' + item.Content.url + '" />');
                if (1 === Math.floor( Math.random() * 3 )) {
                    //link.addClass("row");
                    container.addClass("col-md-4");
                    var img_container = $("<span />");
                    img_container.addClass("col-md-6");
                    img_container.append(img);
                    link.append(img_container);
                    var text = $('<span />');
                    text.html(item.Content.title);
                    var text_container = $("<span />");
                    text_container.addClass("col-md-6");
                    text_container.append(text);
                    link.append(text_container);
                } else {
                    container.addClass("col-md-2");
                    link.append(img);
                }
                container.append(link);
                $("#container").append(container);
            });
            ;
        }
    });
    
});