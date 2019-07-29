 $(document).ready(function() {

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
                items: 1
            },
            1000: {
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
            1000:{
                items:3
            }
        }
    });



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



    // work-detail page slider
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

 





});





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

// scroll effects for header
// var prevScrollpos = window.pageYOffset;
// //console.log('prev',prevScrollpos);
// window.onscroll = function() {
//     var currentScrollPos = window.pageYOffset;
//     //console.log('current',currentScrollPos);
//     if (prevScrollpos > currentScrollPos) {
//         document.getElementById("header").style.top = "0";
//     } else {
//         document.getElementById("header").style.top = "-92px";
//     }
//     prevScrollpos = currentScrollPos;
// }


// contact-form
$("#contactSubmit").on("click", function(e) {
    e.preventDefault();
    contactFormSubmit();
    //alert('hi');
});


// contact form validation
function contactFormSubmit() {
	var varName = $("#name").val(),
	    varEmail = $("#email").val(),
	    varPhone = $("#phone").val(),
	    varMsg = $("#message").val();

	if (!varName) return $("#name").focus().addClass("err").siblings("label").addClass('err-label').html("Your Name* <span>(Fill the name field)</span>"), !1;

	if ($("#name").removeClass("err").siblings("label").removeClass('err-label').html("Your Name"), !varPhone) return $("#phone").focus().addClass("err").siblings("label").addClass('err-label').html("Phone Number* <span>(Fill the phone number field)</span>"), !1;

	if (!validateNumber(varPhone)) return $("#phone").focus().addClass("err").siblings("label").addClass('err-label').html("Phone Number* <span>(Fill valid phone number)</span>"), !1;
	$("#phone").removeClass("err").siblings("label").removeClass('err-label').html("phone number");

	if ($("#phone").removeClass("err").siblings("label").removeClass('err-label').html("Phone Number"), !varEmail) return $("#email").focus().addClass("err").siblings("label").addClass('err-label').html("Email Address* <span>(Fill the email field)</span>"), !1;
	
	if (!validateEmail(varEmail)) return $("#email").focus().addClass("err").siblings("label").addClass('err-label').html("Email Address <span>(Fill valid email address)</span>"), !1;
    $("#email").removeClass("err").siblings("label").removeClass('err-label').html("Email address");
    

    if ($("#email").removeClass("err").siblings("label").removeClass('err-label').html("Email Number"), !varMsg) return $("#message").focus().addClass("err").siblings("label").addClass('err-label').html("Message Require* <span>(Fill the message box)</span>"), !1;

    if ($("#message").removeClass("err").siblings("label").removeClass('err-label').html("Message"), !1);

	alert('thank you');
}


function validateEmail(e) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
}

function validateNumber(e) {
    return /^ *[0-9]+ *$/.test(e)
}



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
                maxAvailWidth = winWidth - 50;
                //maxAvailWidth = 600;
                maxBoxWidth = maxAvailWidth / 2;
                //console.log(maxBoxWidth);
                $(".filter-box").css("max-width", maxAvailWidth + "px");
                //console.log('2');
            } else {
                maxAvailWidth = winWidth - 20;
                maxBoxWidth = winWidth - 20;
                $(".filter-box").css("max-width", maxAvailWidth + "px");
                //console.log('3');
            }
            
           
            if (width < maxAvailWidth) {
                console.log(width);
                if (i > 0) {
                    width += $(this).prevAll(".item:visible").outerWidth(true) - 10;
                } else {
                    width = 0;
                }
                if ((width + $(this).width()) > maxAvailWidth) {
                    width = 0;
                    if (winWidth > 640) {
                        height += $(this).outerHeight(true);
                    } else {
                        height += $(this).prev().outerHeight(true);
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