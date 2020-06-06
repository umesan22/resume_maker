import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import CustomInput from "~/components/CustomInput/CustomInput.js";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

export default function EmergencyAddress() {
  const classes = useStyles();

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>緊急連絡先住所を入力</h2>
        </div>
        <div id="emergencyPostal">
          <div className={classes.title}>
            <h5>郵便番号(ハイフンあり)</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="郵便番号"
                id="emergencyPostalCode"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="emergencyAdd">
          <div className={classes.title}>
            <h5>住所</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="都道府県"
                id="emergencyPrefecture"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="市区町村・番地"
                id="emergencyAddress"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="emergencyApart">
          <div className={classes.title}>
            <h5>マンション・建物名・部屋番号等</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="マンション・建物名・部屋番号等"
                id="emergencyApartment"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="emergencyAddkana">
          <div className={classes.title}>
            <h5>住所(ふりがな)</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="住所ふりがな"
                id="emergencyAddresskana"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}