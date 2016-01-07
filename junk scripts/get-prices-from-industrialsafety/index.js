var request = require('request');
var cheerio = require('cheerio');

//to form the url correctly you must concatenate (urlBeg + pageNum + urlEnd)
var urlBeg = "https://industrialsafety.ecomm-nav.com/search.js?initial_url=https%3A%2F%2Fwww.industrialsafety.com%2Fsearch_results_a%2F256.html%3FSearch%3Dmorse&keywords=morse&keywords=morse&search_return=all&page=";
var pageNum = 1;
var urlEnd ="&callback=jQuery1102009770880662836134_1452123636536&_=1452123636538";
var fullUrl = urlBeg+pageNum+urlEnd;



function cleanHttpBody(body){
    //these are used to cut off junk that encapsulates the JSON which contains the HTML.
    var sliceBegIdx = 112; //delete the first 112 chars which are: "jQuery1102009770880662836134_1452123636536("
    var sliceEndIdx = -2; //delete the last two chars which are:  ");"
    return body.slice(112,-2);
}

function makeConnection(pgNum){

    //to form the url correctly you must concatenate (urlBeg + pgNum + urlEnd)
    var urlBeg = "https://industrialsafety.ecomm-nav.com/search.js?initial_url=https%3A%2F%2Fwww.industrialsafety.com%2Fsearch_results_a%2F256.html%3FSearch%3Dmorse&keywords=morse&keywords=morse&search_return=all&page=";
    var urlEnd ="&callback=jQuery1102009770880662836134_1452123636536&_=1452123636538";
    var fullUrl = urlBeg+pgNum+urlEnd;


    request.get(fullUrl, function(error, response, body){



        if(!error){
            //grab key that holds the html in the quasi-JSON http body. Then load into cheerio.
            var htmlObj = cleanHttpBody(body).content;
            var $ = cheerio.load(htmlObj);
            //ToDo: add some cheerio (jquery) calls to parse htmlObj for <li class="nxt-product-item">
            $.()

            console.log("Success! Recieved an HTTP response.");
        } else {
            console.log("Error: "+ error);

        }
    })
}
