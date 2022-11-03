import React from "react";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) => {
  //   const word = "test";
  //   const guessedLetters=['t','e','s','t']
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess?.split("").map((letter, index) => (
        <span
          style={{ borderBottom: ".1em solid black" }}
          key={index} // normally dont use index for key, in this case the index is the unique identifier for the letters
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black", // when lose => reveal => red else show black
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};
