function projectDetail(){$.getJSON("https://api.sheetson.com/v1/sheets/TattvaArtboard?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw",function(i){console.log(i);var l=i.results;$("#projectDetail").html('<ul class="work-wrap scroll carousel">');var s="";l.forEach(function(i){s+="<li class='col'>",s+="<div class='inner-col'>",s+="<h2>"+i.title+"</h2>",s+="<p>"+i.desc+"</p>",s+="</div>",s+="</li>",s+="<li class='col'><img src = '"+i.p1+"'/></li>",s+="<li class='col'><img src = '"+i.p2+"'/></li>",s+="<li class='col'><img src = '"+i.p3+"'/></li>",s+="<li class='col'><img src = '"+i.p4+"'/></li>",s+="<li class='col'><img src = '"+i.p5+"'/></li>",s+="<li class='col'><img src = '"+i.p6+"'/></li>",s+="<li class='col'><img src = '"+i.p7+"'/></li>",s+="<li class='col'><img src = '"+i.p8+"'/></li>",s+="<li class='col'><img src = '"+i.p9+"'/></li>",s+="<li class='col'><img src = '"+i.p10+"'/></li>",s+="<li class='col'><img src = '"+i.p11+"'/></li>",s+="<li class='col'><img src = '"+i.p12+"'/></li>",s+="<li class='col'><img src = '"+i.p13+"'/></li>",s+="<li class='col'><img src = '"+i.p14+"'/></li>",s+="<li class='col'><img src = '"+i.p15+"'/></li>",s+="<li class='col'><img src = '"+i.p16+"'/></li>",s+="<li class='col'><img src = '"+i.p17+"'/></li>",s+="<li class='col'><img src = '"+i.p18+"'/></li>",s+="<li class='col'><img src = '"+i.p19+"'/></li>",s+="<li class='col'><img src = '"+i.p20+"'/></li>",s+="<li class='col'><img src = '"+i.p21+"'/></li>",s+="<li class='col'><img src = '"+i.p22+"'/></li>",s+="<li class='col'><img src = '"+i.p23+"'/></li>",s+="<li class='col'><img src = '"+i.p24+"'/></li>",s+="<li class='col'><img src = '"+i.p25+"'/></li>",s+="<li class='col'><img src = '"+i.p26+"'/></li>",s+="<li class='col'><img src = '"+i.p27+"'/></li>",s+="<li class='col'><img src = '"+i.p28+"'/></li>",s+="<li class='col'><img src = '"+i.p29+"'/></li>"}),$("#projectDetail ul").append(s),$("#projectDetail ul").append("</ul>"),990<$(window).width()&&setTimeout(function(){var e=$(".carousel").flickity({contain:!0,pageDots:!1,freeScroll:!0});(e=$(".carousel").flickity()).on("staticClick.flickity ",function(i,l,s,t){"number"==typeof t&&e.flickity("selectCell",t)})},500)})}function team(){$.getJSON("https://api.sheetson.com/v1/sheets/tattvaTeam?spreadsheetId=1mPC7qLKZqR_Zgz-8G4z8LiEMw43gyk5YjcbNQWsaZFQ",function(i){console.log(i);var l=i.results;$("#team").html('<div class="owl-carousel owl-theme">');var s="";l.forEach(function(i){s+="<div class='item'>",s+="<div class='inner-col'>",s+="<div class='img'><img src = '"+i.img+"'/></div>",s+="<div class='desc'>",s+="<h4>"+i.name+"</h4>",s+="<span>"+i.designation+"</span>",s+="<p>"+i.p1+"</p>",s+="<p>"+i.p2+"</p>",s+="<ul class='social'>",s+="<li><a href = '"+i.link1+"'></a></li>",s+="<li><a href = '"+i.link2+"'></a></li>",s+="<li><a href = '"+i.link3+"'></a></li>",s+="<li><a href = '"+i.link4+"'></a></li>",s+="</ul>",s+="</div>",s+="</div>",s+="</div>"}),$("#team div").append(s),$("#team div").append("</div>"),setTimeout(function(){$("#team .owl-carousel").owlCarousel({nav:!0,mouseDrag:!1,touchDrag:!1,responsive:{0:{items:1,mouseDrag:!0,touchDrag:!0},768:{items:2},1025:{items:3}}})},500)})}function masonryEffect(){if($(".section-workshow").length){var l,s=0,t=0,e=0,a=1;l=$(window).width(),$(".flexItemContent, .filter-body, .filter-box").removeAttr("style"),$(".item:visible").each(function(i){1024<l?(parseInt($(this).find(".flexItemContent").width()),s=parseInt($(".filter-box").css("max-width"))):l<=1024&&640<l?(s=l-50)/2:s=l-20,$(".filter-box").css("max-width",s+"px"),t<s&&(0<i?t+=$(this).prevAll(".item:visible").outerWidth(!0):t=0,t+$(this).width()>s&&(t=0,e+=640<l?$(this).outerHeight(!0):$(this).prev().outerHeight(!0),a++),$(this).css({left:t+"px",top:e+"px"}),$(this).attr("data-row",a))}).promise().done(function(){640<l?$(".filter-body").css("height",e+$(".item:visible").outerHeight(!0)+"px"):$(".filter-body").css("height",e+$(".item:visible:last").outerHeight(!0)+"px")})}}$(document).ready(function(){var l;$(".scroll-arrow").click(function(){return $("html, body").animate({scrollTop:$(".section-abt").offset().top},1200),!1}),$("#contact").submit(function(i){i.preventDefault();var l=$(this);$.post(l.attr("action"),l.serialize()).then(function(){})}),$("#hmSliderCarousel .owl-carousel").owlCarousel({loop:!0,nav:!0,dots:!1,smartSpeed:500,slideTransition:"linear",mouseDrag:!1,autoplay:!1,responsive:{0:{items:1},481:{items:2}}}),$("#abtCarousel .owl-carousel").owlCarousel({loop:!0,nav:!1,smartSpeed:500,slideTransition:"linear",mouseDrag:!1,autoplay:!0,responsive:{0:{items:1},600:{items:1},1000:{items:1}}});var s=0,t=0,e=$("header").outerHeight();$(window).scroll(function(i){l=!0}),setInterval(function(){l&&(!function(){var i=$(this).scrollTop();Math.abs(s-i)<=t||(s<i&&e<i?$("header").removeClass("nav-down").addClass("nav-up"):i+$(window).height()<$(document).height()&&$("header").addClass("nav-down").removeClass("nav-up"),s=i)}(),l=!1)},250)}),$(window).scroll(function(){$(".home-pg").length&&(0==$(window).scrollTop()?$("header").addClass("darkHeader").fadeIn(500):$("header").removeClass("darkHeader").fadeOut(100))}),$(window).on("load",function(){projectDetail(),team()}),$(window).on("load",function(){$(".section-workshow").length&&(masonryEffect(),$(".filter-box").addClass("all"),$(".filter-nav li").click(function(){$(this).addClass("active").siblings().removeClass("active"),"all"!=$(this).attr("data-filter")?($(".filter-box").removeClass("all"),$(".item."+$(this).attr("data-filter")).show().siblings(":not(.item."+$(this).attr("data-filter")+")").hide(),$(":not(.item."+$(this).attr("data-filter")+")").css({left:""})):($(".filter-box").addClass("all"),$(".item").show()),masonryEffect()}))});