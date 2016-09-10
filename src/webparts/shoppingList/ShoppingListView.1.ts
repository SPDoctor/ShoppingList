
export class ShoppingListView {

  public render(domElement: any, properties: any, context: any, xhr: XMLHttpRequest): void {
    domElement.innerHTML = `
      <div class="shoppingList">
        <div class="container">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white row">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <h1>${properties.description}</h1>
              <ul id='my-secret-and-unique-id'></ul>
            </div>
          </div>
        </div>
      </div>`;

    var endPointUri = context.pageContext.web.absoluteUrl;
    var query = "lists/getbytitle('ShoppingList')/items?$select=Title";
    var self = this;
    var requestUri = endPointUri + "/_api/" + query;
    xhr.open('GET', requestUri);
    //xhr.setRequestHeader("Authorization", bearerToken);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = 5000; // Set timeout to 5 sec
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var content = "";
        if (response.value)
          for (var i = 0; i < response.value.length; i++)
            content += "<li>" + response.value[i].Title + "</li>";
        document.getElementById("my-secret-and-unique-id").innerHTML = content;
      }
      else {
        document.getElementById("my-secret-and-unique-id").innerHTML = "<li>Request failed.  Returned status of " + xhr.status + "</li>";
      }
    };
    xhr.onerror = function () {
      document.getElementById("my-secret-and-unique-id").innerHTML = "<li>Request failed.  Returned status of " + xhr.status + "</li>";
    };
    xhr.ontimeout = function () {
      document.getElementById("my-secret-and-unique-id").innerHTML = "<li>Request timed out.  Returned status of " + xhr.status + "</li>";
    };
    xhr.send();
  }
}
