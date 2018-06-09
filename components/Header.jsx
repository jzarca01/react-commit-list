import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';

const defaultStyle = {
  marginLeft: 20
};

class Header extends Component {

  render() {
    return (
      <header className="header">
          <AppBar title="WishiGithub" showMenuIconButton={false}/>
          <h1 style={defaultStyle} >A prettified list of commits</h1>
      </header>
    );
  }
}

export default Header;
