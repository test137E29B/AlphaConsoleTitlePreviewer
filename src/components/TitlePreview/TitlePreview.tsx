import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import "./TitlePreview.css";
import { xml2json } from "xml-js";
import removeJsonTextAttribute, {
  ISteamProfile
} from "./../../utils/removeJsonTextAttribute";
import TitlePreviewGenerator from "../TitlePreviewGenerator/TitlePreviewGenerator";
import TitlePreviewForm from "../TitlePreviewForm/TitlePreviewForm";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import domtoimage from "dom-to-image";

const useStyles = makeStyles(theme => ({
  code: {
    fontFamily: "monospace",
    marginTop: "5px",
    marginBottom: "5px",
    fontSize: theme.typography.h5.fontSize
  }
}));

const TitlePreview = () => {
  const botNames = [
    "Armstrong",
    "Bandit",
    "Beast",
    "Boomer",
    "Buzz",
    "C-Block",
    "Casper",
    "Caveman",
    "Centice",
    "Chipper",
    "Cougar",
    "Dude",
    "Foamer",
    "Fury",
    "Gerwin",
    "Goose",
    "Heater",
    "Hollywood",
    "Hound",
    "Iceman",
    "Imp",
    "Jester",
    "Junker",
    "Khan",
    "Marley",
    "Maverick",
    "Merlin",
    "Middy",
    "Mountain",
    "Myrtle",
    "Outlaw",
    "Poncho",
    "Rainmaker",
    "Raja",
    "Rex",
    "Roundhouse",
    "Sabretooth",
    "Saltie",
    "Samara",
    "Scout",
    "Shepard",
    "Slider",
    "Squall",
    "Sticks",
    "Stinger",
    "Storm",
    "Sultan",
    "Sundown",
    "Swabbie",
    "Tex",
    "Tusk",
    "Viper",
    "Wolfman",
    "Yuri"
  ];

  // State
  const [steamName, setSteamName] = useState(
    botNames[Math.floor(Math.random() * (botNames.length - 1))]
  );
  const [steamImgSrc, setSteamImgSrc] = useState(
    "https://calculated.gg/ai.jpg"
  );
  const [title, setTitle] = useState("SAMPLE TEXT");
  const [color, setColor] = useState("#FF0000");
  const [rainbowColorEnabled, setRainbowColorEnabled] = useState(false);
  const [glow, setGlow] = useState("#FFFFFF");
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [rainbowGlowEnabled, setRainbowGlowEnabled] = useState(false);
  // const [previewSrc, setPreviewSrc] = useState("");
  // const [isGenerating, setIsGenerating] = useState(false);

  // Preview Handler
  // const generateImage = async () => {
  //   const node = document.getElementById("previewContainer");
  //   if (node && !isGenerating) {
  //     setIsGenerating(true);
  //     const imgSrc = await domtoimage.toSvg(node);
  //     setPreviewSrc(imgSrc);
  //     setIsGenerating(false);
  //   }
  // };
  const classes = useStyles();

  const getSteamInformation = async (
    steamId: string
  ): Promise<{ avatarUrl: string; username: string } | null> => {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://steamcommunity.com/profiles/${steamId}?xml=1`
    );

    // 76561198149982056 STEAMID NAMELESS
    // 76561198074140218 STEAMID J🅱SL00
    // 76561198203805585 STEAMID nitro.

    const xml = await res.text();
    const obj: { profile: ISteamProfile } = JSON.parse(
      xml2json(xml, {
        compact: true,
        trim: true,
        ignoreDeclaration: true,
        textFn: removeJsonTextAttribute,
        cdataFn: removeJsonTextAttribute
      })
    );

    if (obj.profile) {
      return {
        avatarUrl: obj.profile.avatarFull,
        username: obj.profile.steamID
      };
    }
    return null;
  };

  const handleSteamIdRefresh = async (steamIdInput: string) => {
    // Get steam name from API and image src too
    const details = await getSteamInformation(steamIdInput);
    if (!details) {
      setSteamImgSrc("https://calculated.gg/ai.jpg");
      setSteamName(botNames[Math.floor(Math.random() * (botNames.length - 1))]);
      return;
    }
    setSteamImgSrc(details.avatarUrl);
    setSteamName(details.username);
  };

  const handleGlowDisableToggle = (glowEnabledInput: boolean) => {
    setGlowEnabled(glowEnabledInput);
  };

  // Render
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box>
        <TitlePreviewGenerator
          steamImageSource={steamImgSrc}
          steamProfileName={steamName}
          textColor={color}
          rainbowTextColorEnabled={rainbowColorEnabled}
          glowColor={glow}
          rainbowGlowColorEnabled={rainbowGlowEnabled}
          glowEnabled={glowEnabled}
          titleText={title}
        />
      </Box>
      <Box>
        <TitlePreviewForm
          onSteamIdUpdated={handleSteamIdRefresh}
          titleText={title}
          onTitleTextUpdated={titleText =>
            setTitle(titleText.toUpperCase().slice(0, 40))
          }
          textColor={color}
          onTextColorUpdated={setColor}
          textColorRainbowEnabled={rainbowColorEnabled}
          onTextColorRainbowToggle={enabled => setRainbowColorEnabled(!enabled)}
          glowColor={glow}
          onGlowColorUpdated={setGlow}
          glowRainbowEnabled={rainbowGlowEnabled}
          onGlowRainbowToggle={enabled => setRainbowGlowEnabled(!enabled)}
          glowEnabled={glowEnabled}
          onGlowEnabledToggle={enabled => handleGlowDisableToggle(!enabled)}
        />
      </Box>
      <Box>
        <br />
        <Typography>Commands:</Typography>
        <p className={classes.code}>{`!set title ${title}`}</p>
        <p className={classes.code}>{`!set color ${
          rainbowColorEnabled
            ? "FF0000::00FF00::0000FF"
            : color.replace("#", "")
        }`}</p>
        <p className={classes.code}>{`!set glow ${
          rainbowGlowEnabled ? "FF0000::00FF00::0000FF" : glow.replace("#", "")
        }`}</p>
      </Box>
    </Box>
  );
};

export default TitlePreview;
