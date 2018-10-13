import React, { Component } from "react";
// import SectionList from './section-list'
import { connect } from "react-redux";
import { createGame } from "../../actions/game";
import { loadCards } from "../../actions/cards";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const AVATARS = ["capybara", "penguin", "hippo", "dogCute", "dogUgly", "monkey"];

class CreateGame extends Component {
  state = {
    gameName: "",
    numberOfTeams: 2,
    teams: [...Array(5).keys()].map(team => ({
      name: `team${team + 1}`,
      avatar: AVATARS[team],
      position: 0
    })),
    timePerRound: 60
  };

  onSubmit = e => {
    e.preventDefault();
    const { gameName, numberOfTeams, teams, timePerRound } = this.state;
    this.props.createGame(
      gameName,
      teams.slice(0, numberOfTeams),
      timePerRound
    );
    this.props.loadCards();
  };
  render() {
    const { gameName, numberOfTeams, teams, timePerRound } = this.state;
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
          <FormGroup>
            <Label for="exampleSelect">Select number of teams</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              value={numberOfTeams}
              onChange={e =>
                this.setState({ numberOfTeams: Number(e.target.value) })
              }
            >
              {[...Array(4).keys()].map(option => (
                <option key={option + '12'}>{option + 2}</option>
              ))}
            </Input>
          </FormGroup>

          {[...Array(numberOfTeams).keys()].map(team => (
            <Row form key={team + '1'}>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="text"
                    name="text"
                    id="exampleEmail"
                    placeholder="Team name"
                    value={teams[team].name}
                    onChange={e => {
                      let modifiedTeams = [...teams];
                      modifiedTeams[team].name = e.target.value;
                      this.setState({ teams: modifiedTeams });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleSelect">Select avatar</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    value={teams[team].avatar}
                    onChange={e => {
                      let modifiedTeams = [...teams];
                      modifiedTeams[team].avatar = e.target.value;
                      this.setState({ teams: modifiedTeams });
                    }}
                  >
                    {AVATARS.map(avatar => (
                      <option key={avatar}>{avatar}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          ))}
          <FormGroup>
            <Label for="timePerRound">Time per round</Label>
            <Input
              type="text"
              name="timePerRound"
              id="timePerRound"
              placeholder="Enter time per round"
              value={timePerRound}
              onChange={e => this.setState({ timePerRound: e.target.value })}
            />
          </FormGroup>

          <Button type="submit">Submit</Button>
        </Form>
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
  { createGame, loadCards }
)(CreateGame);
