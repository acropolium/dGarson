import Storage from '../realm/Repository'
import { KEY_VALUE } from '../realm/Constants'

let store = {
    get: key => {
        if (!Array.isArray(key)) {
            let result = Storage.objects(KEY_VALUE.KEY_VALUE_SCHEMA).filtered(
                'key = $0',
                key
            )[0]
            if (
                !result ||
                typeof result !== 'object' ||
                !result.hasOwnProperty('value')
            ) {
                return null
            }

            return JSON.parse(result.value)
        }
    },

    save: (key, value) => {
        console.log('SAVE TO REALM', key, value)
        Storage.write(() => {
            Storage.create(
                KEY_VALUE.KEY_VALUE_SCHEMA,
                { key: key, value: JSON.stringify(value) },
                true
            )
        })
    },

    delete: key => {
        return Storage.write(() => {
            let data = Storage.objects(KEY_VALUE.KEY_VALUE_SCHEMA).filtered(
                'key = $0',
                key
            )
            Storage.delete(data)
        })
    },

    updateStore: (companyID, storeName, updateData) => {
        let updates = store.get(storeName)
        updates = updates ? updates : {}
        updates[companyID] = updateData
        store.save(storeName, updates)
    },


    getForArray: keys => {
        let storageData = {}

        keys.forEach(key => {
            let value = store.get(key)

            if (typeof value !== 'undefined' && value !== null) {
                storageData[key] = value
            }
        })

        return storageData
    }
}



export default store
