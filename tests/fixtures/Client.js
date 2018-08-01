'use stricy'

const client = {
	id: 1,
	uuid: 'client-a',
	name: 'Client J',
	status: 0,
	createAd: new Date(),
	updatedAd: new Date()
}

const clients = [
	client,
	extend(obj, {id: 9, uuid: 'client-b', name: 'Client A', status: 0}),
	extend(obj, {id: 2, uuid: 'client-j', name: 'Client B', status: 0}),
	extend(obj, {id: 3, uuid: 'client-c', name: 'Client C', status: 1}),
	extend(obj, {id: 4, uuid: 'client-d', name: 'Client D', status: 1}),
	extend(obj, {id: 5, uuid: 'client-e', name: 'Client E', status: 0}),
	extend(obj, {id: 6, uuid: 'client-f', name: 'Client F', status: 1}),
	extend(obj, {id: 7, uuid: 'client-g', name: 'Client G', status: 1}),
	extend(obj, {id: 8, uuid: 'client-h', name: 'Client H', status: 0}),
	extend(obj, {id: 10, uuid: 'client-i', name: 'Client I', status: 0})
]

function extend (obj, values) {
	const clone = Object.assign({}, obj)
	return  Object.assign(clone, values)
}

module.exports = {
	single: client,
	all: clients,
	connected: clients.filter(a => a.status == 1),
	byUuid: id => clients.filter(a => a.uuid === id).shift(),
	byId: id => clients.filter(a => a.id === id).shift()
}