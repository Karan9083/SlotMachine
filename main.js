
const prompt = require("prompt-sync")();

const  ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT= {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
};
const SYMBOLS_VALUES={
    A : 5,
    B : 4,
    C : 3,
    D : 2
};

const deposit = () =>{
while (true){
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount)

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount,try again.");
    } 
    else{
        return numberDepositAmount;
        }
    }
};

const getNumberofLine = () =>{
    while (true){
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberoflines = parseFloat(lines)
    
        if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3){
            console.log("Invalid number of lines,try again.");
        } 
        else{
            return numberoflines;
        }   
    }
}

const getBet = (balance , lines) =>{
    while (true){
        const bet = prompt("Enter of bet per line: ");
        const numberBet = parseFloat(bet)
    
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)){
            console.log("Invalid bet,try again.");
        } 
        else{
            return numberBet;
        }   
    }
}

const spin = () =>{
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i =0; i < count ; i++){
            symbols.push(symbol)
        }
    }
    const reels = [];
    for (let i=0 ; i < COLS ; i++){
        reels.push([]);
        const reelSymbols = [...symbols]
        for (let j =0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex , 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS ; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i , symbol] of row.entries()){
            rowString += symbol
            if (i != row.length -1){
                rowString += " | "
            }
        }

        console.log(rowString)
    }
};

const getWinning = (rows , bet, lines )=>{
    let winning =0;

    for (let row=0;row < lines;row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winning += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winning;
};

const game = () => {
    let balance = deposit();

    while(true){
        console.log("You have a balance of $" +balance)

        const numberoflines = getNumberofLine();
        const bet = getBet(balance , numberoflines);
        balance -= bet * numberoflines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winning = getWinning(rows, bet, numberoflines)
        balance += winning;
        console.log("You won , $" + winning.toString());

    if(balance <=0){
        console.log("YOU RAN OUT OF MONEY!!!!!............")
        break;
    }
    const playAgain = prompt("Do you Want to play again (y/n)? ");
        if (playAgain != "y") break;
    } 
};
game();
