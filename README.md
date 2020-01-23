db.getCollection('pastas').createIndex( { title: "text", text: "text" } )
db.getCollection('pastas').find( { $text: { $search: "flex паста" } } )