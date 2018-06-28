import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

export default class AutoCompleteExampleSimple extends Component {
    state = {
        dataSource: [],
    };

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />

                </MuiThemeProvider>
            </div>
        );
    }
}