import React, { Component } from "react";
// import SectionList from './section-list'
import { connect } from "react-redux";
import { createGame } from "../../actions/game";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const AVATARS = ["capybara", "armadillo", "penguin", "hippo", "dogCute", "dogUgly", "monkey"];

class CreateGame extends Component {
  state = {
    cardSet: 'default',
    drawing: true,
    error: false,
    gameName: "",
    numberOfTeams: 2,
    teams: [...Array(5).keys()].map(team => ({
      name: `team${team + 1}`,
      avatar: AVATARS[team],
      position: 0
    })),
    timePerRound: 60,
    validations: {
      cardSet: '',
      gameName: '',
      teams: [...Array(5).keys()].map(() => ''),
      timePerRound:  '',
    },
  };

  onSubmit = e => {
    e.preventDefault();
    const { cardSet, drawing, gameName, numberOfTeams, teams, timePerRound } = this.state;
    let validations = { ...this.state.validations };
    let valid = true;
    Object.keys(validations).forEach(key => {
      if (key !== 'teams') {
        if (validations[key] === 'invalid' || (validations[key] === '' && this.state[key].length < 1)) {
          valid = false;
          validations[key] = 'invalid';
        }
      } else {
        validations.teams.slice(0, numberOfTeams).forEach(teamIndex => {
          if (validations.teams[teamIndex] === 'invalid' || (validations.teams[teamIndex] === '' && this.state.teams[teamIndex].name.length < 1)) {
            valid = false;
            validations.teams[teamIndex] = 'invalid';
          }
        });
      }
    });
    if (!valid) {
      this.setState({ validations, error: true });
      setTimeout(() => this.setState({ error: false }), 2000);
      return;
    }
    this.props.createGame(
      gameName,
      teams.slice(0, numberOfTeams),
      timePerRound,
      cardSet,
      drawing,
    );
  };

  onInputChange = (key, value, validate = false) => {
    let validations = { ...this.state.validations };
    if (validate) {
      validations[key] = `${value.length > 0 ? '' : 'in'}valid`;
    }
    this.setState({ [key]: value, validations });
  };

  onTeamInputChange = (teamIndex, value, validate = false) => {
    const { teams } = this.state;
    let modifiedTeams = [...teams];
    modifiedTeams[teamIndex].name = value;
    
    let validations = { ...this.state.validations };
    if (validate) {
      validations.teams[teamIndex] = `${value.length > 0 ? '' : 'in'}valid`;
    }
    this.setState({ teams: modifiedTeams, validations });
  };

  isInputValid = (key) => {
    const { validations } = this.state;
    return validations[key] === 'valid';
  }
  isInputInvalid = (key) => {
    const { validations } = this.state;
    return validations[key] === 'invalid';
  }

  isTeamInputValid = (index) => {
    const { validations } = this.state;
    return validations.teams[index] === 'valid';
  }
  isTeamInputInvalid = (index) => {
    const { validations } = this.state;
    return validations.teams[index] === 'invalid';
  }

  render() {
    const { cardSet, drawing, error, gameName, numberOfTeams, teams, timePerRound, validations } = this.state;
    return (
      <div style={{ padding: "10px" }}>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="gameName">Game name</Label>
            <Input
              type="text"
              name="gameName"
              id="gameName"
              placeholder="Enter game name"
              value={gameName}
              onChange={e => this.onInputChange('gameName', e.target.value, true)}
              valid={this.isInputValid('gameName')}
              invalid={this.isInputInvalid('gameName')}
            />
          </FormGroup>
          <FormGroup>
            <Label for="teamsNumber">Number of teams</Label>
            <Input
              type="select"
              name="select"
              id="teamsNumber"
              value={numberOfTeams}
              onChange={e => this.onInputChange('numberOfTeams', Number(e.target.value))}
            >
              {[...Array(4).keys()].map(option => (
                <option key={option}>{option + 2}</option>
              ))}
            </Input>
          </FormGroup>

          {[...Array(numberOfTeams).keys()].map(team => (
            <Row form key={team}>
              <Col md={6}>
                <FormGroup>
                  <Label for="teamName">Team {team + 1} name</Label>
                  <Input
                    type="text"
                    name="text"
                    id="teamName"
                    placeholder="Team name"
                    value={teams[team].name}
                    onChange={e => this.onTeamInputChange(team, e.target.value, true)}
                    valid={this.isTeamInputValid(team)}
                    invalid={this.isTeamInputInvalid(team)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="avatar">Team {team + 1} avatar</Label>
                  <Input
                    type="select"
                    name="select"
                    id="avatar"
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
            <Label for="timePerRound">Time per round (s)</Label>
            <Input
              type="text"
              name="timePerRound"
              id="timePerRound"
              placeholder="Enter time per round"
              value={timePerRound}
              onChange={e => this.onInputChange('timePerRound', e.target.value, true)}
              valid={this.isInputValid('timePerRound')}
              invalid={this.isInputInvalid('timePerRound')}
            />
          </FormGroup>
          
          <FormGroup check style={{ marginBottom: '1rem' }}>
          <Label check>
            <Input type="checkbox" onChange={e => this.setState(prevState => ({ drawing: !prevState.drawing }))}
              checked={drawing}
              style={{ width: '1rem', height: '1rem' }}
            />Use device for drawing
          </Label>
        </FormGroup>

          <FormGroup>
            <Label for="cardSet">Card set (use 'default' for prepared dataset)</Label>
            <Input
              type="text"
              name="cardSet"
              id="cardSet"
              placeholder="Enter card set name"
              value={cardSet}
              onChange={e => this.onInputChange('cardSet', e.target.value, true)}
              valid={this.isInputValid('cardSet')}
              invalid={this.isInputInvalid('cardSet')}
            />
          </FormGroup>
          {error && <div className="error" style={{ marginBottom: '1rem', justifyContent: 'center' }}>You have to fill all inputs</div>}                        
          <Button type="submit" color="primary" size="lg" block>Create game</Button>
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
  { createGame }
)(CreateGame);
