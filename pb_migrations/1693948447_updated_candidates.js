migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ptaowmrw",
    "name": "vote_count",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2")

  // remove
  collection.schema.removeField("ptaowmrw")

  return dao.saveCollection(collection)
})
