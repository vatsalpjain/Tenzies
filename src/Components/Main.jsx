import Die from "./Die";
import { useState,useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
  const [dice, setDice] = useState(() => GenerateAllNewDie());
  let gameWon =
    dice.every((obj) => obj.isHeld === true) &&
    dice.every((obj) => obj.value == dice[0].value);
  
  useEffect(() => {
    if (gameWon) {
      document.querySelector(".roll-dice").focus()
    }
  },[gameWon])
  

  function GenerateAllNewDie() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function dieHeld(id) {
    setDice((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj))
    );
    console.log(`hold die ${id}`);
  }

  function rollDice() {
    if (!gameWon) {
      setDice((prev) =>
        prev.map((obj) =>
          obj.isHeld === false
            ? { ...obj, value: Math.ceil(Math.random() * 6) }
            : obj
        )
      );
    } else {
      setDice(GenerateAllNewDie)
    }
    setDice((prev) =>
      prev.map((obj) =>
        obj.isHeld === false
          ? { ...obj, value: Math.ceil(Math.random() * 6) }
          : obj
      )
    );
  }

  let GenDice = dice.map((obj) => (
    <Die
      key={obj.id}
      value={obj.value}
      isHeld={obj.isHeld}
      dieHeld={() => dieHeld(obj.id)}
    />
  ));

  return (
    <main className="main-container">
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{GenDice}</div>
      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New game" : "Roll"}
      </button>
    </main>
  );
}
