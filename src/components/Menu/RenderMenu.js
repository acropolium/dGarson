import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardWrapper, FlatList } from '../BaseComponents'
import MenuItem from './MenuItem'

export default class RenderMenu extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <KeyboardWrapper>
                <FlatList
                    onRefresh={this.props.onRefresh}
                    data={this.props.data}
                    renderItem={item => (
                        <MenuItem
                            removeOrderItem={this.props.removeOrderItem}
                            addOrderItem={this.props.addOrderItem}
                            changeOrderItemAddition={
                                this.props.changeOrderItemAddition
                            }
                            order_draft={this.props.order_draft}
                            item={item}
                        />
                    )}
                />
            </KeyboardWrapper>
        )
    }
}

RenderMenu.propTypes = {
    data: PropTypes.array.isRequired
}
