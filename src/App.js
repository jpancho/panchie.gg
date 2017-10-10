import React, {Component} from 'react';
import './App.css';
import {Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';

class App extends Component {
    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    <Form/>
                </p>
            </div>
        );
    }
}

class SummonerInfo extends Component {
    render() {
        return (
            <div className="Summoner Info">
                <h3>{'Summoner: ' + this.props.name}</h3>
                <h3>{'Level: ' + this.props.summonerLevel}</h3>
            </div>
        );
    }
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            summoner: {
                name: '',
                summonerLevel: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:3001/api/${this.state.value}`)
            .then(response => {
                console.log(response);
                this.setState({
                    summoner: response.data
                })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }
    render() {
        return (
            <div className="Form">
                <Navbar>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <textarea value={this.state.value}
                                      onChange={this.handleChange}/>
                            <input type="submit"
                                   value="Submit"
                                   placeholder="Enter Summoner"/>
                        </label>
                    </form>
                </Navbar>
                <SummonerInfo name={this.state.summoner.name}
                              summonerLevel={this.state.summoner.summonerLevel}/>
            </div>
        );
    }
}

export default App;
