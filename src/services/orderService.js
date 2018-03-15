import store from '../utils/storage';
const initialOrderStateKeys = ['order'];

export default class orderService{
    setProps (props, t=false) {
        this.props = props;

        if (t)
            console.log(props);

        return this;
    };

    addItem (item){
        this.props.orderActions.addItem(item);
    }

    removeItem (item, root_item_idx){
        this.props.orderActions.removeItem(item, root_item_idx);
    }

    changeItemAddition(root_item, root_item_idx, idx, operation){
        this.props.orderActions.changeItemAddition(root_item, root_item_idx, idx, operation);
    }

    resetOrder = async (state = 'cancel') =>{
        const { setOrder } = this.props.orderActions;
        let order = {state:state, cost:0};

        setOrder({order: order, draft:{}, price: {total:0}, desired_time: 15 });
        await store.save('order', this.get('order'));
    };

    setOrder = async (order) =>{

        
        const { setOrder } = this.props.orderActions;
        setOrder(order);
        await store.save('order', this.get('order'));
    };

    has = (key) => {
        return this.props.orderActions.hasKey(key);
    };

    get = (key, defaultValue = false) => {
        return this.props.orderActions.getDataByKey(key, defaultValue);
    };

    set = (props = {}) => {
        this.props.orderActions.setOrder(props);
    };

    loadInitialState = async () => {
        let storageData = {};

        for (let i=0; i<initialOrderStateKeys.length; i++){
            let key = initialOrderStateKeys[i];

            let value = await store.get(key);

            if (typeof value !== "undefined" && value !== null) {
                storageData[key] = value;
            }

        }

        if (Object.keys(storageData).length>0){
            if (storageData.hasOwnProperty('order')){
                storageData.state = storageData.order.state;
                storageData.desired_time = storageData.order.desired_time;
            }

            this.set(storageData);
        }

    };



}