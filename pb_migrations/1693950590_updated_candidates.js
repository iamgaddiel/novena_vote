migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nm4jyvhm",
    "name": "description",
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

  // remove
  collection.schema.removeField("nm4jyvhm")

  return dao.saveCollection(collection)
})
