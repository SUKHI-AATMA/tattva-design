function contactFormSubmit(){var e=$("#name").val(),l=$("#email").val(),a=$("#phone").val(),s=$("#message").val();return e?($("#name").removeClass("err").siblings("label").removeClass("err-label").html("Your Name"),a?validateNumber(a)?($("#phone").removeClass("err").siblings("label").removeClass("err-label").html("phone number"),$("#phone").removeClass("err").siblings("label").removeClass("err-label").html("Phone Number"),l?validateEmail(l)?($("#email").removeClass("err").siblings("label").removeClass("err-label").html("Email address"),$("#email").removeClass("err").siblings("label").removeClass("err-label").html("Email Number"),s?($("#message").removeClass("err").siblings("label").removeClass("err-label").html("Message"),void alert("thank you")):($("#message").focus().addClass("err").siblings("label").addClass("err-label").html("Message Require* <span>(Fill the message box)</span>"),!1)):($("#email").focus().addClass("err").siblings("label").addClass("err-label").html("Email Address <span>(Fill valid email address)</span>"),!1):($("#email").focus().addClass("err").siblings("label").addClass("err-label").html("Email Address* <span>(Fill the email field)</span>"),!1)):($("#phone").focus().addClass("err").siblings("label").addClass("err-label").html("Phone Number* <span>(Fill valid phone number)</span>"),!1):($("#phone").focus().addClass("err").siblings("label").addClass("err-label").html("Phone Number* <span>(Fill the phone number field)</span>"),!1)):($("#name").focus().addClass("err").siblings("label").addClass("err-label").html("Your Name* <span>(Fill the name field)</span>"),!1)}function validateEmail(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}function validateNumber(e){return/^ *[0-9]+ *$/.test(e)}function masonryEffect(){if($(".section-workshow").length){var l,a=0,s=0,t=0,i=1;l=$(window).width(),$(".flexItemContent, .filter-body, .filter-box").removeAttr("style"),$(".item:visible").each(function(e){1024<l?(parseInt($(this).find(".flexItemContent").width()),a=parseInt($(".filter-box").css("max-width"))):l<=1024&&640<l?(a=l-50)/2:a=l-20,$(".filter-box").css("max-width",a+"px"),s<a&&(0<e?s+=$(this).prevAll(".item:visible").outerWidth(!0)-10:s=0,s+$(this).width()>a&&(s=0,t+=640<l?$(this).outerHeight(!0):$(this).prev().outerHeight(!0),i++),$(this).css({left:s+"px",top:t+"px"}),$(this).attr("data-row",i))}).promise().done(function(){640<l?$(".filter-body").css("height",t+$(".item:visible").outerHeight(!0)+"px"):$(".filter-body").css("height",t+$(".item:visible:last").outerHeight(!0)+"px")})}}$(document).ready(function(){var l;$("#hmSliderCarousel .owl-carousel").owlCarousel({loop:!0,nav:!0,dots:!1,smartSpeed:500,slideTransition:"linear",mouseDrag:!1,autoplay:!1,responsive:{0:{items:1},1000:{items:2}}}),$("#abtCarousel .owl-carousel").owlCarousel({loop:!0,nav:!1,smartSpeed:500,slideTransition:"linear",mouseDrag:!1,autoplay:!0,responsive:{0:{items:1},600:{items:1},1000:{items:1}}}),$("#team .owl-carousel").owlCarousel({nav:!0,mouseDrag:!1,touchDrag:!1,responsive:{0:{items:1,mouseDrag:!0,touchDrag:!0},1000:{items:3}}});var a=0,s=0,t=$("header").outerHeight();$(window).scroll(function(e){l=!0}),setInterval(function(){l&&(!function(){var e=$(this).scrollTop();Math.abs(a-e)<=s||(a<e&&t<e?$("header").removeClass("nav-down").addClass("nav-up"):e+$(window).height()<$(document).height()&&$("header").addClass("nav-down").removeClass("nav-up"),a=e)}(),l=!1)},250);var i=$(".carousel").flickity({contain:!0,pageDots:!1,freeScroll:!0});(i=$(".carousel").flickity()).on("staticClick.flickity ",function(e,l,a,s){"number"==typeof s&&i.flickity("selectCell",s)})}),$(window).scroll(function(){$(".home-pg").length&&(0==$(window).scrollTop()?$("header").addClass("darkHeader").fadeIn(500):$("header").removeClass("darkHeader").fadeOut(100))}),$("#contactSubmit").on("click",function(e){e.preventDefault(),contactFormSubmit()}),$(window).on("load",function(){$(".section-workshow").length&&(masonryEffect(),$(".filter-box").addClass("all"),$(".filter-nav li").click(function(){$(this).addClass("active").siblings().removeClass("active"),"all"!=$(this).attr("data-filter")?($(".filter-box").removeClass("all"),$(".item."+$(this).attr("data-filter")).show().siblings(":not(.item."+$(this).attr("data-filter")+")").hide(),$(":not(.item."+$(this).attr("data-filter")+")").css({left:""})):($(".filter-box").addClass("all"),$(".item").show()),masonryEffect()}))});