import React from "react";

const Memu = (props) => {
  let memes = JSON.parse(props.allMemes);

  const memeJsx = memes.map((meme) => {
    return (
      <div className="meme-div" key={meme.id} onClick={() => props.sm(meme.id)}>
        <img
          className="meme-image2"
          src={meme.url}
          height={meme.height}
          width={meme.width}
          alt="meme"
        />
        <p className="meme-name">{meme.name}</p>
      </div>
    );
  });

  return (
    <div className="memu-container">
      <p className="memu-title">Select Meme ᐁ</p>
      <div className="memu-div">{memeJsx}</div>
    </div>
  );
};

export default Memu;
