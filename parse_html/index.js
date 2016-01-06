var products = require('./matflow_grab_models_and_prices 5th Jan 13-28.json');
var http = require('http');
var $ = require('jquery');
// var htmlparser = require("htmlparser");
var fs = require('fs');
// products = JSON.parse(products);

function makeProductArray(jsonFile){
  var a = [];
  //loop over JSON and pull out the model# for each item and save to an array, then return array.
  for (var i = 0; i < jsonFile.pages.length; i++){
      jsonFile.pages[i].results.forEach(function(element, index, array){
          a.push(element.model);
      });
  }
  return a;
}

function connectToSite(productArray){

  var options = {
    host: 'http://localhost',
    port: 80,
    path: '/'
  };

  var html = '';
  var inputNum = 10;
  for (var groupCount = 0; groupCount < productArray.length; groupCount + inputNum){

    var slicedArray = productArray.slice(groupCount, groupCount + (inputNum + 1));

    http.get(options, function(res) {
        console.log(res);
      res.on('data', function(data) {
          // collect the data chunks to the variable named "html"
          html += data;
          console.log(data);
      }).on('end', function() {
              //Grab each input element and change its attribute "value" = to a product code as returned by makeProductArray(jsonFile);
              // i < 10 because, 10 is the count of the input boxes and each input box has a number [0-9] appended on the end.
          // for (var i=0; i < inputNum; i++){
          //
          //   var txtInpName = "product[" + i +"]";
          //   var qtyInpName = "qty["+ i +"]";
          //
          //   // $(html).find("input[name=txtInpName]").attr("value",slicedArray[i]);
          //   $(html).find("input[name=txtInpName]").val(slicedArray[i]);
          //   $(html).find("input[name=qtyInpName]").attr("value",i);
          // }
          //
          // //could do a form trigger submit instead, but I tried this first.
          // $(html).find("input[name=submitQQ]").trigger("click");
      });
    });
  }
}

connectToSite(makeProductArray(products));




// var handler = new htmlparser.DefaultHandler(function (error, dom) {
//     if (error){
//         console.log(error);
//     }
//     else{
//         //[...parsing done, do something...]
//     }
// });
// var parser = new htmlparser.Parser(handler);
// parser.parseComplete(rawHtml);
// console.log(handler.dom);
