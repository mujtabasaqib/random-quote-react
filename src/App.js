
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import 'animate.css/animate.min.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      quote: 'Why then the world is mine oyster which I with sword will open',
      author: 'William ShakeSpeare',
      enableClass: false
    }

    this.handleApiCallAndSetState = this.handleApiCallAndSetState.bind(this);
    this.classEnabler = this.classEnabler.bind(this);
  }

  handleApiCallAndSetState(){
    fetch('https://api.quotable.io').then
    (response => response.json()).then(data => {
      // Process the fetched data
      console.log(data);

      //setting state
      this.setState({
        quote: data.content, //recieved datas value
        author: data.author  //recieved datas value
        //enableClass: false //enable this class from here
      });
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
  
  componentDidMount(){
    //add fetch call here and setState
    //this.handleApiCallAndSetState();
  }

  classEnabler(){
    this.setState({
      enableClass: true
    });

    //for updating content after the animation ends
    setTimeout(() => {this.setState({
      quote: 'New Quote',
      author: 'New author',
      enableClass: false
      
    })},1870);
  }

  render(){

    return(
      <div id="wrapper" className={this.state.enableClass ? 'animate__animated animate__swing': 'simple'}>
        <div id="quote-box" className={this.state.enableClass ? 'animate__animated animate__hinge' : 'animate__animated animate__bounceInDown'}>
          <p id="text"><FontAwesomeIcon icon={faQuoteLeft} /> {this.state.quote}</p><br/>
          <p id="author">- {this.state.author}</p>
          <a id="tweet-quote" className='btn btn-sm btn-primary' href="twitter.com/intent/tweet" target="_blank"><FontAwesomeIcon icon={faTwitter} /> Tweet</a>
          <button id="new-quote" className='btn btn-sm' onClick={this.classEnabler}>New Quote</button>
        </div>
      </div>
    )
  }
}

export default App;