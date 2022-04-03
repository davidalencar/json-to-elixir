const raw_data = require("../seed/test.json")


function get_json_structures(data, name, structures = []){

    var structure = {
        name,
        fields: []
    }

    Object.keys(data).map((key) => {
        if (typeof data[key] == "object") {
            get_json_structures(data[key], key, structures)
        } else {
            structure.fields.push(key)
        }
    })

    structures.push(structure)
    return structures
}

function format_fields(fields) {
   return fields.map((key) => ` :${key}`).toString().trim()
}

function write_a_elx_structure(structure){
    var module = `defmodule ${structure.name} do\n`
    module += `    defstruct [${format_fields(structure.fields)}]\n`
    module += 'end'

    return module
}

get_json_structures(raw_data, "customer").map((structure) => {
    console.log(write_a_elx_structure(structure))
})
