import React, { useState, useEffect } from "react";

const MemeGenerator = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(response.data, memes);
        setLoading(false);
      });
  }, []);

  if (!loading) {
    return (
      <div>
        <h1>MEME {memes[randomNumber(0, memes.length - 1)].name}</h1>
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
