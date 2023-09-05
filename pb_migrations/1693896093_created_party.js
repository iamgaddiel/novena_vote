migrate((db) => {
  const collection = new Collection({
    "id": "8aggkcopip48b3o",
    "created": "2023-09-05 06:41:33.427Z",
    "updated": "2023-09-05 06:41:33.427Z",
    "name": "party",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5ji61vrn",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_BFp7CYI` ON `party` (`name`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("8aggkcopip48b3o");

  return dao.deleteCollection(collection);
})
