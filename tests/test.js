/// <reference path="../lib/webparts/shoppingList/ShoppingListViewModel.js" />
/// <reference path="jquery.mockjax.js" />

$(function () {
  var $fixture = $("#qunit-fixture");
  String.prototype.contains = function (it) { return this.indexOf(it) != -1; };

  var properties = {};
  properties.description = "Shopping List";
  var context = {};
  ((context.pageContext = {}).web = {}).absoluteUrl = "http://contoso.com/";
  var domElement = document.getElementById("render-target");
  var dummyXHR = {};
  dummyXHR.open = dummyXHR.send = dummyXHR.setRequestHeader = function () { };
  dummyXHR.status = 200;
  dummyXHR.responseText = `{"odata.metadata":"https://flosimdemo.sharepoint.com/sites/dev/_api/$metadata#SP.ListData.ShoppingListListItems&$select=Title","value":[{"odata.type":"SP.Data.ShoppingListListItem","odata.id":"421c2dad-0b7b-4c7d-81dc-6be959217957","odata.etag":"1","odata.editLink":"Web/Lists(guid'6f83c8fa-2437-4e26-a252-24d51335b684')/Items(1)","Title":"Bananas"},{"odata.type":"SP.Data.ShoppingListListItem","odata.id":"36519607-a9ac-4067-b36b-5005e5fd6016","odata.etag":"1","odata.editLink":"Web/Lists(guid'6f83c8fa-2437-4e26-a252-24d51335b684')/Items(2)","Title":"Milk"},{"odata.type":"SP.Data.ShoppingListListItem","odata.id":"f360ae9b-3bfb-4622-af8c-63cfb31ba9f6","odata.etag":"1","odata.editLink":"Web/Lists(guid'6f83c8fa-2437-4e26-a252-24d51335b684')/Items(3)","Title":"Eggs"},{"odata.type":"SP.Data.ShoppingListListItem","odata.id":"81931d95-d830-404f-981d-e6824c8d5efb","odata.etag":"1","odata.editLink":"Web/Lists(guid'6f83c8fa-2437-4e26-a252-24d51335b684')/Items(4)","Title":"Cereal"}]}`;
  var model = new ShoppingListModel(dummyXHR, properties, context);
  var view = new ShoppingListView(model);

  module("Shopping List View");

  test("should work properly", function () {
    ok(1);
  });

  test("should be able to perform another random test", function () {
    ok(1, "a helpful error message");
  });

  test("should not fail this failing test", function () {
    ok(true, "true succeeds");
    ok("non-empty", "non-empty string succeeds");
    //    ok(0, "a helpful error message");
  });

  test("should have correct header", function () {
    model.properties.description = "Test Header";
    domElement.innerHTML = "";

    view.render(domElement);

    ok(domElement.innerHTML.contains("<h1>Test Header</h1>"), "header");
  });

  test("should have bananas", function () {
    domElement.innerHTML = "";

    view.render(domElement);
    dummyXHR.onload(); // invoke the async method on XHR

    ok(domElement.innerHTML.contains("Bananas"), "yes, we have no bananas");
  });

  test("should have cereal", function () {
    domElement.innerHTML = "";

    view.render(domElement);
    dummyXHR.onload();

    ok(domElement.innerHTML.contains("Cereal"), "yes, we have no bananas");
  });

  // module("Shopping List Model");

  // test("Should have bananas", function () {
  //   var model = new ShoppingListModel(dummyXHR, properties, context);

  //   var callback = function (list) {
  //     ok(list.indexOf("Bananas") > -1, "yes, we have no bananas, we have no bananas today");
  //   };
  //   model.getItemsListAsync(callback);
  // });

});
