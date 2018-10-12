import * as firebase from "firebase";
import cardsModel from "./models/cards";
import gameModel from "./models/game";
import teamsModel from "./models/teams";

let database;
export const init = () => {
  let config = {
    apiKey: "AIzaSyAJfOnSp_4mKe48SzqPycF6OUcZ9c2CGog",
    authDomain: "activity-jay.firebaseapp.com",
    databaseURL: "https://activity-jay.firebaseio.com",
    storageBucket: "activity-jay.appspot.com",
    messagingSenderId: "781584426994"
  };
  firebase.initializeApp(config);
  database = firebase.database();
};

// export const getGames = () => {
//     return database.ref('/games').once('value')
// }

export const addGame = (name, teams, timePerRound) => {
  // let key = database.ref('/').push().key
  // console.log('key', key)
  let model = gameModel(
    name,
    teams,
    timePerRound,
    firebase.database.ServerValue.TIMESTAMP
  );
  // return database.ref('/'+ key).set(model)
  database
    .ref("/games")
    .child(name)
    .set(model);
};

export const getGame = gameName => {
  return database.ref(`/games/${gameName}`).once("value");
};

export const getCards = () => {
  return database.ref(`/cards`).once("value");
};

export const addCards = (id, textArray) => {
  return new Promise((resolve, reject) => {
    database
      .ref(`/cards/${id}`)
      .once("value")
      .then(data => {
        console.log("add", data.val());
        let cards = data.val() || [];
        // let key = database.ref(`/cards/${id}`).push().key;
        textArray.forEach(text => {
          cards.push({ text });
        });
        database
          .ref(`/cards/${id}`)
          .set(cards)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};

export const changeTeamPosition = (gameName, teamName, fieldsNumber) => {
  return new Promise((resolve, reject) => {
    database
      .ref(`/games/${gameName}`)
      .once("value")
      .then(data => {
        console.log("add", data.val());
        let game = data.val() || [];
        // let key = database.ref(`/cards/${id}`).push().key;
        const teamIndex = game.teams.findIndex(team => team.name === teamName);
        console.log("a", gameName, teamName, fieldsNumber, teamIndex, game);
        const updatedTeam = {
          ...game.teams[teamIndex],
          position: game.teams[teamIndex].position + Number(fieldsNumber)
        };
        const teams = [
          ...game.teams.slice(0, teamIndex),
          updatedTeam,
          ...game.teams.slice(teamIndex + 1)
        ];
        database
          .ref(`/games/${gameName}`)
          .set({ ...game, teams })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};
