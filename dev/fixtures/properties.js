load("util.js");

upsert("properties", [
  {
    _id: ID(1),
    createdDate:   new Date("2017-02-01"),
    createdBy:    ID(1),
    name:         "Swamp Tract",
    description:  "Tract in the swamp land behind the old highway",
    acreage:      120.5,
    county:       "Pender",
    state:        "NC",
    owners:       [{id: ID(1), portion: 50}, {id: ID(2), portion: 50}],
    pinNumbers:   ["123-45-678"],
    noteIds:      [ID(1), ID(2)],
    leaseIds:     [ID(1), ID(2)],
    contactIds:   [ID(1)],
    mediaIds:     [fileByFileName("doc1.pdf")._id],
    tags:         ["land", "for-sale", "for-lease"],
  },
  {
    _id: ID(2),
    createdDate:  new Date("2017-01-01"),
    createdBy:    ID(2),
    name:         "Robeson Office Building",
    description:  "Old office building on Main St.",
    acreage:      0.5,
    county:       "Cumberland",
    state:        "NC",
    pinNumbers:   ["123-45-678"],
    leaseIds:       [ID(3)],
    tags:         ["commercial", "renovating"],
  },
  {
    _id: ID(3),
    createdDate:  new Date("2017-06-01"),
    createdBy:    ID(1),
    name:         "Industrial Complex",
    description:  "Manufacturing building off the highway",
    acreage:      5,
    county:       "Cumberland",
    state:        "NC",
    pinNumbers:   ["123-45-678"],
    leaseIds:     [],
    mediaIds:     [ID(10)],
    tags:         ["commercial"],
  },
]);

