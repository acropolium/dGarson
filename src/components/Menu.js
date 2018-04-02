import React, { Component } from 'react'
import HeaderBlock from './HeaderBlock'
import { View } from './BaseComponents'
import RenderMenu from './Menu/RenderMenu'
import RenderMenuFooter from './Menu/RenderMenuFooter'
import LocationChooser from './CustomComponents/LocationChooser'
import styles from '../styles/components/Menu/MenuStyles'
import { ABOUT_SCENE } from '../scene/sceneConstant.js'

export default class Menu extends Component {
    constructor(props) {
        super(props)
    }

    aboutAs = () => {
        this.props.changePage(ABOUT_SCENE, false)
    }

    render() {
        return (
            <View style={styles.menuContainer}>
                <View style={styles.menuHeaderContainer}>
                    <HeaderBlock
                        aboutAs={this.aboutAs}
                        company_info={this.props.company_info}
                        centerTitle={this.props.company_info.name}
                        currentLocation={this.props.current_location}
                        backButton
                    />
                </View>

                <View style={styles.menuItemsContainer}>
                    <RenderMenu
                        removeOrderItem={this.props.removeOrderItem}
                        onRefresh={() =>
                            this.props.menuActions.companysMenu(
                                this.props.company_id,
                                true
                            )
                        }
                        addOrderItem={this.props.addOrderItem}
                        changeOrderItemAddition={
                            this.props.changeOrderItemAddition
                        }
                        order_draft={this.props.order_draft}
                        data={Object.values(this.props.menu || {})}
                    />
                </View>

                <View style={styles.menuFooterContainer}>
                    <LocationChooser
                        changePage={this.props.changePage}
                        company_info={this.props.company_info}
                        currentLocation={this.props.current_location}
                    />
                    <RenderMenuFooter
                        setOrder={this.props.setOrder}
                        company_id={this.props.company_id}
                        total_price={this.props.total_price}
                        order_draft={this.props.order_draft}
                        changePage={this.props.changePage}
                    />
                </View>
            </View>
        )
    }
}
