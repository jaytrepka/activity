import React, { Component } from "react";

import { addCards } from "../../javascripts/firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const CATEGORIES = [
  "easyPantomime",
  "hardPantomime",
  "easyDrawing",
  "hardDrawing",
  "easySpeaking",
  "hardSpeaking"
];

class AddCards extends Component {
  state = {
    selectedCategory: CATEGORIES[0],
    text: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { selectedCategory, text } = this.state;

    addCards(selectedCategory, text.split(","));
    this.setState(() => ({ text: "" }));
  };
  render() {
    console.log("thisprop", this.props);
    const { selectedCategory, text } = this.state;

    return (
      <div className="container">
        <div>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="exampleSelect">Select avatar</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                value={selectedCategory}
                onChange={e =>
                  this.setState({ selectedCategory: e.target.value })
                }
              >
                {CATEGORIES.map(category => (
                  <option>{category}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="timePerRound">Time per round</Label>
              <Input
                type="text"
                name="timePerRound"
                id="timePerRound"
                placeholder="Enter time per round"
                value={text}
                onChange={e => this.setState({ text: e.target.value })}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default AddCards;
