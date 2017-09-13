import React, {Component} from 'react';

export default class List extends Component {
    render() {
        return (
            <div>
                {this.props.items.map((item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })}
            </div>

        )
    }
}