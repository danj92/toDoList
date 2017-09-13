import React, {Component} from 'react';
import List from './List'



export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: '',
            items: []
        }
    }

    onChangeInput(event){
        this.setState({
            term: event.target.value
        });
        console.log(event.target.value)
    }

    onSubmitInput(event) {
        event.preventDefault();
        console.log('WYSLANO');
        this.setState({
           term: '',
           items: [...this.state.items, this.state.term],
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmitInput.bind(this)}>
                    <input value={this.state.term} onChange={this.onChangeInput.bind(this)} />
                    <button>Submit</button>
                </form>

                <List items={this.state.items} />

            </div>
        )
    }

}

