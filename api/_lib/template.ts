
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        width: 1200px;
        height: 630px;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }
    
    
     #productImg {
          width: 630px;
        height: 630px;
      }
      .row {
          height: 630;
      }
      .productName {

          
          
          font-family: 'Inter', sans-serif;
       
      }

      .pname {
        padding-top: 50px;
        padding-right: 60px;
      }

      #productPrice {
       
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: bold;
        color: ${foreground};
        line-height: 1.8;
      }

      .pprice {
        padding-top: 30px
        
      }

      #productCode {
        font-family: 'Inter', sans-serif;
        color: ${foreground};
      }
      #logo {
          width: 124px;
          height: 124px;
          position: absolute;
          bottom:30px;
right: 60px;
font-size: 18px;
      }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { theme, fontSize, productName, productPrice, productCode, productId  } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous">
                    
    <style>
        ${getCss(theme, fontSize)}

       
    </style>
    
    <body>
                     <div class="row">
                     <div class="col-6">
                     ${productId.map((img, i) =>
                        getPlusSign(i) + getImage2(`https://dev.shop.yehey.jp/api/images/${img}`)
                    ).join('')}
                           </div>
                         <div class="col-6">
                        <div>
                        <div class="pname">
                        <h1 class="productName display-1">${productName}</h1>
                        </div>
                        <span id="productCode">${productCode}</span>
                        <div class="pprice">
                        <div id="productPrice" >${productPrice}</div>
                        </div>
                        <img id="logo" src="${"https://dev.shop.yehey.jp/logo.png"}"
                            class="img-fluid float-start rounded-circle" alt="productImage" >
                           </div>
                       </div>
                       </div>
                    </div>
                    </body>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.min.js" integrity="sha384-5h4UG+6GOuV9qXh6HqOLwZMY4mnLPraeTrjT5v07o347pj6IkfuoASuGBhfDsp3d" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js" integrity="sha384-BOsAfwzjNJHrJ8cZidOg56tcQWfp6y72vEJ8xQ9w6Quywb24iOsW913URv1IS4GD" crossorigin="anonymous"></script>
                    
</html>`;
}


function getImage2(src: string) {
    return `<img id="productImg" src="${src}"
    class="img-fluid float-start rounded" alt="productImage" >`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
