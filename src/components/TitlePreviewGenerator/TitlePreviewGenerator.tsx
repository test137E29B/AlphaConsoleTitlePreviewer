import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface ITitlePreviewGeneratorProps {
  steamImageSource: string;
  steamProfileName: string;
  textColor: string;
  rainbowTextColorEnabled: boolean;
  glowColor: string;
  rainbowGlowColorEnabled: boolean;
  glowEnabled: boolean;
  titleText: string;
}

const useStyles = makeStyles(theme => ({
  previewScrollFix: {
    position: "relative",
    overflow: "auto"
  },
  previewContainer: {
    position: "relative",
    width: "auto",
    height: "auto"
  },
  rlBanner: {
    height: "auto",
    userSelect: "none"
  },
  steamImage: {
    position: "absolute",
    padding: 0,
    margin: 0,
    userSelect: "none"
  },
  steamName: {
    position: "absolute",
    fontFamily: "BourgeoisW00-Medium",
    color: "#fff",
    fontWeight: 500,
    padding: 0,
    margin: 0,
    userSelect: "none"
  },
  titleText: {
    position: "absolute",
    padding: 0,
    margin: 0,
    fontWeight: 600,
    userSelect: "none"
  }
}));

const TitlePreviewGenerator = (props: ITitlePreviewGeneratorProps) => {
  // Props
  const {
    steamImageSource,
    steamProfileName,
    textColor,
    rainbowTextColorEnabled,
    glowColor,
    rainbowGlowColorEnabled,
    glowEnabled,
    titleText
  } = props;

  // State
  const [shouldRender, setShouldRender] = useState(false);

  // Styles
  const classes = useStyles();

  // Utils
  // Bypass for static pixel based offsets
  useEffect(() => {
    window.addEventListener("resize", () => setShouldRender(true));
    setInterval(() => {
      // Ignore when CSS is causing re-renders itself
      if (
        shouldRender &&
        !(glowEnabled && (rainbowGlowColorEnabled || rainbowGlowColorEnabled))
      )
        setShouldRender(false);
    }, 16.6666667); // 60 times per second
  });

  const generateAnimations = () => {
    let animations = "";
    if (rainbowTextColorEnabled && rainbowGlowColorEnabled && glowEnabled)
      animations = "bothRotate 6s linear 0s infinite";
    else if (rainbowTextColorEnabled)
      animations = "colorRotate 6s linear 0s infinite";
    else if (rainbowGlowColorEnabled && glowEnabled)
      animations = "glowRotate 6s linear 0s infinite";
    return animations;
  };

  const responsiveCalc = (name: string, input: number): number => {
    return (window.innerWidth / 1920) * input;
  };

  // Renderer
  return (
    <div className={classes.previewContainer} id="previewContainer">
      <img
        src="img/FakeRLBanner.png"
        className={classes.rlBanner}
        alt="RL Banner"
        style={{
          width: `${responsiveCalc("RL BANNER WIDTH", 1771)}px`
        }}
        draggable={false}
      />
      <img
        src={steamImageSource}
        alt="Steam Profile"
        className={classes.steamImage}
        style={{
          top: `${responsiveCalc("STEAM IMAGE TOP", 87)}px`,
          left: `${responsiveCalc("STEAM IMAGE LEFT", 61)}px`,
          width: `${responsiveCalc("STEAM IMAGE WIDTH", 172)}px`,
          height: `${responsiveCalc("STEAM IMAGE HEIGHT", 176)}px`
        }}
        draggable={false}
      />
      <span
        className={classes.steamName}
        style={{
          top: `${responsiveCalc("USERNAME TOP", 89)}px`,
          left: `${responsiveCalc("USERNAME LEFT", 260)}px`,
          fontSize: `${responsiveCalc("USERNAME FONTSIZE", 98)}px`
        }}
      >
        {steamProfileName}
      </span>
      <span
        className={classes.titleText}
        style={{
          color: `${rainbowTextColorEnabled ? "" : textColor}`,
          animation: generateAnimations(),
          textShadow: `${
            glowEnabled && !rainbowGlowColorEnabled
              ? `0 0 15px ${glowColor}, 0 0 20px ${glowColor}`
              : ""
          }`,
          top: `${responsiveCalc("TITLE TEXT TOP", 190)}px`,
          left: `${responsiveCalc("TITLE TEXT LEFT", 260)}px`,
          fontSize: `${responsiveCalc("TITLE TEXT FONTSIZE", 48)}px`,
          wordSpacing: `${
            titleText === "SAMPLE TEXT"
              ? "normal"
              : `-${responsiveCalc("TITLE TEXT WORD SPACING", 15)}px`
          }`,
          fontFamily: `${
            titleText === "SAMPLE TEXT"
              ? "Comic Sans MS"
              : "LiberationMonoRegular"
          }`
        }}
      >
        {titleText}
      </span>
    </div>
  );
};

export default TitlePreviewGenerator;
