function projectDetail(){$.getJSON("https://api.sheetson.com/v1/sheets/TattvaArtboard?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw",function(l){console.log(l);var i=l.results;$("#projectDetail").html('<ul class="work-wrap scroll carousel">');var s="";i.forEach(function(l){s+="<li class='col'>",s+="<div class='inner-col'>",s+="<h2>"+l.title+"</h2>",s+="<p>"+l.desc+"</p>",s+="</div>",s+="</li>",s+="<li class='col'><img src = '"+l.p1+"'/></li>",s+="<li class='col'><img src = '"+l.p2+"'/></li>",s+="<li class='col'><img src = '"+l.p3+"'/></li>",s+="<li class='col'><img src = '"+l.p4+"'/></li>",s+="<li class='col'><img src = '"+l.p5+"'/></li>",s+="<li class='col'><img src = '"+l.p6+"'/></li>",s+="<li class='col'><img src = '"+l.p7+"'/></li>",s+="<li class='col'><img src = '"+l.p8+"'/></li>",s+="<li class='col'><img src = '"+l.p9+"'/></li>",s+="<li class='col'><img src = '"+l.p10+"'/></li>",s+="<li class='col'><img src = '"+l.p11+"'/></li>",s+="<li class='col'><img src = '"+l.p12+"'/></li>",s+="<li class='col'><img src = '"+l.p13+"'/></li>",s+="<li class='col'><img src = '"+l.p14+"'/></li>",s+="<li class='col'><img src = '"+l.p15+"'/></li>",s+="<li class='col'><img src = '"+l.p16+"'/></li>",s+="<li class='col'><img src = '"+l.p17+"'/></li>",s+="<li class='col'><img src = '"+l.p18+"'/></li>",s+="<li class='col'><img src = '"+l.p19+"'/></li>",s+="<li class='col'><img src = '"+l.p20+"'/></li>",s+="<li class='col'><img src = '"+l.p21+"'/></li>",s+="<li class='col'><img src = '"+l.p22+"'/></li>",s+="<li class='col'><img src = '"+l.p23+"'/></li>",s+="<li class='col'><img src = '"+l.p24+"'/></li>",s+="<li class='col'><img src = '"+l.p25+"'/></li>",s+="<li class='col'><img src = '"+l.p26+"'/></li>",s+="<li class='col'><img src = '"+l.p27+"'/></li>",s+="<li class='col'><img src = '"+l.p28+"'/></li>",s+="<li class='col'><img src = '"+l.p29+"'/></li>"}),$("#projectDetail ul").append(s),$("#projectDetail ul").append("</ul>"),setTimeout(function(){var t=$(".carousel").flickity({contain:!0,pageDots:!1,freeScroll:!0});(t=$(".carousel").flickity()).on("staticClick.flickity ",function(l,i,s,e){"number"==typeof e&&t.flickity("selectCell",e)})},500)})}function team(){$.getJSON("https://api.sheetson.com/v1/sheets/tattvaTeam?spreadsheetId=1mPC7qLKZqR_Zgz-8G4z8LiEMw43gyk5YjcbNQWsaZFQ",function(l){console.log(l);var i=l.results;$("#team").html('<div class="owl-carousel owl-theme">');var s="";i.forEach(function(l){s+="<div class='item'>",s+="<div class='inner-col'>",s+="<div class='img'><img src = '"+l.img+"'/></div>",s+="<div class='desc'>",s+="<h4>"+l.name+"</h4>",s+="<span>"+l.designation+"</span>",s+="<p>"+l.p1+"</p>",s+="<p>"+l.p2+"</p>",s+="<ul class='social'>",s+="<li><a href = '"+l.link1+"'></a></li>",s+="<li><a href = '"+l.link2+"'></a></li>",s+="<li><a href = '"+l.link3+"'></a></li>",s+="<li><a href = '"+l.link4+"'></a></li>",s+="</ul>",s+="</div>",s+="</div>",s+="</div>"}),$("#team div").append(s),$("#team div").append("</div>"),setTimeout(function(){$("#team .owl-carousel").owlCarousel({nav:!0,mouseDrag:!1,touchDrag:!1,responsive:{0:{items:1,mouseDrag:!0,touchDrag:!0},1000:{items:3}}})},500)})}function masonryEffect(){if($(".section-workshow").length){var i,s=0,e=0,t=0,a=1;i=$(window).width(),$(".flexItemContent, .filter-body, .filter-box").removeAttr("style"),$(".item:visible").each(function(l){1024<i?(parseInt($(this).find(".flexItemContent").width()),s=parseInt($(".filter-box").css("max-width"))):i<=1024&&640<i?(s=i-50)/2:s=i-20,$(".filter-box").css("max-width",s+"px"),e<s&&(0<l?e+=$(this).prevAll(".item:visible").outerWidth(!0):e=0,e+$(this).width()>s&&(e=0,t+=640<i?$(this).outerHeight(!0):$(this).prev().outerHeight(!0),a++),$(this).css({left:e+"px",top:t+"px"}),$(this).attr("data-row",a))}).promise().done(function(){640<i?$(".filter-body").css("height",t+$(".item:visible").outerHeight(!0)+"px"):$(".filter-body").css("height",t+$(".item:visible:last").outerHeight(!0)+"px")})}}$(document).ready(function(){var i;$(".scroll-arrow").click(function(){return $("html, body").animate({scrollTop:$(".section-abt").offset().top},1200),!1}),$("#contact").submit(function(l){l.preventDefault();var i=$(this);$.post(i.attr("action"),i.serialize()).then(function(){})}),$("#hmSliderCarousel .owl-carousel").owlCarousel({loop:!0,nav:!0,dots:!1,smartSpeed:500,slideTransition:"linear",mouseDrag:!1,autoplay:!1,responsive:{0:{items:1},1000:{items:2}}}),$("#abtCarousel .owl-carousel").owlCarousel({loop:!0,nav:!1,smartSpeed:500,slideTransition:"linear",mouseDrag:!1,autoplay:!0,responsive:{0:{items:1},600:{items:1},1000:{items:1}}});var s=0,e=0,t=$("header").outerHeight();$(window).scroll(function(l){i=!0}),setInterval(function(){i&&(!function(){var l=$(this).scrollTop();Math.abs(s-l)<=e||(s<l&&t<l?$("header").removeClass("nav-down").addClass("nav-up"):l+$(window).height()<$(document).height()&&$("header").addClass("nav-down").removeClass("nav-up"),s=l)}(),i=!1)},250),projectDetail(),team()}),$(window).on("load",function(){$("body").removeClass("loader"),setTimeout(function(){$(".loader").fadeOut("300",function(){$(this).remove()})},900)}),$(window).scroll(function(){$(".home-pg").length&&(0==$(window).scrollTop()?$("header").addClass("darkHeader").fadeIn(500):$("header").removeClass("darkHeader").fadeOut(100))}),$(window).on("load",function(){$(".section-workshow").length&&(masonryEffect(),$(".filter-box").addClass("all"),$(".filter-nav li").click(function(){$(this).addClass("active").siblings().removeClass("active"),"all"!=$(this).attr("data-filter")?($(".filter-box").removeClass("all"),$(".item."+$(this).attr("data-filter")).show().siblings(":not(.item."+$(this).attr("data-filter")+")").hide(),$(":not(.item."+$(this).attr("data-filter")+")").css({left:""})):($(".filter-box").addClass("all"),$(".item").show()),masonryEffect()}))});