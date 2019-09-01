 $(document).ready(function() {

    $('.scroll-arrow').click (function() {
        $('html, body').animate({scrollTop: $('.section-abt').offset().top} , 1200);
        return false;
      });

    $("#contact").submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        $.post($form.attr("action"), $form.serialize()).then(function() {
            //alert("Thank you!");
            //console.log("thank you submit");
        });
    });


    // Home page - slider
    var owlabt = $('#hmSliderCarousel .owl-carousel');
    owlabt.owlCarousel({
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

    // about page - about us
    var owlabt = $('#abtCarousel .owl-carousel');
    owlabt.owlCarousel({
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
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
    });

    // work-detail page slider
    // var $carousel = $('.carousel').flickity({
    //     contain: true,
    //     pageDots: false,
    //     freeScroll: true
    // });

    // var $carousel = $('.carousel').flickity();

    // $carousel.on( 'staticClick.flickity ', function( event, pointer, cellElement, cellIndex ) {
    //     if ( typeof cellIndex == 'number' ) {
    //         $carousel.flickity( 'selectCell', cellIndex );
    //     }
    // });



    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 0;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event){
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
        
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').addClass('nav-down').removeClass('nav-up');
            }
        }
        
        lastScrollTop = st;
    }





});


// Home page scorll effects for header
$(window).scroll(function() {    
    if ($('.home-pg').length) {
        var scroll = $(window).scrollTop();
        //>=, not <=
       if (scroll == 0) {
           //clearHeader, not clearheader - caps H
           $("header").addClass("darkHeader").fadeIn(500);
       } else{
           $("header").removeClass("darkHeader").fadeOut(100);
       }
    }
});


// Project Detail (Artboard) JSON Function
function projectDetail() {
    var artboardURL = "https://api.sheetson.com/v1/sheets/TattvaArtboard?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
    $.getJSON(artboardURL, function(data) {

        console.log(data);

        var results = data.results;

        $("#projectDetail").html('<ul class="work-wrap scroll carousel">');
        var output = "";     

        results.forEach(function (result) { 
            output += "<li class='col'>";
            output +="<div class='inner-col'>";
            output +="<h2>" + result.title + "</h2>";
            output += "<p>" + result.desc + "</p>";
            output+="</div>";
            output += "</li>";  
            output += "<li class='col'><img src = '" + result.p1 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p2 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p3 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p4 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p5 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p6 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p7 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p8 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p9 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p10 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p11 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p12 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p13 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p14 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p15 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p16 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p17 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p18 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p19 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p20 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p21 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p22 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p23 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p24 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p25 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p26 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p27 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p28 + "'/></li>";
            output += "<li class='col'><img src = '" + result.p29 + "'/></li>";                    

        });
        $("#projectDetail ul").append(output);
        $("#projectDetail ul").append('</ul>');

        if($(window).width() > 990){
            setTimeout(function(){
                //work-detail page slider
                var $carousel = $('.carousel').flickity({
                    contain: true,
                    pageDots: false,
                    freeScroll: true
                });

                var $carousel = $('.carousel').flickity();

                $carousel.on( 'staticClick.flickity ', function( event, pointer, cellElement, cellIndex ) {
                    if ( typeof cellIndex == 'number' ) {
                        $carousel.flickity( 'selectCell', cellIndex );
                    }
                });
            },500);
        }
        


    });
}


// Team JSON Function
function team() {
    var teamURL = "https://api.sheetson.com/v1/sheets/tattvaTeam?spreadsheetId=1mPC7qLKZqR_Zgz-8G4z8LiEMw43gyk5YjcbNQWsaZFQ"
    $.getJSON(teamURL, function(data) {

        console.log(data);

        var results = data.results;

        $("#team").html('<div class="owl-carousel owl-theme">');
        var output = "";     

        results.forEach(function (result) { 
            output += "<div class='item'>";
            output += "<div class='inner-col'>";
            output += "<div class='img'><img src = '" + result.img + "'/></div>";
            output += "<div class='desc'>";
            output += "<h4>" + result.name + "</h4>";
            output += "<span>" + result.designation + "</span>";
            output += "<p>" + result.p1 + "</p>";
            output += "<p>" + result.p2 + "</p>";
            output += "<ul class='social'>";
            output += "<li><a href = '" + result.link1 + "'></a></li>"; 
            output += "<li><a href = '" + result.link2 + "'></a></li>"; 
            output += "<li><a href = '" + result.link3 + "'></a></li>"; 
            output += "<li><a href = '" + result.link4 + "'></a></li>"; 
            output += "</ul>";
            output += "</div>";
            output += "</div>";
            output += "</div>"; 
            
        });
        $("#team div").append(output);
        $("#team div").append('</div>');

        
        setTimeout(function(){
            // about page - Team
            var owlTeam = $('#team .owl-carousel');
            owlTeam.owlCarousel({
                //margin:50,
                nav:true,
                mouseDrag:false,
                touchDrag:false,
                responsive:{
                    0:{
                        items:1,        
                        mouseDrag:true,
                        touchDrag:true,
                    },
                    768:{
                        items:2
                    },
                    1025:{
                        items:3
                    }
                }
            });
        },500);


    });
}

$(window).on('load', function() {

    // project json
    projectDetail(); 

    // Team json
    team();

    //checkPosition();
});


// work page masonry filters
$(window).on('load', function() {

    if ($('.section-workshow').length) {
        masonryEffect();
        $(".filter-box").addClass("all");
        $(".filter-nav li").click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this).attr("data-filter") != "all") {
                $(".filter-box").removeClass("all");                
                $(".item." + $(this).attr("data-filter")).show().siblings(":not(.item." + $(this).attr('data-filter') + ")").hide();
                $(":not(.item." + $(this).attr('data-filter') + ")").css({ "left": "" });
            } else {
                $(".filter-box").addClass("all");
                $(".item").show();
            }
            masonryEffect();
        });
    }
});


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


// Use the CDN or host the script yourself
// https://cdnjs.cloudflare.com/ajax/libs/instafeed.js/1.4.1/instafeed.min.js
// https://matthewelsom.com/assets/js/libs/instafeed.min.js

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