import React from 'react'
import PropTypes from 'prop-types'
import { FlatList as BaseFlatList } from 'react-native'

export default class FlatList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BaseFlatList
                ref={this.props.ref}
                data={this.props.data}
                onContentSizeChange={this.props.onContentSizeChange}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) =>
                    this.props.renderItem(item, index)
                }
                refreshing={this.props.refreshing || false}
                onRefresh={this.props.onRefresh}
                maxToRenderPerBatch={this.props.maxToRenderPerBatch}
                ItemSeparatorComponent={this.props.renderSeparator}
                ListHeaderComponent={this.props.renderHeader}
                ListFooterComponent={this.props.renderFooter}
                ListEmptyComponent={(item, index) =>
                    this.props.renderEmptyList(item, index)
                }
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={this.props.endReachedThreshold}
                horizontal={this.props.horizontal}
            />
        )
    }
}

FlatList.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired
    ]),
    renderItem: PropTypes.func.isRequired,
    refreshing: PropTypes.bool,
    endReachedThreshold: PropTypes.number,
    onRefresh: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    renderEmptyList: PropTypes.func,
    onEndReached: PropTypes.func,
    horizontal: PropTypes.bool,
    maxToRenderPerBatch: PropTypes.number
}

FlatList.defaultProps = {
    renderSeparator: () => {
        return null
    },
    renderHeader: () => {
        return null
    },
    renderFooter: () => {
        return null
    },
    onEndReached: () => {},
    onRefresh: () => {},
    renderEmptyList: () => {
        return null
    },
    endReachedThreshold: 0.5,
    horizontal: false
}
