function jsonToElixir(json, root_name = '') {


    var json = JSON.parse(json)

    return get_json_structures(json, root_name).map((structure) => {
        return  write_a_elx_structure(structure)
    }).reduce((val1, val2) => val1 + '\n\n' + val2)  

    function get_json_structures(data, name, structures = []){

        var structure = {
            name,
            fields: []
        }

        Object.keys(data).map((key) => {
            if (typeof data[key] == "object" && data[key] != null) {
                get_json_structures(data[key], key, structures)
            }
            structure.fields.push(key)
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

}

