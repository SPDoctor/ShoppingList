import { ShoppingListModel } from './ShoppingListModel'

export class ShoppingListView {
  public model: ShoppingListModel;

  public constructor(model: ShoppingListModel) {
    this.model = model;
  }

  public render(domElement: any): void {
    domElement.innerHTML = `
      <div class="shoppingList">
        <div class="container">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white row">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <h1>${this.model.getHeading()}</h1>
              <ul id='my-secret-and-unique-id'></ul>
            </div>
          </div>
        </div>
      </div>`;
      this.model.getItemsListAsync(this.update);
  }

  public update(listItems: string[]): void {
    var content = "";
    listItems.forEach(item => content += "<li>" + item + "</li>");
    document.getElementById("my-secret-and-unique-id").innerHTML = content;
  }
}