import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { makeStyles } from "@material-ui/core/styles";

interface ITitlePreviewFormProps {
  onSteamIdUpdated: (steamId: string) => void;
  titleText: string;
  onTitleTextUpdated: (titleText: string) => void;
  textColor: string;
  onTextColorUpdated: (color: string) => void;
  textColorRainbowEnabled: boolean;
  onTextColorRainbowToggle: (enabled: boolean) => void;
  glowColor: string;
  onGlowColorUpdated: (color: string) => void;
  glowRainbowEnabled: boolean;
  onGlowRainbowToggle: (enabled: boolean) => void;
  glowEnabled: boolean;
  onGlowEnabledToggle: (enabled: boolean) => void;
}

const useStyles = makeStyles(theme => ({
  textInput: {
    color: "white"
  },
  steamIdInput: {
    color: "white"
  }
}));

const TitlePreviewForm = (props: ITitlePreviewFormProps) => {
  // Properties
  const {
    onSteamIdUpdated,
    titleText,
    onTitleTextUpdated,
    textColor,
    onTextColorUpdated,
    onTextColorRainbowToggle,
    glowColor,
    onGlowColorUpdated,
    onGlowRainbowToggle,
    onGlowEnabledToggle
  } = props;

  // State
  const [steamId64, setSteamId64] = useState("");
  const [textColorRainbowEnabled, setTextColorRainbowEnabled] = useState(
    props.textColorRainbowEnabled
  );
  const [glowRainbowEnabled, setGlowRainbowEnabled] = useState(
    props.glowRainbowEnabled
  );
  const [glowEnabled, setGlowEnabled] = useState(props.glowEnabled);

  // Styles
  const classes = useStyles();

  // Utils
  const handleTextColorRainbowToggle = () => {
    onTextColorRainbowToggle(textColorRainbowEnabled);
    setTextColorRainbowEnabled(!textColorRainbowEnabled);
  };

  const handleGlowRainbowToggle = () => {
    onGlowRainbowToggle(glowRainbowEnabled);
    setGlowRainbowEnabled(!glowRainbowEnabled);
  };

  const handleGlowEnabledToggle = () => {
    onGlowEnabledToggle(glowEnabled);
    setGlowEnabled(!glowEnabled);
  };

  // Renderer
  return (
    <React.Fragment>
      <FormGroup>
        <TextField
          placeholder="SteamID64"
          InputProps={{ className: classes.steamIdInput }}
          onChange={event => setSteamId64(event.target.value)}
        />
        <Button
          onClick={() => {
            onSteamIdUpdated(steamId64);
          }}
          color="primary"
        >
          Refresh
        </Button>
      </FormGroup>
      <br />
      <TextField
        InputProps={{
          className: classes.textInput,
          style: { borderColor: "#fff" }
        }}
        InputLabelProps={{ style: { color: "#fff" } }}
        onChange={event => onTitleTextUpdated(event.target.value)}
        label="Title Text"
        value={titleText}
        fullWidth
      />
      <br />
      <ColorPicker value={textColor} onChange={onTextColorUpdated} />
      <FormControlLabel
        control={
          <Checkbox
            checked={textColorRainbowEnabled}
            onChange={handleTextColorRainbowToggle}
            color="primary"
          />
        }
        label="Rainbow Color"
        style={{ userSelect: "none" }}
      />
      <br />
      <ColorPicker value={glowColor} onChange={onGlowColorUpdated} />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={glowRainbowEnabled}
              onChange={handleGlowRainbowToggle}
              color="primary"
            />
          }
          label="Rainbow Glow"
          style={{ userSelect: "none" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={glowEnabled}
              onChange={() => handleGlowEnabledToggle()}
              value="glowEnabled"
              color="primary"
            />
          }
          label="Glow Enabled"
          style={{ userSelect: "none" }}
        />
      </FormGroup>
    </React.Fragment>
  );
};

export default TitlePreviewForm;
