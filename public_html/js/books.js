$(document).ready(function () {
    var appendContent = function (body, item) {
        var container = $("<span />");
        var inner_container = $('<span class="inner" />');
        var link = $('<a href="' + item.url + '" />');
        var img = $('<img src="' + item.url + '" />');
        if (-1 === Math.floor( Math.random() * 3 )) {
            container.addClass("col-md-6 col-xs-12");
            var img_container = $("<span />");
            img_container.addClass("col-md-6 col-xs-6");
            img_container.append(img);
            link.append(img_container);
            var text = $('<span />');
            text.html(item.title);
            var text_container = $("<span />");
            text_container.addClass("col-md-6 col-xs-6 text");
            text_container.append(text);
            link.append(text_container);
        } else {
            container.addClass("col-md-3 col-xs-6");
            link.append(img);
        }
        if (item.theme) {
            inner_container.addClass(item.theme);
        }
        inner_container.append(link);
        container.append(inner_container);
        body.append(container);
    };
    
    var appendSlideLink = function (body, nowPage, nextPage, clickFunc) {
        var container = $("<span />");
        var link = $('<span class="label label-info"/>');
        link.html(nowPage.name + '<br>');
        link.click(function () { 
            clickFunc();
        });
        container.append(link);
        var img = $('<span class="expandstate" />');
        link.append(img);
        container.addClass("col-md-3 col-xs-6 label");
        body.append(container);
    };
    
    var changeSlide = function (body, slides, slideIndex) {
        var slide = slides[slideIndex];
        if (slide.hasClass("active")) {                
            slide.children(':not(".label")').fadeOut(1000, function () {
                slide.removeClass('active');
            });
        } else {
            slide.addClass('active');
            slide.children(':not(".label")').fadeIn(1000);
        }
    };
    
    var body = $("#container");
    $.ajax("js/books.json", {
        type: "get",
        dataType: "json",
        success: function (response) {
            var slides = [];
            var row = $('<span class="row" />');
            $.each(response.contents, function (index, content) {
                var slide = $('<span class="" />');
                var nextIndex = index < response.contents.length - 1 ? index + 1 : 0;
                var nextPage = response.contents[nextIndex].page;
                appendSlideLink(slide, content.page, nextPage, function () { 
                    changeSlide(body, slides, index);
                });
                $.each(content.slide, function (index2, item) {
                    appendContent(slide, item);
                });
                slides.push(slide);
                row.append(slide);
            });
            body.append(row);
            $.each(slides, function (index, slide) {
                slide.children(':not(".label")').hide();
            });
        }
    });
    
});