import { Actions, ActionConst } from 'react-native-router-flux';
import store from '../utils/storage';
import {
    CONFIRM_SCENE,
    MENU_SCENE,
    ORDER_SCENE,
    LOCATION_SCENE,
    TIMER_SCENE,
    COMPANIES_SCENE,
    ABOUT_SCENE,
    DIALOG_SCENE,
    INIT_SCENE,
    PREVIEW_ORDER_SCENE,
} from '../scene/sceneConstant.js';

export function changePage(page, save_to_storage = true) {
    if (save_to_storage) store.save('state', page);

    switch (page) {
        case INIT_SCENE:
            Actions.register({ type: ActionConst.RESET });
            break;
        case CONFIRM_SCENE:
            Actions.confirm({ type: ActionConst.RESET });
            break;
        case COMPANIES_SCENE:
            Actions.companies({ type: ActionConst.RESET });
            break;
        case MENU_SCENE:
            Actions.menu();
            break;
        case ORDER_SCENE:
            Actions.order({ type: ActionConst.RESET });
            break;
        case LOCATION_SCENE:
            Actions.location();
            break;
        case TIMER_SCENE:
            Actions.timer();
            break;
        case DIALOG_SCENE:
            Actions.dialog();
            break;
        case ABOUT_SCENE:
            Actions.about();
            break;
        case PREVIEW_ORDER_SCENE:
            Actions.order({ type: ActionConst.RESET });
            break;
        default:
            Actions.register({ type: ActionConst.RESET });
            break;
    }
}
