#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."

SCHEMA_FILES=$(find $SCRIPT_DIR/schema -name "*.json")

quicktype=$SCRIPT_DIR/node_modules/.bin/quicktype

gen_python() {
  local output="$SCRIPT_DIR/../pycommon/remcommon/models_gen.py"
  local field_output="$SCRIPT_DIR/../pycommon/remcommon/fieldnames_gen.py"
  cat <<EOH > $output
# THIS FILE IS GENERATED FROM models/$0
# DO NOT EDIT THIS FILE!
EOH

  $quicktype --src-lang schema --lang python --python-version 3.7 $SCHEMA_FILES >> $output
  # This generates the module that has constants for each field name to get some semblance of static
  # checking of field names with Mongo docs.
  (cd $SCRIPT_DIR; python3 $SCRIPT_DIR/fieldnames.py > $field_output)
}

gen_typescript() {
  local output="$SCRIPT_DIR/../webapp/src/model/models.gen.ts"

  cat <<EOH > $output
/*
 * THIS FILE IS GENERATED FROM models/$(basename $0)
 * DO NOT EDIT THIS FILE!
 */
// tslint:disable

import { ObjectID } from "bson";

EOH

  $quicktype --src-lang schema --lang typescript --just-types $SCHEMA_FILES >> $output
  # Change OID to ObjectId since we deserialize with EJSON in the webapp.
  sed -i -Ee 's/OID([^ ])/ObjectID\1/' $output
}

gen_go() {
  local output="$SCRIPT_DIR/../gocommon/models.gen.go"

  { cat <<EOH ; $quicktype --src-lang schema --lang go --package gocommon --just-types $SCHEMA_FILES ; } | gofmt > $output
package gocommon

// THIS FILE IS GENERATED FROM models/$(basename $0)
// DO NOT EDIT THIS FILE!

EOH
}

gen_python
gen_typescript
gen_go
