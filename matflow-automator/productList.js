var fs = require('fs');




//product Model Object
function ProductModel(model,matflow,list,cost){
  this.model = model;
  this.prices = {
    "matflow": matflow,
    "list": list,
    "cost": cost,
  }
}

//List that holds products with methods to interact with those products
ProductList = function(){
  this.list = "";
  this.compareList = "";
}

//Print ProductList.list to console.
ProductList.prototype.printList = function(){
  console.log("-| Model | Our Price | List Price | Our Cost |-");
  for(var i = 0; i < this.list.length; i++){
    console.log(i + " " + this.list[i].model + " " + this.list[i].prices.matflow + " " + this.list[i].prices.list + " " + this.list[i].prices.cost + "\n");
  }
}

ProductList.prototype.saveList = function(writeFile){

  var csvString = "";
  this.list.forEach(function(element, index, array){
    csvString += (element.model + "," + element.prices["matflow"] + "," + element.prices["list"] + "," +element.prices["cost"] + "\r\n");
  });

  fs.writeFile(writeFile, csvString, function(err){
    if(!err){
        console.log('CSV file has been created! \nProgram complete');
    } else {
        console.log('Error (File Writing): ' + err);
    }
  });
}
ProductList.prototype.compareListsAndReturn = function(other_list,save_file){
  //The material flow list takes precidence to we should really only use another list as other_list.
  //We loop through the material flow list and see if the other_list has a matching model if not we leave it alone.
  //Else if it does we check the values to see if they match if not then we update the objects list with the values.
  var that = this;
  this.list.forEach(function(ele,ind,arr){
    for(var i = 0; i < other_list.length; i++){
      if(other_list[i].model === ele.model){
        that.list[ind].prices["list"] = other_list[i].prices["list"];
        that.list[ind].prices["cost"] = other_list[i].prices["cost"];
        break;
      }
    }
  })

  this.saveList(save_file);
}


ProductList.prototype.loadList = function(file ,compare_file, save_file){
  console.log('parsingCSV now ...');
  var parsedList = [];
    that = this;
  fs.readFile(file,'utf8',function(err,data){
      if(!err){
          var eachProduct = data.split('\r\n');
          for (var i = 0; i < eachProduct.length; i++){
            eachCategory = eachProduct[i].split(',');
            var product = new ProductModel(eachCategory[0],eachCategory[1],null,null);
            parsedList.push(product);
          }
          console.log('Parsed CSV successfully.');
          that.list = parsedList;
          fs.readFile(compare_file,'utf8',function(err,data){
              parsedList = [];
              if(!err){
                  var eachProduct = data.split('\r\n');
                  for (var i = 0; i < eachProduct.length; i++){
                      eachCategory = eachProduct[i].split(',');
                      var product = new ProductModel(eachCategory[0],null,eachCategory[1],eachCategory[2]);
                      parsedList.push(product);
                  }
                  console.log('Parsed CSV successfully.');
                  that.compareList = parsedList;
                  that.compareListsAndReturn(that.compareList, save_file);
              } else {
                  console.log('Error (File Reading): ' + err);
              }
          });

      } else {
          console.log('Error (File Reading): ' + err);
      }
  });

}

ProductList.prototype.returnList = function(){
  return this.list;
}

// ProductList.prototype.compareListsAndReturn = function(other_list,save_file){
//   //The material flow list takes precidence to we should really only use another list as other_list.
//   //We loop through the material flow list and see if the other_list has a matching model if not we leave it alone.
//   //Else if it does we check the values to see if they match if not then we update the objects list with the values.
//   this.list.forEach(function(ele,ind,arr){
//     for(var i = 0; i < other_list.length; i++){
//       if(other_list[i].model === ele){
//         this.list[ind].prices["list"] = other_list[i].prices["list"];
//         this.list[ind].prices["cost"] = other_list[i].prices["cost"];
//         break;
//       }
//     }
//   })
//   this.saveList(save_file);
// }
// ProductList.prototype.saveList = function(writeFile){
//
//   var csvString = "";
//   this.list.forEach(function(element, index, array){
//     csvString += (element.model + "," + element.prices["matflow"] + "," + element.prices["list"] + "," +element.prices["cost"] + "\r\n");
//   });
//
//   fs.writeFile(writeFile, csvString, function(err){
//     if(!err){
//         console.log('CSV file has been created! \nProgram complete');
//     } else {
//         console.log('Error (File Writing): ' + err);
//     }
//   });
// }
module.exports.ProductList = ProductList;
