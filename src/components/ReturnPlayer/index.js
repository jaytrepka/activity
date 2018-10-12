import React, { Component } from "react";

import { connect } from "react-redux";
import { moveTeam } from "../../actions/game";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

//moveTeam = (gameName, team, fields)
class ReturnPlayer extends Component {
  state = {
    selectedTeam: 0,
    fieldsNumber: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { selectedTeam, fieldsNumber } = this.state;
    const { game, moveTeam } = this.props;
    console.log("sub", game, this.state);
    moveTeam(game.name, game.teams[selectedTeam].name, fieldsNumber);
    this.setState(() => ({ selectedTeam: 0, fieldsNumber: "" }));
  };
  render() {
    console.log("thisprop", this.props);
    const { selectedTeam, fieldsNumber } = this.state;
    const { game } = this.props;
    console.log(
      "thispsrop",
      this.state,
      this.props,
      game.teams && game.teams[selectedTeam].name
    );

    return (
      <div className="container">
        {game.teams && (
          <div>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleSelect">Select avatar</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  value={selectedTeam}
                  onChange={e =>
                    this.setState({ selectedTeam: Number(e.target.value) })
                  }
                >
                  {game.teams.map((team, i) => (
                    <option value={i}>{team.name}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="fields">Time per round</Label>
                <Input
                  type="text"
                  name="fields"
                  id="fields"
                  placeholder="Enter time per round"
                  value={fieldsNumber}
                  onChange={e =>
                    this.setState({ fieldsNumber: e.target.value })
                  }
                />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ game, general }) => {
  return {
    game,
    general
  };
};
export default connect(
  mapStateToProps,
  { moveTeam }
)(ReturnPlayer);