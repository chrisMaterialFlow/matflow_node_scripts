var ProductList = require('./productList');

var MatFlowList = new ProductList.ProductList();
MatFlowList.loadList('./productLists/matflow_prices.csv','./productLists/little_giant.csv','./productLists/TestVersion');

