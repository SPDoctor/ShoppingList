import * as assert from 'assert';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';
import ShoppingListWebPart from '../ShoppingListWebPart';

describe('ShoppingListWebPart', () => {
  it('should do something', () => {
    assert.ok(true);
  });
  it('should show heading', () => {
    var context: any;
    var webpart = new ShoppingListWebPart(context);
    // webpart.render();
    console.log(context);
    console.log(webpart);
    assert.equal("foo", "foo");
  });
  it('should show heading 2', () => {
    assert.equal("foo", "bar", "this could be a problem!");
  });
  it('should work with regular anonymous function', function () {
    assert.ok(true);
  });
});
