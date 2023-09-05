migrate((db) => {
  const collection = new Collection({
    "id": "mtm1b34v49mbql2",
    "created": "2023-09-05 06:42:32.042Z",
    "updated": "2023-09-05 06:42:32.042Z",
    "name": "candidates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "swwxfuer",
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
        "id": "uzy2vc4m",
        "name": "party",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "8aggkcopip48b3o",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "vi2ugbpu",
        "name": "logo",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
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
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2");

  return dao.deleteCollection(collection);
})
