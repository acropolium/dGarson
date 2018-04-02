import React, { PropTypes, Component } from 'react'
import { ScrollView } from 'react-native'
import { Text, View, Image, FlatList } from './BaseComponents'
import { Actions } from 'react-native-router-flux'
import I18n from '../services/translate.js'
import styles from '../styles/components/AboutUsStyle'
import HeaderBlock from './HeaderBlock'
import InfoItem from './AboutAsComponents/InfoItem'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.companyInfo = this.props.company_info
    }

    goBack = async () => {
        Actions.pop()
    }

    render() {
        let curImage = this.companyInfo.logo
            ? { uri: this.companyInfo.logo }
            : require('../media/elements/no_photo_company.png')

        return (
            <View style={styles.allWrap}>
                <Image source={curImage} style={styles.backGroundImg} />

                <HeaderBlock
                    company_info={this.props.company_info}
                    currentLocation={this.props.current_location}
                    ref="header"
                    backButton={this.goBack}
                    centerTitle={I18n.t('aboutus_title')}
                />

                <View style={styles.wrap}>
                    <ScrollView>
                        <View style={styles.allWrap}>
                            <View style={styles.wrap_img}>
                                <Image
                                    style={styles.item_image}
                                    source={curImage}
                                />
                            </View>

                            <View>
                                <Text
                                    numberOfLines={2}
                                    style={[styles.textColor, styles.head]}>
                                    {this.companyInfo.name}
                                </Text>
                            </View>

                            <FlatList
                                data={this.companyInfo.locations}
                                renderItem={item => (
                                    <InfoItem
                                        pressTel={() => {
                                            {
                                                this.refs.header.handleClickUrl(
                                                    'tel:' + item.phone
                                                )
                                            }
                                        }}
                                        pressLocation={() => {
                                            this.refs.header.handleClickUrl(
                                                'geo:' +
                                                    item.lat +
                                                    ',' +
                                                    item.lng +
                                                    '?q=' +
                                                    item.lat +
                                                    ',' +
                                                    item.lng
                                            )
                                        }}
                                        item={item}
                                    />
                                )}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
