migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbyshjknerg7un5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xaoxildp",
    "name": "is_verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbyshjknerg7un5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xaoxildp",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
