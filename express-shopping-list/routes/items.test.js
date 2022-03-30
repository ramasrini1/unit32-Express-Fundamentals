process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");
// app imports
const app = require("../app");

let items = require("../fakeDb")

let item = { name: "Ipad", price:200 }

beforeEach(function() {
  items.push(item);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});
// end afterEach

describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.items).toEqual([{ name: "Ipad", price:200 }]);
  });
  
  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/jingle`);
    expect(response.statusCode).toBe(404);
  });

});

/** POST /items - create item from data; return {
    "added": {
        "name": "test3",
        "price": 48
    }
} */

describe("POST /items", function() {
  test("Creates a new item", async function() {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "item5",
        price: 20
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.added).toHaveProperty("name");
    expect(response.body.added).toHaveProperty("price");
    expect(response.body.added.name).toEqual("item5");
    expect(response.body.added.price).toEqual(20);
    
  });
});
// end

describe("PATCH /items", function() {
  test("Updates an item", async function() {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Iphone",
        price: 55
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.updated).toHaveProperty("name");
    expect(response.body.updated).toHaveProperty("price");
    expect(response.body.updated.name).toEqual("Iphone");
    expect(response.body.updated.price).toEqual(55);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/dress`);
    expect(response.statusCode).toBe(404);
  });

});
// end

describe("DELETE /items", function() {
  test("Deletes an item", async function() {
    const response = await request(app).delete(`/items/${item.name}`)
    expect(response.statusCode).toBe(200); 
    expect(response.body).toEqual({ message: "Deleted" });   
  });
});



