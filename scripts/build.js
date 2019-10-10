const fse = require('fs-extra');
const distPath = '/work';
var request = require("request")
var url = "https://api.sheetson.com/v1/sheets/TattvaArtboard?spreadsheetId=1X_sY__OvWKlIQ9ddU4cQxXlcZsXFjRgv7qTPZlEf5Bw"
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
  url: url,
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
          console.log(val);

          // var value = data[key];
          var contVal = '',
              eleVal = '',
              styleArr, innerStyles = '';
          // console.log(value.indexOf('@#$'));
          // console.log(value.indexOf('@#$'));
          val.indexOf('@#$') > -1 ?
          (
              contVal = val.split('@#$'),
              eleVal = contVal[0],
              innerStyles = contVal[1]
          ) : eleVal = val;
          content += "<li class='col' style='" + innerStyles + "'>" + eleVal + "</li>"
          // walk(val);
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
                <meta property="og:url" content="https://tattva-design.com/work/`+pgFileName+`">
                <meta property="og:title" content="` + jsonData.metaTitle + `">
                <meta property="og:description" content="` + jsonData.metaDescription + `">
                <meta property="og:image" content="` + jsonData.metaImage + `">


                <meta property="twitter:card" content="summary_large_image">
                <meta property="twitter:url" content="https://tattva-design.com/work/`+pgFileName+`">
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

      // const destPath = path.join(distPath, fileData.dir);
      // var desired = pgFileName.replace(/[^\w\s]/gi, '')
      fse.writeFileSync(`work/${pgFileName}.html`, fileHtml);
    })
  }
})
