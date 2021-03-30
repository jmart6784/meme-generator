import React, { useState, useEffect } from "react";

const MemeGenerator = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMeme, setCurrentMeme] = useState("");

  const randomNumber = (myMin, myMax) => {
    return Math.floor(
      Math.random() * (Math.ceil(myMax) - Math.floor(myMin) + 1) + myMin
    );
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setMemes(response.data.memes);
      });
  }, []);

  useEffect(() => {
    if (memes !== undefined || memes.length !== 0) {
      setCurrentMeme(memes[randomNumber(0, memes.length - 1)]);
    }
  }, [memes]);

  useEffect(() => {
    if (typeof currentMeme === "object") {
      setLoading(false);
    }
  }, [currentMeme]);

  if (!loading) {
    return (
      <div>
        <h1>MEME</h1>

        <img
          src={currentMeme.url}
          height={currentMeme.height}
          width={currentMeme.width}
          alt="meme"
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );
  }
};

export default MemeGenerator;
