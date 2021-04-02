import React, { useState, useEffect } from "react";
import Memu from "./Memu";
import html2canvas, { downloadURI } from "html2canvas";

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

  const selectMeme = (meme_id) => {
    memes.forEach((meme) => {
      if (meme.id === meme_id) {
        setCurrentMeme(meme);
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    });
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
      setCurrentMeme(memes[randomNumber(0, memes.length - 1)]);
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

    if (name === "textSize") {
      // Limit font size to 10 to 50
      if (parseInt(value) <= 50 && parseInt(value) >= 10) {
        setForms({
          ...forms,
          [name]: value,
        });
      }
    } else {
      setForms({
        ...forms,
        [name]: value,
      });
    }
  };

  // Generate meme image dowmload link
  const saveAs = (uri, filename) => {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  // Download meme as image
  const saveMeme = () => {
    const memeDiv = document.getElementById("image-div");

    html2canvas(memeDiv, {
      useCORS: true,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      saveAs(canvas.toDataURL(), "meme.png");
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
              className="meme-input"
            />
          </label>

          <button className="ui-btn" onClick={saveMeme}>
            Download
          </button>
        </div>

        <div id="image-div">
          <p
            id="top-text"
            className="meme-text"
            style={{ fontSize: `${forms.textSize}px` }}
          >
            {forms.topText}
          </p>

          <p
            id="bottom-text"
            className="meme-text"
            style={{ fontSize: `${forms.textSize}px` }}
          >
            {forms.bottomText}
          </p>

          <img
            className="meme-image"
            src={currentMeme.url}
            height={currentMeme.height}
            width={currentMeme.width}
            alt="meme"
          />
        </div>

        <Memu allMemes={JSON.stringify(memes)} sm={selectMeme} />
      </div>
    );
  } else {
    return (
      <div className="loading-div">
        <h1>LOADING...</h1>
      </div>
    );
  }
};

export default MemeGenerator;
