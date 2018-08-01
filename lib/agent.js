'use strict'

module.export = function(AgentModel) {
    function findById(id) {
        return AgentModel.findById(id)
    }

    return {
        findById
    }
}