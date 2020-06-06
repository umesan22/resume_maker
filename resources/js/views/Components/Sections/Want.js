import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import Button from "~/components/CustomButtons/Button.js";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

function setWant() {
  var want = document.getElementById("wantText").value;
  sessionStorage.setItem("want", want);
}

export default function Profile() {
  const classes = useStyles();
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>本人希望を入力</h2>
        </div>
        <div id="want">
          <GridContainer>
            <textarea id="wantText" className={classes.forArea} />
          </GridContainer>
        </div>
        <div id="buttons">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Link to="/edit/access">
                <Button color="info" round onClick={() => setWant()}>
                  戻る
                </Button>
              </Link>
              <Link to="/preview">
                <Button color="primary" round onClick={() => setWant()}>
                  次へ
                </Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}