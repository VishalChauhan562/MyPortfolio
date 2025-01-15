import React, { useState, useEffect, useContext } from "react";
import { Cpu, Database, Globe, Server, Code, Layout } from "lucide-react";
import "./About.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { aboutData } from "../../data/aboutData";

const MemoryGame = ({ theme }) => {
  const icons = [Cpu, Database, Globe, Server, Code, Layout];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const shuffledCards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, i) => ({ id: i, Icon }));
    setCards(shuffledCards);
  }, []);

  const handleClick = (id) => {
    if (disabled || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      if (cards[first].Icon === cards[second].Icon) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        maxWidth: "400px",
        margin: "20px 0",
      }}
    >
      {cards.map((card) => {
        const Icon = card.Icon;
        const isFlipped =
          flipped.includes(card.id) || matched.includes(card.id);
        return (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            style={{
              height: "70px",
              width: "70px",
              cursor: "pointer",
              backgroundColor: isFlipped ? theme.primary : theme.tertiary80,
              border: `2px solid ${theme.primary}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "background-color 0.3s",
            }}
          >
            {isFlipped && <Icon size={40} color={theme.secondary} />}
          </div>
        );
      })}
    </div>
  );
};

function About() {
  const { theme } = useContext(ThemeContext);
  const [showGame, setShowGame] = useState(false);

  return (
    <div
      className="about"
      id="about"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="line-styling">
        <div
          className="style-circle"
          style={{ backgroundColor: theme.primary }}
        ></div>
        <div
          className="style-circle"
          style={{ backgroundColor: theme.primary }}
        ></div>
        <div
          className="style-line"
          style={{ backgroundColor: theme.primary }}
        ></div>
      </div>
      <div className="about-body">
        <div className="about-description">
          <h2 style={{ color: theme.primary }}>{aboutData.title}</h2>
          <p style={{ color: theme.tertiary80 }}>
            {aboutData.description1}
            <br />
            <br />
            {aboutData.description2}
          </p>
          <button
            onClick={() => setShowGame(!showGame)}
            style={{
              backgroundColor: theme.primary,
              color: theme.secondary,
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            {showGame ? "Hide Tech Stack Game" : "Play Tech Stack Memory Game"}
          </button>
          {showGame && <MemoryGame theme={theme} />}
        </div>
        <div className="about-img">
          <img
            src={aboutData.image === 1 ? theme.aboutimg2 : theme.aboutimg1}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default About;
