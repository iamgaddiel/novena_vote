migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2")

  collection.listRule = "@request.auth.id != ''"
  collection.viewRule = "@request.auth.id != ''"
  collection.updateRule = "@request.auth.id != '' && @request.auth.can_vote = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtm1b34v49mbql2")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
