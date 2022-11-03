import { useState, useCallback, useEffect } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordList.json";

const getRandomWord = () => {
  // give random number (0,1) * by length of word
  return words[Math.floor(Math.random() * words.length)];
};

function App() {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // type to array of strings

  console.log(wordToGuess);

  // filter the letters which is not in the word to guess
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6; // if guessed for mor than 6 times => Lose
  const isWinner = wordToGuess
    .split("") // split on guessing word
    .every((letter) => guessedLetters.includes(letter)); // check every char in word is in guessedLetters => WON

  /*FUNCTION USE IN KEYBOARD EVENT */
  const addGuessedLetter = useCallback(
    (letter: string) => {
      /* CHECK IF THE LETTER IS ALREADY IN THE GUESSEDLETTERS */
      if (guessedLetters.includes(letter) || isLoser || isWinner) return; // if already in guessed || game end => return
      setGuessedLetters((currentLetters) => [...currentLetters, letter]); // add the letter to the end of the array
    },
    [guessedLetters, isWinner, isLoser] // only what rerender when these changes
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key; // get the key

      /* CHECK DID WE PRESSED A LETTER FROM A-Z */
      if (!key.match(/^[a-z]/)) return;

      e.preventDefault(); // prevent the default => whatever was going to normally happen => dont
      addGuessedLetter(key); // add the pressed letter in the array
    };

    document.addEventListener("keypress", handler); // on keypress call the handler function

    return () => {
      document.removeEventListener("keypress", handler); // remove
    };
  }, [guessedLetters]);

  /* PRESS ENTER TO GET NEW WORD */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getRandomWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto ", // center everything
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner ? "Winner! - Refresh to try again" : null}
        {isLoser ? "Nice Try - Refresh to try again" : null}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser} // show word if lose
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser} // if Won or Lose => disable press button
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
