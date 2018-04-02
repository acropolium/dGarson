import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { FlatList, View } from '../BaseComponents'
import CompanyItem from './CompanyItem'
import EmptyList from './EmptyList'

const CompanyList = props => {
    return (
        <FlatList
            data={props.data}
            refreshing={false}
            extraData={props.data}
            renderItem={(item, key) => {
                return (
                    <CompanyItem
                        dialogActions={props.dialogActions}
                        getCompanyMenu={props.getCompanyMenu}
                        key={key}
                        item={item}
                    />
                )
            }}
            onRefresh={props.onRefresh}
            renderEmptyComponent={() => {
                return <EmptyList />
            }}
        />
    )
}

CompanyList.propTypes = {
    data: PropTypes.array,
    onRefresh: PropTypes.func
}

export default CompanyList
