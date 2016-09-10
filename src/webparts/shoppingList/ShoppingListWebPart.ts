import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'shoppingListStrings';
import { IShoppingListWebPartProps } from './IShoppingListWebPartProps';
import { ShoppingListView } from './ShoppingListView'
import { ShoppingListModel } from './ShoppingListModel'

export default class ShoppingListWebPart extends BaseClientSideWebPart<IShoppingListWebPartProps> {

  public shoppingListView: ShoppingListView;
  public shoppingListModel: ShoppingListModel;
  public xhr: XMLHttpRequest;

  public constructor(context: IWebPartContext) {
    super(context);
    this.xhr = new XMLHttpRequest();
    this.shoppingListModel = new ShoppingListModel(this.xhr, this.properties, this.context);
    this.shoppingListView = new ShoppingListView(this.shoppingListModel);
  }

  public render(): void {
    this.shoppingListView.render(this.domElement)
    // this.domElement.innerHTML = `
    //   <div class="${styles.shoppingList}">
    //     <div class="${styles.container}">
    //       <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
    //         <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
    //           <p>Welcome to SharePoint Framework, etc. etc.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`;
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
