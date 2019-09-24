$(document).ready(function() {

    // Use the CDN or host the script yourself
    // https://cdnjs.cloudflare.com/ajax/libs/instafeed.js/1.4.1/instafeed.min.js
    // https://matthewelsom.com/assets/js/libs/instafeed.min.js

    if ($('.section-social').length) {
        var userFeed = new Instafeed({
            get: 'user',
            userId: '1202870229',
            clientId: '7a6f93d225f649a2af63bde6f3731f97',
            accessToken: '1202870229.7a6f93d.a7bfcf9cd7c04067b8ea0121113b2ec4',
            resolution: 'standard_resolution',
            template: '<a class="box" href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}"/></a>',
            sortBy: 'most-recent',
            limit: 3,
            links: false
        });
        userFeed.run();
    }



    $('.scroll-arrow').click(function() {
        $('html, body').animate({ scrollTop: $('.section-abt').offset().top }, 1200);
        return false;
    });

    if ($('.section-contact').length) {
        $("#contact").submit(function(e) {
            e.preventDefault();
            var $form = $(this);
            $.post($form.attr("action"), $form.serialize()).then(function() {
                //alert("Thank you!");
                //console.log("thank you submit");
            });
        });
    }


    // Home page - slider
    // var owlHome = $('#hmSliderCarousel .owl-carousel');
    // owlHome.owlCarousel({
    //     loop: true,
    //     nav: true,
    //     dots: false,
    //     smartSpeed: 500,
    //     slideTransition: 'linear',
    //     mouseDrag: false,
    //     autoplay: false,
    //     responsive: {
    //         0: {
    //             items: 1,
    //             nav: false,
    //             dots: true
    //         },
    //         481: {
    //             items: 2
    //         }
    //     },
    // });

    // about page - about us
    var owlAbout = $('#abtCarousel .owl-carousel');
    owlAbout.owlCarousel({
        loop: true,
        nav: false,
        smartSpeed: 500,
        slideTransition: 'linear',
        mouseDrag: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
    });

    // about page - Team
    var owlTeam = $('#team .owl-carousel');
    owlTeam.owlCarousel({
        //margin:50,
        dots: false,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        responsive: {
            0: {
                items: 1,
                mouseDrag: true,
                touchDrag: true,
                dots: true,
                nav: false,
            },
            768: {
                items: 2
            },
            1025: {
                items: 3
            }
        }
    });


    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 0;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').addClass('nav-down').removeClass('nav-up');
            }
        }

        lastScrollTop = st;
    }



    //work-detail page slider
    // var $carousel = $('.carousel').flickity({
    //     contain: true,
    //     pageDots: false,
    //     freeScroll: true
    // });

    // var $carousel = $('.carousel').flickity();

    // $carousel.on('staticClick.flickity ', function(event, pointer, cellElement, cellIndex) {
    //     if (typeof cellIndex == 'number') {
    //         $carousel.flickity('selectCell', cellIndex);
    //     }
    // });



});


// Home page scorll effects for header
$(window).scroll(function() {
    if ($('.home-pg').length) {
        var scroll = $(window).scrollTop();
        //>=, not <=
        if (scroll == 0) {
            //clearHeader, not clearheader - caps H
            $("header").addClass("darkHeader").fadeIn(500);
        } else {
            $("header").removeClass("darkHeader").fadeOut(100);
        }
    }
});


// Home Slider Project  JSON Function
function HomeSlider() {
    var homeProjectURL = "https://api.sheetson.com/v1/sheets/TattvaProjects?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"

    $.getJSON(homeProjectURL, function(data) {
        var results = data.results;

        var output = ""; 

        results.forEach(function (result) { 
            //console.log(result);
            if(result.status == 'show')
            {
                output += `<a class="item" href="work-detail?title=`+result.title.replace(/\s+/g, '-')+`&id=`+result.id+`&rowIndex=`+result.rowIndex+`">
                <img src="`+result.homeimg+`" alt="">
                <div class="content" style="`+result.styles+`">
                    <h2>`+result.title+`</h2>
                    <div class="hide">
                        <p>`+result.desc+`</p>
                    </div>
                </div>
                </a>`;
            }
        });

        $("#HomeSlider").append(output);
        // $("#projectListing").append('</div>');

    }).done(function() {

        setTimeout(function() {
            // Home page - slider
            var owlHome = $('#hmSliderCarousel .owl-carousel');
            owlHome.owlCarousel({
                loop: true,
                nav: true,
                dots: false,
                smartSpeed: 500,
                slideTransition: 'linear',
                mouseDrag: false,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        dots: true
                    },
                    481: {
                        items: 2
                    }
                },
            });

        }, 500);
        
    });
}



// Project Listing JSON Function
function projectListing() {
    var projectURL = "https://api.sheetson.com/v1/sheets/TattvaProjects?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"

    $.getJSON(projectURL, function(data) {
        var results = data.results;

        // $("#projectListing").html('<div class="filter-box">');
        var output = "";

        results.forEach(function(result) {
            // console.log(result);
            if (result.status == 'show') {
                output += `<div class="item" data-category="` + result.category + `">
<a class="link" data-id="` + result.id + `" data-rowIndex="` + result.rowIndex + `" href="work-detail?` + result.title.replace(/\s+/g, '-') + `&rowIndex=` + result.rowIndex + `">
<div class="desc">
<img src="` + result.img + `" alt="">
</div>
<div class="content" style="` + result.styles + `">
<h2>` + result.title + `</h2>
<div class="hide">
<p>` + result.desc + `</p>
</div>
</div>
</a>
</div>`;
            }
            // $('a.link').on('click',function(){
            //     projectDetail(getParameterByName('rowIndex'));
            //     // rowIndex
            //     //localStorage.setItem('prodId', $(this).attr('data-rowIndex'))
            // });
        });


        $("#projectListing").append(output);
        // $("#projectListing").append('</div>');

    }).done(function() {
        // console.log(123);
        // document.onreadystatechange = function() {
        // if (document.readyState === 'complete') {
        setTimeout(function() {
            masonryEffect();
            $('.loading').fadeOut(500, '', function() {
                $('.loading').remove();
            });
        }, 1000);

        $(".filter-box").addClass("all");
        $(".filter-nav li").click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this).attr("data-filter") != "all") {
                $(".filter-box").removeClass("all");
                $(".item." + $(this).attr("data-filter")).show().siblings(":not(.item." + $(this).attr('data-filter') + ")").hide();
                $(":not(.item." + $(this).attr('data-filter') + ")").css({ "left": "" });
                //console.log("click");
            } else {
                $(".filter-box").addClass("all");
                $(".item").show();
            }
            masonryEffect();
        });
        // }
        // }

    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}


// Project Detail (Artboard) JSON Function
function projectDetail(rowIndex) {
    var artboardURL = "https://api.sheetson.com/v1/sheets/TattvaArtboard/" + parseInt(rowIndex) + "?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
    // console.log(artboardURL);

    $.getJSON(artboardURL, function(data) {

        //console.log(data);

        var results = data.results;

        $("#projectDetail").html('<ul class="work-wrap scroll carousel">');
        var output = "";
        //console.log(data);
        // data.forEach(function (result) { 
        //  console.log('resultgghh',data);

        var keyList = [
            undefined,
            'rowIndex',
            'id',
            'title',
            'metaTitle',
            'metaDescription',
            'metaImage',
        ],meta;

        for (var key in data) {
            if (!keyList.includes(key)) {
                //console.log(key);
                var value = data[key];
                var contVal = '',
                    eleVal = '',
                    styleArr, innerStyles = '';
                // console.log(value.indexOf('@#$'));
                // console.log(value.indexOf('@#$'));
                value.indexOf('@#$') > -1 ?
                    (
                        contVal = value.split('@#$'),
                        eleVal = contVal[0],
                        innerStyles = contVal[1]
                    ) : eleVal = value;
                // console.log(contVal[0]);
                output += "<li class='col' style='" + innerStyles + "'>" + eleVal + "</li>";

            }
            // console.log(data['metaTitle'] !== '' || data['metaDescription'] !== '' || data['metaImage'] !== '');
            (data['metaTitle'] !== '' || data['metaDescription'] !== '' || data['metaImage'] !== '') ?
            (
                meta = `
                    <title>`+data['metaTitle']+`</title>
                    <meta name="title" content="`+data['metaTitle']+`">
                    <meta name="description" content="`+data['metaDescription']+`">


                    <meta property="og:type" content="website">
                    <meta property="og:url" content="`+window.location.href+`">
                    <meta property="og:title" content="`+data['metaTitle']+`">
                    <meta property="og:description" content="`+data['metaDescription']+`">
                    <meta property="og:image" content="`+data['metaImage']+`">


                    <meta property="twitter:card" content="summary_large_image">
                    <meta property="twitter:url" content="`+window.location.href+`">
                    <meta property="twitter:title" content="`+data['metaTitle']+`">
                    <meta property="twitter:description" content="`+data['metaDescription']+`">
                    <meta property="twitter:image" content="`+data['metaImage']+`">
                `
            ) : 
            (
                meta = `
                    <title>Tattva Design</title>
                    <meta name="title" content="Tattva Design">
                    <meta name="description" content="As an art led graphic design studio, we are a comprehensive creative resource for branding, art & creative and space design projects. Our work across platforms and media is informed by art, science, consumer and cultural insights, and a uniquely classical foundation. Whether turnkey or component, we are focused on compelling consumer experiences. Be it branding, creative & art direction, digital or space – trust us to deliver the iconic.">


                    <meta property="og:type" content="website">
                    <meta property="og:url" content="https://metatags.io/">
                    <meta property="og:title" content="Tattva Design">
                    <meta property="og:description" content="As an art led graphic design studio, we are a comprehensive creative resource for branding, art & creative and space design projects. Our work across platforms and media is informed by art, science, consumer and cultural insights, and a uniquely classical foundation. Whether turnkey or component, we are focused on compelling consumer experiences. Be it branding, creative & art direction, digital or space – trust us to deliver the iconic.">
                    <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">


                    <meta property="twitter:card" content="summary_large_image">
                    <meta property="twitter:url" content="https://metatags.io/">
                    <meta property="twitter:title" content="Tattva Design">
                    <meta property="twitter:description" content="As an art led graphic design studio, we are a comprehensive creative resource for branding, art & creative and space design projects. Our work across platforms and media is informed by art, science, consumer and cultural insights, and a uniquely classical foundation. Whether turnkey or component, we are focused on compelling consumer experiences. Be it branding, creative & art direction, digital or space – trust us to deliver the iconic.">
                    <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">
                `
            );
            $('head').append(meta);
        }
        // });

        $("#projectDetail ul").append(output);
        $("#projectDetail ul").append('</ul>');

        //if ($(window).width() > 990) {
            setTimeout(function() {
                
                if ($(window).width() > 990) {
                    //work-detail page slider
                    var $carousel = $('.carousel').flickity({
                        contain: true,
                        pageDots: false,
                        freeScroll: true
                    });

                    var $carousel = $('.carousel').flickity();

                    $carousel.on('staticClick.flickity ', function(event, pointer, cellElement, cellIndex) {
                        if (typeof cellIndex == 'number') {
                            $carousel.flickity('selectCell', cellIndex);
                        }
                    });
                }
                $('.loading').fadeOut(300, '', function() {
                    $('.loading').remove();
                });
                // $('a.nextProject').on('click',function(){
                //     projectDetail(getParameterByName('rowIndex'));
                //     //localStorage.setItem('prodId', $(this).attr('data-rowIndex'))
                // });
                setTimeout(function() {
                    $('body').append('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d847d43ac9d7f9b"></script>');
                }, 900);
            }, 1000);
        //}
    });

}


$(document).ready(function() {
    var href = location.href.split("/").slice(-1);
    var href1 = href[0].split('?');

    if (href1[0] == 'work-detail') {
        projectDetail(getParameterByName('rowIndex'));
    }
});



$(window).on('load', function() {

    // Home page
    if($(".section-slider").length){
        HomeSlider();
    } 

    // Project Listing page
    if ($("#projectListing").length) {
        projectListing();
    }

});


// work page masonry filters
$(window).on('load', function() {});


$(window).resize(function() {
    if ($('.section-workshow').length) {
        clearTimeout(grabWinWidth);
        grabWinWidth = setTimeout(resizedWin, 100);
    }

});

function resizedWin() {
    if ($('.section-workshow').length) {
        masonryEffect();
    }
}

// work page masonry effects
function masonryEffect() {
    if ($('.section-workshow').length) {
        var maxAvailWidth = 0;
        // var boxWidth = 600;
        var boxWidth;
        var maxBoxWidth = boxWidth;
        var minBoxWidth = maxBoxWidth / 2;
        var width = 0;
        var height = 0;
        var dataRowNum = 1;
        var winWidth = 0;

        winWidth = $(window).width();
        //$(".flexItemContent, .flexBoxWrapper, .flexBox").removeAttr("style");
        $(".flexItemContent, .filter-body, .filter-box").removeAttr("style");

        $(".item:visible").each(function(i) {
            if (winWidth > 1024) {
                //console.log(winWidth,'winWidth');
                maxBoxWidth = parseInt($(this).find(".flexItemContent").width());
                maxAvailWidth = parseInt($(".filter-box").css("max-width"));
                //console.log(maxAvailWidth,'maxAvailWidth');
                $(".filter-box").css("max-width", maxAvailWidth + "px");
                //console.log('1');
            } else if (winWidth <= 1024 && winWidth > 640) {
                maxAvailWidth = winWidth - 0;
                //maxAvailWidth = 600;
                maxBoxWidth = maxAvailWidth / 2;
                console.log(maxBoxWidth);
                $(".filter-box").css("max-width", maxAvailWidth + "px");
                //console.log('2');
            } else {
                maxAvailWidth = winWidth - 0;
                maxBoxWidth = winWidth - 0;
                $(".filter-box").css("max-width", maxAvailWidth + "px");
                //console.log('3');
            }


            if (width < maxAvailWidth) {
                if (i > 0) {
                    width += $(this).prevAll(".item:visible").outerWidth(true) - 10;
                } else {
                    width = 0;
                }
                if ((width + $(this).width()) > maxAvailWidth) {
                    width = 0;
                    if (winWidth > 640) {
                        height += $(this).outerHeight(true) - 5;
                    } else {
                        height += $(this).prev().outerHeight(true) - 10;
                    }
                    dataRowNum++;
                }
                //console.log(winWidth,'width');
                //$(".item[data-row="+dataRowNum+"]").eq(0).addClass("RowLine");
                $(this).css({ "left": width + "px", "top": height + "px" });
                $(this).attr("data-row", dataRowNum);
            }
        }).promise().done(function() {
            if (winWidth > 640) {
                $(".filter-body").css("height", height + $(".item:visible").outerHeight(true) + "px");
            } else {
                $(".filter-body").css("height", height + $(".item:visible:last").outerHeight(true) + "px");
            }
        });
    }

}




//# sourceMappingURL=main.js.map