import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { moveTeam } from "../../actions/game";
import { setScreen } from "../../actions/general";
class ReturnPlayer extends Component {
  state = {
    isMoving: false,
    selectedTeam: 0,
    fieldsNumber: "",
  };

  onSubmit = async e => {
    e.preventDefault();
    const { selectedTeam, fieldsNumber } = this.state;
    const { game, moveTeam } = this.props;
    this.setState(() => ({ isMoving: true }));
    await moveTeam(game.name, game.teams[selectedTeam].name, fieldsNumber, true);
    this.setState(() => ({ selectedTeam: 0, fieldsNumber: "", isMoving: false }));
  };
  render() {
    const { selectedTeam, fieldsNumber, isMoving } = this.state;
    const { game, setScreen } = this.props;

    return (
      <div className="container">
        {game.teams && (
          <div>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleSelect">Select team</Label>
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
                    <option value={i} key={team.name}>{team.name}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="fields">Steps</Label>
                <Input
                  type="text"
                  name="fields"
                  id="fields"
                  placeholder="Enter number of steps (-x for going back)"
                  value={fieldsNumber}
                  onChange={e =>
                    this.setState({ fieldsNumber: e.target.value })
                  }
                />
              </FormGroup>
              <Button disabled={isMoving} type="submit">Submit</Button>
            </Form>
          </div>
        )}
        
        <Button disabled={isMoving} type="button" color="primary" onClick={() => setScreen('play')}>Go back</Button>
      </div>
    );
  }
}
const mapStateToProps = ({ game }) => {
  return {
    game
  };
};
export default connect(
  mapStateToProps,
  { moveTeam, setScreen }
)(ReturnPlayer);
