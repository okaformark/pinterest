import axios from 'axios';

const loadPinsFromBoard = boardId => new Promise((resolve, reject) => {
  axios.get('../db/pins.json')
    .then((response) => {
      const allPins = response.data.pins;
      console.error('hey', boardId);
      const matchingPins = allPins.filter(pin => pin.boardId === boardId);
      resolve(matchingPins);
    })
    .catch(err => reject(err));
});

const getPinsForEachBoard = boards => new Promise((resolve, reject) => {
  axios.get('../db/pins.json')
    .then((response) => {
      const { pins } = response.data;
      const boardsWithPins = boards.map((board) => {
        const newBoard = board;
        const matchingPins = pins.filter(pin => pin.boardId === board.id);
        newBoard.pins = matchingPins;
        return newBoard;
      });
      resolve(boardsWithPins);
    })
    .catch(err => reject(err));
});
export default { loadPinsFromBoard, getPinsForEachBoard };
