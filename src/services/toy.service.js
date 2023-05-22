import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

function query({txt , sort , inStock}) {
    return storageService.query(STORAGE_KEY)
    .then(toys =>{
        if (txt){
            const regExp = new RegExp(txt, 'i')
            toys = toys.filter(toy => regExp.test(toy.name))
        }
        if (sort){
            if(sort==='name'){
                toys.sort((a, b) => a.name.localeCompare(b.name))
            }else if (sort === 'price'){
                toys.sort((a, b) => a.price - b.price)
            }else if (sort === 'createdAt'){
                toys.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            }
        }
        if (inStock){
            toys=toys.filter(toy => toy.inStock)
        } 
        return toys
    } )
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}
function getEmptyToy() {
    return {
        createdAt: Date.now(),
        name: '',
        price: '',
        inStock: true
    }
}
function _createToys() {
    let toys = storageService.loadFromStorage(STORAGE_KEY)
    if (!toys || toys.length === 0) {
        toys = [
            {
                _id: 'a100',
                name: 'Ball',
                price: '20',
                inStock: true,
                createdAt: 1684410175422
            },
            {
                _id: 'a101',
                name: 'Puzzle',
                price: '50',
                inStock: false,
                createdAt: 1684310175422
            },
            {
                _id: 'a102',
                name: 'Doll',
                price: '40',
                inStock: true,
                createdAt: 1684410174422
            }
        ]
    }

    storageService.save(STORAGE_KEY, toys)
}
_createToys()



