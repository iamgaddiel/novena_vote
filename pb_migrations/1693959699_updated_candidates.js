migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2")

  // remove
  collection.schema.removeField("uzy2vc4m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wwrvcg9s",
    "name": "party",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("wwrvcg9s")

  return dao.saveCollection(collection)
})
