import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetch, cancelRequest } from './actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nbClick: 0,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleClick() {
    this.setState(prevState => {
      const nbClick = prevState.nbClick + 1;

      this.props.doFetch(nbClick);

      return {
        nbClick,
      };
    });
  }

  handleCancel() {
    this.props.cancelRequest();
  }

  render() {
    const { issuedResponse, requestPending } = this.props;
    const { nbClick } = this.state;

    return (
      <div className="App">
        <div className="App-intro">
          <div>
            The current nb click is: {nbClick}
          </div>

          <div>
            Is a request pending ? {requestPending ? 'Yes' : 'No'}
          </div>

          <div>
            Issued response number: {issuedResponse}
          </div>

          <button onClick={this.handleClick}>
            Do request
          </button>

          <button onClick={this.handleCancel} disabled={!requestPending}>
            Cancel request
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  issuedResponse: state.test.issuedResponse,
  requestPending: state.test.request,
});

const mapDispatchToProps = {
  doFetch,
  cancelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
