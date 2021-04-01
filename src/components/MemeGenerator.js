import React, { useState, useEffect } from "react";
import Memu from "./Memu";

const MemeGenerator = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMeme, setCurrentMeme] = useState("");
  const [forms, setForms] = useState({
    topText: "",
    bottomText: "",
    textSize: "30",
  });

  const randomNumber = (myMin, myMax) => {
    return Math.floor(
      Math.random() * (Math.ceil(myMax) - Math.floor(myMin) + 1) + myMin
    );
  };

  const randomMeme = () => {
    setCurrentMeme(memes[randomNumber(0, memes.length - 1)]);
  };

  // Set memes state array through API call
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setMemes(response.data.memes);
      });
  }, []);

  // Set Random meme image when API call is Done
  useEffect(() => {
    if (memes !== undefined || memes.length !== 0) {
      randomMeme();
    }
  }, [memes]);

  // Stop loading status when current meme is set
  useEffect(() => {
    if (typeof currentMeme === "object") {
      setLoading(false);
    }
  }, [currentMeme]);

  // Handle text input forms
  const handleForm = (event) => {
    const { name, value } = event.target;

    console.log(`NAME: ${name}, VALUE: ${value}`);

    setForms({
      ...forms,
      [name]: value,
    });
  };

  if (!loading) {
    return (
      <div id="meme-gen-container">
        <div id="top-div">
          <h1 id="main-title">MEME Generator</h1>
        </div>

        <div className="input-container">
          <label className="meme-label">
            Top text:
            <input
              className="meme-input"
              type="text"
              placeholder="Top text"
              name="topText"
              value={forms.topText}
              onChange={handleForm}
            />
          </label>

          <label className="meme-label">
            Bottom Text:
            <input
              className="meme-input"
              type="text"
              placeholder="Bottom text"
              name="bottomText"
              value={forms.bottomText}
              onChange={handleForm}
            />
          </label>

          <label className="meme-label">
            Font size:
            <input
              type="number"
              name="textSize"
              value={forms.textSize}
              onChange={handleForm}
              max="50"
              min="10"
              className="meme-input"
            />
          </label>

          <button className="ui-btn" onClick={randomMeme}>
            Random
          </button>
        </div>

        <div id="image-div">
          <p
            id="top-text"
            className="meme-text"
            style={{ fontSize: `${forms.textSize}px` }}
          >
            Top text: {forms.topText}
          </p>

          <p
            id="bottom-text"
            className="meme-text"
            style={{ fontSize: `${forms.textSize}px` }}
          >
            Bottom text: {forms.bottomText}
          </p>

          <img
            className="meme-image"
            src={currentMeme.url}
            height={currentMeme.height}
            width={currentMeme.width}
            alt="meme"
          />
        </div>
        <Memu allMemes={JSON.stringify(memes)} />
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
