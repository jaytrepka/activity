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
    const splittedCards = text.split(",");
    const valueCards = splittedCards.map(card => ({
      text: card.substr(0, card.length - 3),
      value: card.substr(card.length - 2, 1),
    }))

    addCards(cardSetName, selectedCategory, valueCards);
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
