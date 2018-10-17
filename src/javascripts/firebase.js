import * as firebase from "firebase";
import gameModel from "./models/game";

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

export const addGame = (name, teams, cards, timePerRound, drawing) => {
  let model = gameModel(
    name,
    teams,
    timePerRound,
    cards,
    drawing,
    firebase.database.ServerValue.TIMESTAMP
  );
  return new Promise((resolve, reject) => {
    database
    .ref(`/games`)
    .once("value")
    .then(res => {      
      if (res.hasChild(name)) {
        throw new Error('Game with this name already exists');
      }
      database
      .ref("/games")
      .child(name)
      .set(model);
      resolve();
    })
    .catch(error => {
      reject(error);
    })
  });
};

export const getGame = async gameName => {
  return new Promise((resolve, reject) => {
    database
    .ref(`/games/${gameName}`)
    .once("value")
    .then(res => {
      resolve(res.val());
    })
    .catch(error => {
      reject(error);
    })
  });
};

export const getCards = (cardSet) => {
  return database.ref(`/cards/${cardSet || 'default'}`).once("value");
};

export const addCards = (cardSetName, id, textArray) => {
  return new Promise((resolve, reject) => {
    database
      .ref(`/cards/${cardSetName}/${id}`)
      .once("value")
      .then(data => {
        const cards = data.val() || [];
        textArray.forEach(card => {
          cards.push(card);
        });
        database
          .ref(`/cards/${cardSetName}/${id}`)
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
        const game = data.val() || [];
        const teamIndex = game.teams.findIndex(team => team.name === teamName);
        const updatedTeam = {
          ...game.teams[teamIndex],
          position: Math.min(game.teams[teamIndex].position + Number(fieldsNumber), 50)
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
            resolve(updatedTeam);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};
