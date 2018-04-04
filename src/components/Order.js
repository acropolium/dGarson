import React, { PropTypes, Component } from 'react'
import I18n from '../services/translate.js'
import HeaderBlock from './HeaderBlock'
import { KeyboardWrapper, View } from './BaseComponents'
import styles from '../styles/components/OrderStyle'
import OrderList from './Order/OrderList'
import OrderElement from './Order/OrderListElement/OrderElement'
import OrderStatus from './Order/OrderStatus'
import OrderFooter from './Order/OrderFooter'
import Spinner from './Spinner'
import { MENU_SCENE } from '../scene/sceneConstant.js'
import {
    ORDER_PAYED,
    ORDER_DRAFT,
    ORDER_CANCEL
} from '../reducers/constOrderState.js'

export default class Order extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.readOrder()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.needUpdateFromServer) {
            this.readOrder()
        }
    }

    readOrder = () => {
        if (this.props.order_state != ORDER_DRAFT && !this.props.from_company) {
            this.getOrder()
        }
    }

    makeOrder = async () => {
        if (this.props.spinnerShow) return

        let desired_time = this.props.order.desired_time
        if (!desired_time) {
            desired_time = 15
        }

        let body = {
            company_id: this.props.current_company_id,
            desired_time,
            items: this.props.order_item,
            location_id: this.props.currentLocation || false
        }

        this.props.orderActions
            .makeOrder(body, this.props.current_company_id)
            .catch(error => {
                this.props.dialogActions.dialogShow({
                    title: I18n.t('server_error'),
                    message: error.message
                })
            })
    }

    getOrder = (reload_lister = false) => {
        this.props.orderActions
            .getOrderForCompany(this.props.current_company_id)
            .catch(error => {
                this.props.dialogActions.dialogShow({
                    title: I18n.t('server_error'),
                    message: error.message
                })
            })
    }

    doCancel = () => {
        this.props.orderActions
            .cancelOrder(this.props.order_id, this.props.current_company_id)
            .catch(error => {
                this.props.dialogActions.dialogShow({
                    title: I18n.t('server_error'),
                    message: error.message
                })
            })
    }

    showCancelConfirm = () => {
        this.props.dialogActions.dialogShow({
            type: 'confirm',
            title: I18n.t('order_cancel_title'),
            message: I18n.t('order_cancel_message'),
            callback: this.doCancel,
            ok_backgroundColor: '#e65048'
        })
    }

    goBack = () => {
        if (
            this.props.order_state == ORDER_CANCEL ||
            this.props.order_state == ORDER_PAYED
        ) {
            this.props.orderActions.setOrder({}, 'flush')
        }

        this.props.changePage(MENU_SCENE)
    }

    aboutAs = () => {
        this.props.changePage(ABOUT_SCENE, false)
    }

    render() {
        let backButton =
            [ORDER_DRAFT, ORDER_CANCEL, ORDER_PAYED].indexOf(this.props.order_state) !== -1
                ? this.goBack
                : false

        return (
            <View style={styles.wrap}>
                <Spinner show={this.props.spinnerShow} />
                <View>
                    <HeaderBlock
                        currentLocation={this.props.currentLocation}
                        aboutAs={this.aboutAs}
                        company_info={this.props.company_info}
                        centerTitle={
                            I18n.t('your_order') +
                            (this.props.order_id
                                ? ' #' + this.props.order_id
                                : '')
                        }
                        backButton={backButton}
                    />
                </View>

                <KeyboardWrapper style={styles.keyboard_wrapper}>
                    <OrderList
                        data={this.props.order_item} 
                        renderItem={item => <OrderElement currency={ this.props.currency} item={item} />}
                    />
                </KeyboardWrapper>

                <OrderStatus
                    currentLocation={this.props.currentLocation}
                    company_info={this.props.company_info}
                    orderState={this.props.order_state}
                    order={this.props.order}
                    companyPhone={this.props.company_info.phone}
                    goBack={this.goBack}
                />

                <OrderFooter 
                    orderState={this.props.order_state}
                    showCancelConfirm={this.showCancelConfirm}
                    makeOrder={this.makeOrder}
                    orderCost={this.props.order_cost}
                    currency={this.props.currency}
                />
            </View>
        )
    }
}
