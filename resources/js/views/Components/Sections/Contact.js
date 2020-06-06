import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import Button from "~/components/CustomButtons/Button.js";
import CustomInput from "~/components/CustomInput/CustomInput.js";
import EmergencyContact from "./EmergencyContact.js";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

function setContact(isChecked) {
  var phoneNumber = document.getElementById("phoneNumber").value;
  var emailAddress = document.getElementById("emailAddress").value;
  sessionStorage.setItem("phoneNumber", phoneNumber);
  sessionStorage.setItem("emailAddress", emailAddress);
  sessionStorage.setItem("isEmergencyContact", isChecked);
  if(isChecked) {
    var emergencyPhoneNumber = document.getElementById("emergencyPhoneNumber").value;
    var emergencyEmailAddress = document.getElementById("emergencyEmailAddress").value;
    sessionStorage.setItem("emergencyPhoneNumber", emergencyPhoneNumber);
    sessionStorage.setItem("emergencyEmailAddress", emergencyEmailAddress);
  }
}

export default function Address() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([24, 22]);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>連絡先を入力</h2>
        </div>
        <div id="phone">
          <div className={classes.title}>
            <h5>電話番号(ハイフンあり)</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="電話番号"
                id="phoneNumber"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="email">
          <div className={classes.title}>
            <h5>Email</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="Email"
                id="emailAddress"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="emergency">
          <GridContainer>
            <GridItem xs={12} sm={6} md={4} lg={3}>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(21)}
                      checked={checked.indexOf(21) !== -1 ? true : false}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                  label="緊急連絡先を入力"
                />
              </div>
            </GridItem>
          </GridContainer>
        </div>
        {checked.indexOf(21) !== -1 ? <EmergencyContact /> : null}
        <div id="buttons">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Link to="/edit/address">
                <Button color="info" round onClick={() => setContact(checked.indexOf(21) !== -1)}>
                  戻る
                </Button>
              </Link>
              <Link to="/edit/education">
                <Button color="primary" round onClick={() => setContact(checked.indexOf(21) !== -1)}>
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