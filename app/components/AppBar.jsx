import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
// import Login from './Login';

import { Menu, Icon, Label } from 'semantic-ui-react'

import firebase from 'firebase'


const style = {margin: 5, color: 'white'};

export default class AppBar extends React.Component {

  constructor () {
    super()
    this.state = {
      activeItem: 'home',
      mood: '',
      logged: false,
      open: false,
      displayName: null,
      email: null,
      userPhoto: null,
      uid: null,
      providerData: null,
    }
    this.signIn.bind(this)
    this.signOut.bind(this)
  }

  componentDidMount () {
    if (firebase.auth().currentUser) {
      let user = firebase.auth().currentUser.providerData[0]
      this.setState({
        displayName: user.displayName,
        email: user.email,
        userPhoto: user.photoURL,
        uid: user.uid,
        providerData: user.providerData,
        logged: true
      })
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  signIn = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider)
    let user = firebase.auth().currentUser.providerData[0]
    this.setState({
      displayName: user.displayName,
      email: user.email,
      userPhoto: user.photoURL,
      uid: user.uid,
      providerData: user.providerData,
      logged: true
    })
    console.log("User has logged in")
  }

  signOut = () => {
    firebase.auth().signOut()
    this.setState({
      logged: false,
      displayName: null,
      email: null,
      userPhoto: null,
      uid: null,
      providerData: null,
    })
    console.log('User is now logged out')
  }

  render() {
    return (
      <div>
        <Menu color='yellow' inverted>
          <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='add a memory' active={this.state.activeItem === 'add a memory'} onClick={this.handleItemClick} />
          <Menu.Item name='show all my pictures' active={this.state.activeItem === 'show all my pictures'} onClick={this.handleItemClick} />
          <Menu.Item name='show a random picture' active={this.state.activeItem === 'show a random picture'} onClick={this.handleItemClick} />
          <Menu.Item position='right'>
            { this.state.logged ?
              <Label as='a' image>
                <img src={this.state.userPhoto} />
                Joe
              </Label> :
              <Icon name='user' /> 
            }
          </Menu.Item>
        </Menu>

        {/*<nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Rainy Day</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active"><a href="/choose">Home</a></li>
                <li><a href="/newEntry">Add A Memory</a></li>
                <li><a href="/showMyPictures">Show All My Pictures</a></li>
                <li><a href="/showMyPicture">Show a Random Picture</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  { 

                    this.state.logged ? 
                      <div>
                        <Avatar
                          src={this.state.userPhoto}
                          size={30}
                          style={style}
                          />
                        <span style={{color: 'white'}}>Hi, {this.state.displayName}</span>
                        <FlatButton label="Logout" style={style} onClick={this.signOut} />
                      </div>
                    : 
                      <FlatButton label="Login" style={style} onClick={this.signIn} />
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>*/}

      </div>
    )
  }
}

