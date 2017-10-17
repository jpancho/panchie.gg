import React, {Component} from 'react';
import './App.css';
import {Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <Form />
        </p>
      </div>
    );
  }
}

class SummonerInfo extends Component {
  render() {
    const URL = "https://ddragon.leagueoflegends.com/cdn/7.20.3/img/profileicon/";
    if (this.props.name) {
      return (
        <div className="Summoner Info">
          <h4>{'Summoner: ' + this.props.name}</h4>
          <h4>{'Level: ' + this.props.summonerLevel}</h4>
          <h4><img className="image"
                   src={URL + this.props.profileIconId + ".png"} />
          </h4>
        </div>
      )
    } else {
      return (
        <div />
      )
    }
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
        profileIconId: '',
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
    axios.get(`https://localhost:3001/api/${this.state.value}`)
      .then(res => {
        console.log(res);
        this.setState({
          summoner: res.data
        })
      })
      .catch(err => {
        console.log('Error fetching and parsing data', err);
      });
  }

  render() {
    return (
      <div className="Form col-md-6 col-md-offset-3">
        <Jumbotron>
          <form onSubmit={this.handleSubmit}>
            <input type="text"
                   placeholder="Enter Summoner.."
                   value={this.state.value}
                   onChange={this.handleChange} />
            <input type="submit"
                   value="Submit" />
          </form>
          <SummonerInfo name={this.state.summoner.name}
                        summonerLevel={this.state.summoner.summonerLevel}
                        profileIconId={this.state.summoner.profileIconId} />
        </Jumbotron>
      </div>
    );
  }
}

export default App;
