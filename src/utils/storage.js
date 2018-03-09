import Storage from "../realm/Repository";
import {KEY_VALUE} from "../realm/Constants";

export default {
    get: (key) => {
        if (!Array.isArray(key)) {
            let result = Storage.objects(KEY_VALUE.KEY_VALUE_SCHEMA).filtered(
                "key = $0",
                key
            )[0];
            if(!result || typeof result !== 'object' || !result.hasOwnProperty('value')){
                return null;
            }
            
            return JSON.parse(result.value);
        }
    },

    save: (key, value) => {
        console.log('SAVE TO REALM', key, value);
        Storage.write(() => {
            Storage.create(KEY_VALUE.KEY_VALUE_SCHEMA, {key: key, value: JSON.stringify(value)}, true);
        });
    },

    delete: (key) => {
        return Storage.write(() => {
            let data = Storage.objects(KEY_VALUE.KEY_VALUE_SCHEMA).filtered(
                "key = $0",
                key
            );
            Storage.delete(data);
        });
    }
}

