import * as Schemas from './Schemas';
import Realm from 'realm';

let Repository = new Realm({
    schema: [Schemas.KeyValueSchema],
});
export default Repository;
