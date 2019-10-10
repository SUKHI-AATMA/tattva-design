const fse = require('fs-extra');
const distPath = 'projects';
var request = require("request")
var projectDetailsUrl = "https://api.sheetson.com/v1/sheets/TattvaArtboard?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
var projectListingUrl = "https://api.sheetson.com/v1/sheets/TattvaProjects?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
var fileHtml = '', meta, content;
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
      var jsonD = jsonData, content = '';
      for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key) && keyList.indexOf(key) == -1  ) {
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
                <meta property="og:url" content="https://tattva-design.com/`+distPath+`/`+pgFileName+`">
                <meta property="og:title" content="` + jsonData.metaTitle + `">
                <meta property="og:description" content="` + jsonData.metaDescription + `">
                <meta property="og:image" content="` + jsonData.metaImage + `">


                <meta property="twitter:card" content="summary_large_image">
                <meta property="twitter:url" content="https://tattva-design.com/`+distPath+`/`+pgFileName+`">
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
                                            <a class="menu-link" href="work">Work</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="about">About</a>
                                        </li>
                                        <li>
                                            <a class="menu-link" href="contact">Contact</a>
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
                          `+
                          content
                          +`
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
                                <a class="link" href="contact">Contact</a>
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
                        $('.loading').fadeOut(300, '', function() {
                            $('.loading').remove();
                        });
                    });
                }
            });
            </script>
            </body>

            </html>`;
      fse.writeFileSync(`${distPath}/${pgFileName}.html`, fileHtml);
    })
  }
})

request({
  url: projectListingUrl,
  json: true
}, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    var jsonDataList = body.results, content = '';
    jsonDataList.forEach((jsonData, i) => {
      var pgFileName = jsonData.title;
      pgFileName = pgFileName.replace(/[^\w\s]/gi, '').toLowerCase().replace(/ /g, "-");
      fileHtml = '';

      content += `<div class="item `+ jsonData.category +`" data-category="` + jsonData.category + `">
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
                                <a class="menu-link" href="about">About</a>
                            </li>
                            <li>
                                <a class="menu-link" href="contact">Contact</a>
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
                            `+content+`
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
                    <a class="link" href="contact">Contact</a>
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