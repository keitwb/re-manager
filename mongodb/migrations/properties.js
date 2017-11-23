load("common.js")

// Properties
rem.createCollection("properties");  // This is idempotent

rem.runCommand({
   collMod:"properties",
   validator:{ $or: [
     { "propType": { $in: ["land", "commercial", "residential"] } }
   ]},
   validationLevel:"strict"
});

rem.properties.dropIndex("text-search");
rem.properties.createIndex({ "$**": "text" }, {name: "text-search"});

setRelations("properties", [
  {
    rel: "leases",
    type: "MANY_TO_MANY",
    role: "OWNING",
    "target-coll": "leases",
    "ref-field": "$.leases.[*]",
  },
  {
    rel: "owners",
    type: "MANY_TO_MANY",
    role: "OWNING",
    "target-coll": "parties",
    "ref-field": "$.owners.[*].id",
  },
  {
    rel: "contacts",
    type: "MANY_TO_MANY",
    role: "OWNING",
    "target-coll": "parties",
    "ref-field": "$.contacts.[*]"
  },
  {
    rel: "notes",
    type: "ONE_TO_MANY",
    role: "OWNING",
    "target-coll": "notes",
    "ref-field": "$.notes.[*]",
  },
]);

setAggregations("properties", [
  {
    "type": "pipeline",
    "uri": "counties",
    "stages": [{
      "_$match": {
        "county": { "_$regex": {"_$var": "re" }, "_$options": "i" }
      }}, {
      "_$group": {
        _id: "counties",
        values: { "_$addToSet": "$county" }
      }
    }]
  }]);

