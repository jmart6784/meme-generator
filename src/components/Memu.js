import React from "react";

const Memu = (props) => {
  let memes = JSON.parse(props.allMemes);

  const memeJsx = memes.map((meme) => {
    return (
      <div className="meme-div">
        <img
          className="meme-image2"
          src={meme.url}
          height={meme.height}
          width={meme.width}
          alt="meme"
        />
        <p key={meme.id} className="meme-name">
          {meme.name}
        </p>
      </div>
    );
  });

  return <div className="memu-div">{memeJsx}</div>;
};

export default Memu;
