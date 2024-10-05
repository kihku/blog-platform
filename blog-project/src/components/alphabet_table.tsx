"use client";
import { Button, Typography } from "@material-tailwind/react";

export default function AlphabetTable() {
  const JAP_ALPHABETS = [
    "あ",
    "い",
    "う",
    "え",
    "お",
    "は",
    "ひ",
    "ふ",
    "へ",
    "ほ",
    "さ",
    "し",
    "す",
    "せ",
    "そ",
  ];
  return (
    <div className="h-full w-full p-10">
      <div className="grid grid-cols-5 gap-2 max-w-fit m-auto">
        {JAP_ALPHABETS.map((character) => (
          <Button variant="gradient" className="h-20 w-20" key={character}>
            <Typography type="h1">{character}</Typography>
          </Button>
        ))}
      </div>
    </div>
  );
}
