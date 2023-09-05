var height = 6;
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;



var word = 'SQUID';

window.onload = function(){
    intialize();
}

function intialize (){
    for (let r = 0; r < height; r++ ){
        for (let c = 0; c < width; c++){
            // <span id='0-0' class='title'> </span>
            let tile = document.createElement('span');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            tile.innerText = '';
            document.getElementById('board').appendChild(tile);
        }
    }

    // listen for key press
    document.addEventListener('keyup', (e) => {
        if (gameOver) return;

        // alert(e.code);
        if ('KeyA' <= e.code && e.code <= 'KeyZ'){
            if (col < width){
                let current_tile = document.getElementById(row.toString() + '-' + col.toString());
                if (current_tile.innerText == ''){
                    current_tile.innerText = e.code[3];
                    col += 1;
                }
            }
        }

        else if (e.code == 'Backspace'){
            if (0 < col && col <= width){
                col -= 1;
            }
            let current_tile = document.getElementById(row.toString() + '-' + col.toString());
            current_tile.innerText = '';
        }

        else if (e.code == 'Enter'){
            update();
            row += 1;
            col = 0;
        }

        if (!gameOver && row == height){
            gameOver = true;
            document.getElementById('answer').innerText = word;
        }
    })
}

function update() {
    let correct = 0;

    let lettercount = {};
    for (let i = 0; i < word.length; i++){
        letter = word[i];
        if(lettercount[letter]){
            lettercount[letter] += 1;
        }
        else{
            lettercount[letter] = 1;
        }
    }

    // first iteration check all the correct ones
    for (let c = 0; c < width; c++) {
        let current_tile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = current_tile.innerText;

        // Is it in the correct position?
        if (word[c] == letter) {
            current_tile.classList.add('correct');
            correct += 1;
            lettercount[letter] -= 1;
        } 
        if (correct == width) {
            gameOver = true;
        }
    }

    // Go again and mark wrong positions
    for (let c = 0; c < width; c++) {
        let current_tile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = current_tile.innerText;

        if (!current_tile.classList.contains('correct')) {
            // Is it in the word?
            if (word.includes(letter) && lettercount[letter] > 0) { 
                current_tile.classList.add('present');
                lettercount[letter] -= 1;
            } 
            // Not in the word
            else {
                current_tile.classList.add('absent');
            }
        }
        
    }

}

