import { container } from "~/assets/jss/material-kit-react.js";

const carouselStyle = {
  section: {
    padding: "70px 0"
  },
  container: {
    ...container,
    textAlign: "center !important",
  },
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
    alignItems: "center",
  },
  centerItems: {
    alignItems: "center",
    textAlign: "center",
    color: "black"
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
};

export default carouselStyle;
