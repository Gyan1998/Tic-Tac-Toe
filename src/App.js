import React,{useState,useEffect} from "react";
import './App.css';

import GridItem from './components/GridItem';

const App=()=>{

	const [gameActive,setGameActive]=useState(true);
	const [currentPlayer,setCurrentPlayer]=useState("X");
	const [gameState,setGameState]=useState(["", "", "", "", "", "", "", "", ""]);
	const winningMessage=()=>`Congratulations! ${currentPlayer} wins`;
	const drawMessage=()=>`Draw!`;
	const currentPlayerTurn=()=>`It's ${currentPlayer}'s turn`;
	const [winningConditions,setWinningConditions]=useState(
			[
			  [0, 1, 2],
			  [3, 4, 5],
			  [6, 7, 8],
			  [0, 3, 6],
			  [1, 4, 7],
			  [2, 5, 8],
			  [0, 4, 8],
			  [2, 4, 6]
			]);

	const handleClick=(index)=>{
		if(gameState[index]!=="" || !gameActive)
		    return;
		// const currentGameState=[...gameState];
		// currentGameState[index]=currentPlayer;
		gameState[index]=currentPlayer;
		setCurrentPlayer(currentPlayer==='X'?'0':'X');
		setGameState(gameState);
		//console.log(gameState);
		handleResultValidation();
	}


	const handleResultValidation=()=>{
		let roundWon=false;

	    for(let i=0;i<winningConditions.length;i++){
		    const condition=winningConditions[i];

		    let a = gameState[condition[0]];
		    let b = gameState[condition[1]];
		    let c = gameState[condition[2]];

		    //console.log("a="+a+"b="+b+"c="+c);
		    if (a === "" || b === "" || c === "") {
		      continue;
		    }

		    if (a === b && b === c) {
		      roundWon = true;
		      break;
		    }
	    }

	    if(roundWon){
		    setTimeout(function(){alert(winningMessage());},10);
		    setGameActive(false);
		    return;
	    }

	    let roundDraw=!gameState.includes("");
	    if(roundDraw){
		    setTimeout(function(){alert(drawMessage());},10);
		    setGameActive(false);
		    return;
	    }
	}

	
	const handleRestartGame=()=>{
	  setGameActive(true);
	  setCurrentPlayer("X");
	  setGameState(["", "", "", "", "", "", "", "", ""]);
	  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
	}


	return(
		<section>
	      <h1 class="game--title">Tic Tac Toe</h1>
	      <div class="game--container">
	      {gameState.map((val,index)=>(
	      	<GridItem value={val} index={index} handleClick={handleClick} currentPlayer={currentPlayer}/>
	      ))}
	      </div>
	      
	      <h2 class="game--status">{gameActive===true?"Player "+currentPlayer+"'s turn":""}</h2>
	      <button class="game--restart" onClick={handleRestartGame}>Restart Game</button>
	    </section>
	 );
}

export default App;
