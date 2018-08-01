'use stricy'

const serie = {
	id: 1,
	uuid: 'serie-a',
    name: 'serie Test 1',
    status: 1,
    from: 1,
    to: 100,
	createAd: new Date(),
	updatedAd: new Date()
}

const series = [
	serie,
	extend(obj, {id: 2, uuid: 'serie-b', name: 'serie Test 2', status: 0, from: 1, to: 100}),
	extend(obj, {id: 3, uuid: 'serie-c', name: 'serie Test 3', status: 0, from: 101, to: 200}),
	extend(obj, {id: 4, uuid: 'serie-d', name: 'serie Test 4', status: 0, from: 201, to: 300}),
	extend(obj, {id: 5, uuid: 'serie-e', name: 'serie Test 5', status: 1, from: 301, to: 400}),
	extend(obj, {id: 6, uuid: 'serie-f', name: 'serie Test 6', status: 1, from: 401, to: 500}),
	extend(obj, {id: 7, uuid: 'serie-g', name: 'serie Test 7', status: 1, from: 501, to: 600}),
	extend(obj, {id: 8, uuid: 'serie-h', name: 'serie Test 8', status: 0, from: 601, to: 700}),
	extend(obj, {id: 9, uuid: 'serie-i', name: 'serie Test 9', status: 0, from: 701, to: 800}),
	extend(obj, {id: 10, uuid: 'serie-j', name: 'serie Test 10', status: 1, from: 801, to: 900})
]

function extend (obj, values) {
	const clone = Object.assign({}, obj)
	return  Object.assign(clone, values)
}

module.exports = {
	single: serie,
    all: series,
    conected: () => series.filter(a => a.status === 1),
	byUuid: id => series.filter(a => a.uuid === id).shift(),
	byId: id => series.filter(a => a.id === id).shift()
}