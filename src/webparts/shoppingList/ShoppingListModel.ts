
export class ShoppingListModel {
  public xhr: XMLHttpRequest;
  public properties: any;
  public context: any;

  public constructor(xhr: XMLHttpRequest, properties: any, context: any) {
    this.xhr = xhr;
    this.properties = properties;
    this.context = context;
  }

  public getHeading(): string {
    return this.properties.description;
  }

  public getItemsListAsync(callback: any): void {
    var endPointUri = this.context.pageContext.web.absoluteUrl;
    var query = "lists/getbytitle('ShoppingList')/items?$select=Title";
    var self = this;
    var callbackFunction = callback;
    var requestUri = endPointUri + "/_api/" + query;
    this.xhr.open('GET', requestUri);
    //xhr.setRequestHeader("Authorization", bearerToken);
    this.xhr.setRequestHeader("Accept", "application/json");
    this.xhr.timeout = 5000; // Set timeout to 5 sec
    this.xhr.onload = function () {
      if (self.xhr.status === 200) {
        var response = JSON.parse(self.xhr.responseText);
        var list: any = response.value.map(r => r.Title);
        callbackFunction(list);
      }
      else {
        var message = "<li>Request failed.  Returned status of " + self.xhr.status + "</li>";
        callbackFunction([message]);
      }
    };
    self.xhr.onerror = function () {
      var message = "<li>Request failed.  Returned status of " + self.xhr.status + "</li>";
      callbackFunction([message]);
    };
    self.xhr.ontimeout = function () {
      var message = "<li>Request timed out.  Returned status of " + self.xhr.status + "</li>";
      callbackFunction([message]);
    };
    this.xhr.send();
  }
}
