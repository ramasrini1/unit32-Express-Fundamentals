/** Item in a shopping cart. */
const items = require("./fakeDb")

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    // keep track of all items
    items.push(this);
  }

  static findAll(){
    return items
  }

  /** Find & return item with matching name. */
  static find(name){
    const foundItem = items.find(v => v.name === name);
    if ( foundItem === undefined ){
      throw {message: "Not Found", status: 404}
    }
    return foundItem;
  }

  /** Update found item with matching name to data. */
  static update(name, data){
    const foundItem = items.find(v => v.name === name);
    
    if ( foundItem === undefined ){
      throw {message: "Not Found", status: 404}
    }
    
    foundItem.name = data.name;
    foundItem.price = data.price;
    return foundItem;
  }

  /** Delete the Item. */
  static remove(name){
    const foundIndex = items.findIndex(v => v.name === name);
    if ( foundIndex === -1 ){
      throw {message: "Not Found", status: 404}
    }
    items.splice(foundIndex, 1);
  }
}

module.exports = Item;