import React from "react";
import { ChromePicker, Color, ColorResult } from "react-color";
import { Theme, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

export interface IColorPickerProps {
  value: Color;
  onChange: (color: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    color: {
      width: theme.spacing(6),
      height: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
      border: `1px ${theme.palette.divider} solid`
    },
    swatch: {
      width: "100%",
      padding: theme.spacing(0.5),
      paddingLeft: 0,
      paddingRight: 0,
      borderBottom: `1px solid rgba(0, 0, 0, 0.42)`,
      borderRadius: "1px",
      display: "inline-flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
      cursor: "pointer"
    },
    popover: {
      position: "absolute",
      zIndex: 2
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
      userSelect: "none"
    }
  })
);

export const ColorPicker = (props: IColorPickerProps) => {
  const { value, onChange } = props;
  const [displayColorPicker, setDisplayColourPicker] = React.useState(false);
  const [color, setColor] = React.useState(value);
  const classes = useStyles(props);
  const handleClick = () => setDisplayColourPicker(!displayColorPicker);
  const handleClose = () => setDisplayColourPicker(false);

  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
    onChange(color.hex);
  };
  return (
    <div>
      <div className={classes.swatch} onClick={handleClick}>
        <div
          className={classes.color}
          style={{ backgroundColor: String(color) }}
        />
        <Typography>{color}</Typography>
      </div>
      {displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <ChromePicker
            disableAlpha
            color={color}
            onChangeComplete={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};
