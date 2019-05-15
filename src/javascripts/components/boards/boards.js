import boardData from '../../helpers/data/boardsData';
import util from '../../helpers/util';
import pins from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';


const seePinDiv = (e) => {
  const boardId = e.target.closest('.card').id;
  console.error('wrtesdfdg', boardId);
  document.getElementById('boards-page').classList.add('hide');
  document.getElementById('pins-page').classList.remove('hide');
  pins.initPins(boardId);
};

const bindEvents = () => {
  const allButtons = document.getElementsByClassName('see-pins');
  for (let i = 0; i < allButtons.length; i += 1) {
    allButtons[i].addEventListener('click', seePinDiv);
  }
};

const boardsDomStringBuilder = (boardsCard) => {
  let domString = '';
  boardsCard.forEach((card) => {
    domString += '<div class = "col-3">';
    domString += `<div id='${card.id}' class="card p-2">`;
    domString += '<div class = "card-body">';
    domString += `<h5 class = "card-title">${card.name}</h5>`;
    domString += `<button class = "btn btn-outline-danger see-pins">${card.pins.length}</button>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('user-boards', domString);
  bindEvents();
};
const initBoards = () => {
  boardData.loadBoards()
    .then(response => pinsData.getPinsForEachBoard(response.data.boards))
    .then((boardsWithPins) => {
      boardsDomStringBuilder(boardsWithPins);
    })
    .catch(err => console.error('error from loadBoards', err));
};

export default { initBoards };
