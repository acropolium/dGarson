import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {KeyboardWrapper, FlatList} from "../BaseComponents";
import MenuItem from './MenuItem';


export default class RenderMenu extends Component {
    constructor(props){
        super(props);
    };
    render() {
        
        return (
            <KeyboardWrapper>
                <FlatList 
                    data={this.props.data} 
                    renderItem={(item) => <MenuItem {...this.props} item={item}/> }
                />
            </KeyboardWrapper>
        );
  }
}

RenderMenu.propTypes = {
    data: PropTypes.array.isRequired,
    
};
