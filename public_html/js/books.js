$(document).ready(function () {
    var appendContent = function (body, item) {
        var container = $("<span />");
        var link = $('<a href="' + item.url + '"/>');
        var img = $('<img src="' + item.url + '" />');
        if (1 === Math.floor( Math.random() * 3 )) {
            //link.addClass("row");
            container.addClass("col-md-4");
            var img_container = $("<span />");
            img_container.addClass("col-md-6");
            img_container.append(img);
            link.append(img_container);
            var text = $('<span />');
            text.html(item.title);
            var text_container = $("<span />");
            text_container.addClass("col-md-6");
            text_container.append(text);
            link.append(text_container);
        } else {
            container.addClass("col-md-2");
            link.append(img);
        }
        container.append(link);
        body.append(container);
    };
    
    var appendSlideLink = function (body, nowPage, nextPage, clickFunc) {
        var container = $("<span />");
        var link = $('<span />');
        link.html("Now: " + nowPage.name + "<br>Next > " + nextPage.name);
        link.click(function () { 
            clickFunc();
        });
        container.append(link);
        container.addClass("col-md-2");
        body.append(container);
    };
    
    var changeSlide = function (body, slides, slideIndex) {
        $.each(slides, function (index, slide) {
            if (index === slideIndex) return;
            slide.hide();
        });
        slides[slideIndex].fadeIn(1500);
    };
    
    var body = $("#container");
    $.ajax("js/books.json", {
        type: "get",
        dataType: "json",
        success: function (response) {
            var slides = [], slideIndex = 0;
            $.each(response.contents, function (index, content) {
                var slide = $('<div class="row" />');
                var nextIndex = index < response.contents.length - 1 ? index + 1 : 0;
                var nextPage = response.contents[nextIndex].page;
                appendSlideLink(slide, content.page, nextPage, function () { 
                    slideIndex++;
                    if (slideIndex >= slides.length)
                        slideIndex = 0;
                    changeSlide(body, slides, slideIndex);
                });
                $.each(content.slide, function (index2, item) {
                    appendContent(slide, item);
                });
                slides.push(slide);
                body.append(slide);
            });
            changeSlide(body, slides, slideIndex);
        }
    });
    
});