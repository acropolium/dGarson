import { Actions, ActionConst } from 'react-native-router-flux'
import store from '../utils/storage'
import {
    confirm,
    menu,
    order,
    location,
    timer,
    companies,
    about,
    dialog,
    init,
    previewOrder
} from '../scene/sceneConstant.js'

export function changePage(page, save_to_storage = true) {
    if (save_to_storage) store.save('state', page)

    switch (page) {
        case init:
            Actions.register({ type: ActionConst.RESET })
            break
        case confirm:
            Actions.confirm({ type: ActionConst.RESET })
            break
        case companies:
            Actions.companies({ type: ActionConst.RESET })
            break
        case menu:
            Actions.menu()
            break
        case order:
            Actions.order({ type: ActionConst.RESET })
            break
        case location:
            Actions.location()
            break
        case timer:
            Actions.timer()
            break
        case dialog:
            Actions.dialog()
            break
        case about:
            Actions.about()
            break
        case previewOrder:
            Actions.order({ type: ActionConst.RESET })
            break
        default:
            Actions.register({ type: ActionConst.RESET })
            break
    }
}
