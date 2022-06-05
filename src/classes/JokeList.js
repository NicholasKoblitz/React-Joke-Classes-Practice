import React from "react";
import axios from "axios";
import Joke from './Joke'
import "../JokeList.css";

class JokeList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            jokes: [],
        numJokesToGet: 10
        }
        this.generateNewJokes = this.generateNewJokes.bind(this);
        this.vote = this.vote.bind(this);

    }


    async componentDidMount() {
        let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.state.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;
  
          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({jokes: j});
      } catch (e) {
        console.log(e);
      }
    }

    async componentDidUpdate() {
        let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.state.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;
  
          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({jokes: j});
      } catch (e) {
        console.log(e);
      }
    }

    generateNewJokes() {
        this.setState({jokes: []})
    }

    vote(id, delta) {
        this.setState(state => ({jokes: state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))}))
    }

    // let sorted = ;
    

    
    render() { 
        let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes)
        return (
            <div className="JokeList">
                <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                Get New Jokes
                </button>
      
            {sortedJokes.map(j => (
              <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
            ))}
          </div>
        );
    }


}

export default JokeList;