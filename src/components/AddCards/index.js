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
    cardSetName: 'default',
    selectedCategory: CATEGORIES[0],
    text: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { cardSetName, selectedCategory, text } = this.state;

    addCards(cardSetName, selectedCategory, text.split(","));
    this.setState(() => ({ text: "" }));
  };
  render() {
    const { cardSetName, selectedCategory, text } = this.state;

    return (
      <div className="container">
        <div>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="cardSet">Enter name of card set</Label>
              <Input
                type="text"
                name="cardSet"
                id="cardSet"
                placeholder="default"
                value={cardSetName}
                onChange={e => this.setState({ cardSetName: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Select category</Label>
              <Input
                type="select"
                name="select"
                id="category"
                value={selectedCategory}
                onChange={e =>
                  this.setState({ selectedCategory: e.target.value })
                }
              >
                {CATEGORIES.map(category => (
                  <option key={category}>{category}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="cards">Enter cards splitted by ,</Label>
              <Input
                type="text"
                name="cards"
                id="cards"
                placeholder="Enter time per round"
                value={text}
                onChange={e => this.setState({ text: e.target.value })}
              />
            </FormGroup>
            <Button type="submit" color="primary" size="lg" block>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default AddCards;
