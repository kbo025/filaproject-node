'use stricy'

const agent = {
	id: 1,
	uuid: 'Agent-a',
	name: 'Agent J',
	status: 0,
	createAd: new Date(),
	updatedAd: new Date()
}

const agents = [
	agent,
	extend(obj, {id: 9, uuid: 'Agent-b', name: 'Agent A', status: 0}),
	extend(obj, {id: 2, uuid: 'Agent-j', name: 'Agent B', status: 0}),
	extend(obj, {id: 3, uuid: 'Agent-c', name: 'Agent C', status: 1}),
	extend(obj, {id: 4, uuid: 'Agent-d', name: 'Agent D', status: 1}),
	extend(obj, {id: 5, uuid: 'Agent-e', name: 'Agent E', status: 0}),
	extend(obj, {id: 6, uuid: 'Agent-f', name: 'Agent F', status: 1}),
	extend(obj, {id: 7, uuid: 'Agent-g', name: 'Agent G', status: 1}),
	extend(obj, {id: 8, uuid: 'Agent-h', name: 'Agent H', status: 0}),
	extend(obj, {id: 10, uuid: 'Agent-i', name: 'Agent I', status: 0})
]

function extend (obj, values) {
	const clone = Object.assign({}, obj)
	return  Object.assign(clone, values)
}

module.exports = {
	single: agent,
	all: agents,
	connected: agents.filter(a => a.status == 1),
	byUuid: id => agents.filter(a => a.uuid === id).shift(),
	byId: id => agents.filter(a => a.id === id).shift()
}