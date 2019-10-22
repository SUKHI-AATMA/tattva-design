const fse = require('fs-extra');
const distPath = 'projects';
var request = require("request")
var projectDetailsUrl = "https://api.sheetson.com/v1/sheets/TattvaArtboard?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
var projectListingUrl = "https://api.sheetson.com/v1/sheets/TattvaProjects?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
var homeSlider = "https://api.sheetson.com/v1/sheets/TattvaProjects?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
var fileHtml = '',
    meta, content;
// clear destination folder
fse.emptyDirSync(distPath);
var keyList = [
    undefined,
    'rowIndex',
    'id',
    'title',
    'metaTitle',
    'metaDescription',
    'metaImage',
];
//Project details
request({
    url: projectDetailsUrl,
    json: true
}, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        var jsonDataList = body.results;
        jsonDataList.forEach((jsonData, i) => {
            var pgFileName = jsonData.metaTitle;
            pgFileName = pgFileName.replace(/[^\w\s]/gi, '').toLowerCase().replace(/ /g, "-");
            fileHtml = '';
            var jsonD = jsonData,
                content = '';
            for (var key in jsonData) {
                if (jsonData.hasOwnProperty(key) && keyList.indexOf(key) == -1) {
                    var val = jsonData[key];
                    var contVal = '',
                        eleVal = '',
                        styleArr, innerStyles = '';
                    val.indexOf('@#$') > -1 ?
                        (
                            contVal = val.split('@#$'),
                            eleVal = contVal[0],
                            innerStyles = contVal[1]
                        ) : eleVal = val;
                    content += "<li class='col' style='" + innerStyles + "'>" + eleVal + "</li>"
                }
            }
            fileHtml += `<!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" href="/dist/css/style.css">
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">

                <!-- <title>Tattva Design</title> -->
                <title>` + jsonData.metaTitle + ` | Tattva Design</title>
                <meta name="title" content="` + jsonData.metaTitle + `">
                <meta name="description" content="` + jsonData.metaDescription + `">


                <meta property="og:type" content="website">
                <meta property="og:url" content="https://tattva-design.com/` + distPath + `/` + pgFileName + `">
                <meta property="og:title" content="` + jsonData.metaTitle + `">
                <meta property="og:description" content="` + jsonData.metaDescription + `">
                <meta property="og:image" content="` + jsonData.metaImage + `">


                <meta property="twitter:card" content="summary_large_image">
                <meta property="twitter:url" content="https://tattva-design.com/` + distPath + `/` + pgFileName + `">
                <meta property="twitter:title" content="` + jsonData.metaTitle + `">
                <meta property="twitter:description" content="` + jsonData.metaDescription + `">
                <meta property="twitter:image" content="` + jsonData.metaImage + `">
            </head>
            <body>
                <div class="loading"></div>
                <header>
                    <div class="container">
                        <div class="inner-wrap flex-wrap">
                            <div class="logo">
                                <a href="/">
                                    <img src="/images/logo-black.svg" alt="Tattva Design" title="Tattva Design">
                                </a>
                            </div>
                            <div class="menu">
                                <nav>
                                    <ul>
                                        <li>
                                            <a class="menu-link" href="/work">Work</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="/about">About</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="/contact">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                <main class="work-detail">
                    <section class="section-work">
                        <div class="container" id="projectDetail">
                          <ul class="work-wrap scroll carousel">
                          ` + content + `
                          </ul>
                        </div>
                    </section>
                </main>
                <footer>
                    <div class="container">
                        <div class="inner-wrap flex-wrap">
                            <div class="left-wrap">
                                <p>&copy;TattvaDesign 2019</p>
                            </div>
                            <div class="center-wrap">
                                <ul>
                                    <li>
                                        <a class="social-link" href="https://www.instagram.com/tattvadesign/" target="_blank">Instagram</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="https://www.facebook.com/tattvadesign/" target="_blank">Facebook</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">LinkedIn</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">Tumblr</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">Behance</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="right-wrap">
                                <a class="link" href="/contact">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
            <script src="/js/jquery-3.4.1.min.js"></script>
            <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
            <script src="/js/jquery.waitforimages.min.js"></script>
            <script src="/dist/js/main.js"></script>
            <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d847d43ac9d7f9b"></script>
            <script>
            $(window).on('load',function(){
              if ($(window).width() > 990) {
                    //work-detail page slider
                    $('#projectDetail ul').waitForImages(function() {
                        var $carousel = $('.carousel').flickity({
                            contain: true,
                            pageDots: false,
                            freeScroll: true
                        });
                        $carousel.on('staticClick.flickity ', function(event, pointer, cellElement, cellIndex) {
                            if (typeof cellIndex == 'number') {
                                $carousel.flickity('selectCell', cellIndex);
                            }
                        });
                    });
                }
                $('.loading').fadeOut(300, '', function() {
                    $('.loading').remove();
                });
            });
            </script>
            </body>

            </html>`;
            fse.writeFileSync(`${distPath}/${pgFileName}.html`, fileHtml);
        })
    }
})
//Project listing
request({
    url: projectListingUrl,
    json: true
}, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        var jsonDataList = body.results,
            content = '';
        jsonDataList.forEach((jsonData, i) => {
            var pgFileName = jsonData.title;
            pgFileName = pgFileName.replace(/[^\w\s]/gi, '').toLowerCase().replace(/ /g, "-");
            fileHtml = '';

            content += `<div class="item ` + jsonData.category + `" data-category="` + jsonData.category + `">
                <a class="link" data-id="` + jsonData.id + `" data-rowIndex="` + jsonData.rowIndex + `" href="projects/` + pgFileName + `">
                <div class="desc">
                <img src="` + jsonData.img + `" alt="">
                </div>
                <div class="content" style="` + jsonData.styles + `">
                <h2>` + jsonData.title + `</h2>
                <div class="hide">
                <p>` + jsonData.desc + `</p>
                </div>
                </div>
                </a>
                </div>`
            // console.log(content);
            fileHtml += `<!doctype html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" href="/dist/css/style.css">
                <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"> -->
                <!-- <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css"> -->

                <title>Work | Tattva Design</title>

                <!-- Global site tag (gtag.js) - Google Analytics -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-146795914-1"></script>
                <script>
                window.dataLayer = window.dataLayer || [];

                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());

                gtag('config', 'UA-146795914-1');
                </script>
            </head>

            <body>
                <div class="loading"></div>
                <header>
                    <div class="container">
                        <div class="inner-wrap flex-wrap">
                            <div class="logo">
                                <a href="/">
                                    <img src="/images/logo-black.svg" alt="Tattva Design" title="Tattva Design">
                                </a>
                            </div>
                            <div class="menu">
                                <nav>
                                    <ul>
                                        <li>
                                            <a class="menu-link active" href="javascript:;">Work</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="/about">About</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="/contact">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <section class="section-workshow">
                        <div class="container">
                            <div class="workshow-wrap">
                                <div class="col">
                                    <div class="title-wrap">
                                        <h1>Work</h1>
                                    </div>
                                    <!-- <ul class="filter-nav">
                                        <li class="active" data-filter="all">
                                            <a href="javascript:;">All</a>
                                        </li>
                                        <li data-filter="branding">
                                            <a href="javascript:;">Branding</a>
                                        </li>
                                        <li data-filter="design">
                                            <a href="javascript:;">Design</a>
                                        </li>
                                        <li data-filter="illustration">
                                            <a href="javascript:;">Illustration</a>
                                        </li>
                                        <li data-filter="space">
                                            <a href="javascript:;">Space</a>
                                        </li>
                                        <li data-filter="web">
                                            <a href="javascript:;">Web</a>
                                        </li>
                                    </ul> -->
                                </div>
                                <div class="filter-wrap">
                                    <div class="filter-body">
                                        <div class="filter-box" id="projectListing">
                                        ` + content + `
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer>
                    <div class="container">
                        <div class="inner-wrap flex-wrap">
                            <div class="left-wrap">
                                <p>&copy;TattvaDesign 2019</p>
                            </div>
                            <div class="center-wrap">
                                <ul>
                                    <li>
                                        <a class="social-link" href="https://www.instagram.com/tattvadesign/" target="_blank">Instagram</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="https://www.facebook.com/tattvadesign/" target="_blank">Facebook</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">LinkedIn</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">Tumblr</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">Behance</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="right-wrap">
                                <a class="link" href="/contact">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
                <script src="js/jquery-3.4.1.min.js"></script>
                <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script> -->
                <!-- <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script> -->
                <script src="/dist/js/main.js"></script>
                <script>
                    $(window).on('load',function(){
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
                    });
                </script>
            </body>

            </html>`;
            fse.writeFileSync(`work.html`, fileHtml);
        })
    }
})
//Homepage
request({
    url: homeSlider,
    json: true
}, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        var jsonDataList = body.results,
            content = '';
        jsonDataList.forEach((jsonData, i) => {
            var pgFileName = jsonData.title;
            pgFileName = pgFileName.replace(/[^\w\s]/gi, '').toLowerCase().replace(/ /g, "-");
            fileHtml = '';

            content += `<a class="item" href="projects/` + pgFileName + `">
                <img src="` + jsonData.homeimg + `" alt="">
                <div class="content" style="` + jsonData.styles + `">
                    <h2>` + jsonData.title + `</h2>
                    <div class="hide">
                        <p>` + jsonData.desc + `</p>
                    </div>
                </div>
                </a>`;
            // console.log(content);
            fileHtml += `<!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" href="dist/css/style.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
                
                <title>Tattva Design</title>

                <meta name="Title" content="Tattva Design" />
                <meta name="description" content="As an art led graphic design studio, we are a comprehensive creative resource for branding, art & creative and space design projects.">
                <meta name="keywords" content="Be it branding, creative & art direction, digital or space – trust us to deliver the iconic." />

                <meta name="twitter:description" content="Tattva Design" />
                <meta name="twitter:image" content="https://tattva-design.com/images/meta-img.jpg"/>
                <meta name="twitter:url" content="https://tattva-design.com/"/>

                <meta property="og:title" content="Tattva Design" />
                <meta property="og:description" content="Tattva Design" />
                <meta property="og:url" content="https://tattva-design.com/" />
                <meta property="og:image" content="https://tattva-design.com/images/meta-img.jpg" />
                <meta property="og:type" content="website" />

                <!-- Global site tag (gtag.js) - Google Analytics -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-146795914-1"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-146795914-1');
                </script>
            </head>

            <body class="home-pg">
                    <div class="loading"></div>
                <!-- <div class="loading"> -->
                    <!-- <img src="images/Tattva-Loader.gif" alt=""> -->
                    <!-- <div class="loader">
                        <div class="dot-container">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                        <div class="dot-container">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                        <div class="dot-container">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div> -->
                </div>
                <header class="home">
                    <div class="container">
                        <div class="inner-wrap flex-wrap">
                            <div class="logo">
                                <a href="/">
                                    <img src="images/logo-white.svg" alt="Tattva Design" title="Tattva Design">
                                </a>
                            </div>
                            <div class="menu">
                                <nav>
                                    <ul>
                                        <li>
                                            <a class="menu-link" href="/work">Work</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="/about">About</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="/contact">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                <main class="home">
                    <section class="section-banner">
                        <div class="container">
                            <div class="img">
                                <img src="images/bn-gif.gif" alt="Tattv Design">
                                
                            </div>
                            <a href="javacript:;" class="scroll-arrow">
                                <img src="images/scroll-arrow.png" alt="">
                            </a>
                        </div>
                    </section>

                    <section class="section-abt">
                        <div class="container">
                            <div class="inner-wrap">
                                <div class="col">
                                    <p>We are meaning makers, helping businesses find the soul of their brand. With classical thinking, consumer insights and art-driven design, we can unlock your brand’s original, impactful story for its consumers.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="section-slider">
                        <div class="container">
                            <div id="hmSliderCarousel">
                                <div class="owl-carousel owl-theme" id="HomeSlider">
                                ` + content + `
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="section-content">
                        <div class="container">
                            <div class="inner-wrap">
                                <div class="col">
                                    <h4>Get IN Touch</h4>
                                </div>
                            </div>
                        </div>
                    </section>

                    
                    <!-- <section class="section-showcase">
                        <div class="container">
                            <div class="inner-wrap">
                                <div class="row flex-wrap">
                                    <div class="col flexbox">
                                        <h2>Shop</h2>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="row flex-wrap">
                                    <div class="col"></div>
                                    <div class="col flexbox">
                                        <h2>Coming Soon</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> -->


                    <section class="section-social">
                        <div class="container">
                            <div class="col" id="instafeed">    <!-- id="instafeed" -->
                                <a class="box link" href="https://www.instagram.com/tattvadesign/" target="_blank">
                                    <img src="images/insta-bg.jpg" alt="">
                                    <span class="pos">
                                        <img src="images/instagram.png" alt="instagram">
                                    </span>
                                </a>
                            </div>
                            <div class="col">
                                <div class="inner-box">
                                    <p>Explore the full spectrum of our creative capabilities. Learn what else we can create, design and craft for you across media. Follow us. Be informed. Stay up to date on our latest projects.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
                <footer>
                    <div class="container">
                        <div class="inner-wrap flex-wrap">
                            <div class="left-wrap">
                                <p>&copy;TattvaDesign 2019</p>
                            </div>
                            <div class="center-wrap">
                                <ul>
                                    <li>
                                        <a class="social-link" href="https://www.instagram.com/tattvadesign/" target="_blank">Instagram</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="https://www.facebook.com/tattvadesign/" target="_blank">Facebook</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">LinkedIn</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">Tumblr</a>
                                    </li>
                                    <li>
                                        <a class="social-link" href="javascript:;">Behance</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="right-wrap">
                                <a class="link" href="/contact">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/instafeed.js/1.4.1/instafeed.min.js"></script>
                <script src="https://matthewelsom.com/assets/js/libs/instafeed.min.js"></script>

                <script src="js/jquery-3.4.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
                <script src="dist/js/main.js"></script>
                <script>
                $(window).on('load',function(){
                    $('.loading').fadeOut(500, '', function() {
                        $('.loading').remove();
                    });

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
                });
                </script>
                </body>


                </html>`;
            fse.writeFileSync(`index.html`, fileHtml);
        })
    }
})