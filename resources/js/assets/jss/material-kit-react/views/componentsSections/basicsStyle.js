import { container, title } from "~/assets/jss/material-kit-react.js";
import customCheckboxRadioSwitch from "~/assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

const basicsStyle = {
  forArea: {
    width: "90%",
    height: "300px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  sections: {
    padding: "70px 0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  space50: {
    height: "50px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
  ...customCheckboxRadioSwitch
};

export default basicsStyle;
