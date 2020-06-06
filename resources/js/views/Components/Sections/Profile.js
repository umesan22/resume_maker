import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import Button from "~/components/CustomButtons/Button.js";
import CustomInput from "~/components/CustomInput/CustomInput.js";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

function setProfile(sex) {
  var lname = document.getElementById("lname").value;
  var fname = document.getElementById("fname").value;
  var lnamekana = document.getElementById("lnamekana").value;
  var fnamekana = document.getElementById("fnamekana").value;
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
  var day = document.getElementById("day").value;
  var age = document.getElementById("editAge").value;
  sessionStorage.setItem("lname", lname);
  sessionStorage.setItem("fname", fname);
  sessionStorage.setItem("lnamekana", lnamekana);
  sessionStorage.setItem("fnamekana", fnamekana);
  sessionStorage.setItem("year", year);
  sessionStorage.setItem("month", month);
  sessionStorage.setItem("day", day);
  sessionStorage.setItem("age", age);
  sessionStorage.setItem("sex", sex.sex);
}

export default function Profile() {
  const classes = useStyles();
  const [sex, setSex] = React.useState("1");
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>プロフィールを入力</h2>
        </div>
        <div id="name">
          <div className={classes.title}>
            <h5>氏名</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="性"
                id="lname"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="名"
                id="fname"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="kana">
          <div className={classes.title}>
            <h5>ふりがな</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="せい"
                id="lnamekana"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="めい"
                id="fnamekana"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="birthday">
          <div className={classes.title}>
            <h5>生年月日(西暦)</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="YYYY"
                id="year"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="MM"
                id="month"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="DD"
                id="day"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="age">
          <div className={classes.title}>
            <h5>年齢</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="年齢"
                id="editAge"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="sex">
          <GridContainer>
            <GridItem xs={12} sm={6} md={4} lg={3}>
              <div className={classes.title}>
                <h5>性別</h5>
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={sex === "1"}
                      onChange={() => setSex("1")}
                      value="1"
                      name="sex"
                      aria-label="1"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                        root: classes.radioRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label="男性"
                />
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={sex === "2"}
                      onChange={() => setSex("2")}
                      value="2"
                      name="sex"
                      aria-label="2"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                        root: classes.radioRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label="女性"
                />
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div id="buttons">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Link to="/">
                <Button color="info" round onClick={() => setProfile({sex})}>
                  戻る
                </Button>
              </Link>
              <Link to="/edit/address">
                <Button color="primary" round onClick={() => setProfile({sex})}>
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