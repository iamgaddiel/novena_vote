migrate((db) => {
  const collection = new Collection({
    "id": "tbyshjknerg7un5",
    "created": "2023-09-05 06:40:28.683Z",
    "updated": "2023-09-05 06:40:28.683Z",
    "name": "voters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xxooosgd",
        "name": "voters_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "phwna4hb",
        "name": "tracking_Id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "l5sjf90z",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xaoxildp",
        "name": "verified",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tbyshjknerg7un5");

  return dao.deleteCollection(collection);
})
