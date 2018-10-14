import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGame } from "../../actions/game";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class LoadGame extends Component {
  state = {
    gameName: "",
  };

  onSubmit = e => {
    e.preventDefault();
    const { gameName } = this.state;
    this.props.loadGame(gameName);
  };

  render() {
    const { gameName } = this.state;
    return (
      <div style={{ padding: "10px" }}>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="gameName">Game Name</Label>
            <Input
              type="text"
              name="gameName"
              id="gameName"
              placeholder="Enter game name"
              value={gameName}
              onChange={e => this.setState({ gameName: e.target.value })}
            />
          </FormGroup>
          <Button type="submit" color="primary" size="lg" block>Load game</Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { loadGame })(LoadGame);
