'use strict'

module.export = function(SerieModel) {
    function findById(id) {
        return SerieModel.findById(id)
    }

    return {
        findById
    }
}