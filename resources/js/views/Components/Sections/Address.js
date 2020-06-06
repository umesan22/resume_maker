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
import EmergencyAddress from "./EmergencyAddress.js";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

function setAddress(isChecked) {
  var postalCode = document.getElementById("postalCode").value;
  var prefecture = document.getElementById("prefecture").value;
  var address = document.getElementById("address").value;
  var apartment = document.getElementById("apartment").value;
  var addressKana = document.getElementById("addresskana").value;
  sessionStorage.setItem("postalCode", postalCode);
  sessionStorage.setItem("prefecture", prefecture);
  sessionStorage.setItem("address", address);
  sessionStorage.setItem("apartment", apartment);
  sessionStorage.setItem("addresskana", addressKana);
  sessionStorage.setItem("isEmergencyAddress", isChecked);
  if(isChecked) {
    var emergencyPostalCode = document.getElementById("emergencyPostalCode").value;
    var emergencyPrefecture = document.getElementById("emergencyPrefecture").value;
    var emergencyAddress = document.getElementById("emergencyAddress").value;
    var emergencyApartment = document.getElementById("emergencyApartment").value;
    var emergencyAddresskana = document.getElementById("emergencyAddresskana").value;
    sessionStorage.setItem("emergencyPostalCode", emergencyPostalCode);
    sessionStorage.setItem("emergencyPrefecture", emergencyPrefecture);
    sessionStorage.setItem("emergencyAddress", emergencyAddress);
    sessionStorage.setItem("emergencyApartment", emergencyApartment);
    sessionStorage.setItem("emergencyAddresskana", emergencyAddresskana);
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
          <h2>住所を入力</h2>
        </div>
        <div id="postal">
          <div className={classes.title}>
            <h5>郵便番号(ハイフンあり)</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="郵便番号"
                id="postalCode"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="add">
          <div className={classes.title}>
            <h5>住所</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="都道府県"
                id="prefecture"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="市区町村・番地"
                id="address"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="apart">
          <div className={classes.title}>
            <h5>マンション・建物名・部屋番号等</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="マンション・建物名・部屋番号等"
                id="apartment"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="addkana">
          <div className={classes.title}>
            <h5>住所(ふりがな)</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="住所ふりがな"
                id="addresskana"
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
        {checked.indexOf(21) !== -1 ? <EmergencyAddress /> : null}
        <div id="buttons">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Link to="/edit/profile">
                <Button color="info" round onClick={() => setAddress(checked.indexOf(21) !== -1)}>
                  戻る
                </Button>
              </Link>
              <Link to="/edit/contact">
                <Button color="primary" round onClick={() => setAddress(checked.indexOf(21) !== -1)}>
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