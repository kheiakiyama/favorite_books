$(document).ready(function () {
    var appendContent = function (body, item) {
        var container = $("<span />");
        var inner_container = $('<span class="inner" />');
        if (item.read) {
            inner_container.addClass('read');
        }
        var link = $('<a href=http://www.amazon.co.jp/gp/product/' + item.asin + ' target="_blank" />');
        var img = $('<img src="' + item.url + '" />');
        container.addClass("col-md-3 col-sm-4 col-xs-12");
        link.append(img);
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
        container.addClass("col-md-3 col-sm-4 col-xs-12 label");
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