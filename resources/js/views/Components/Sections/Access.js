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

function setAccess(partner, partnerNeed) {
  var hour = document.getElementById("hour").value;
  var minute = document.getElementById("minute").value;
  var family = document.getElementById("familyMember").value;
  sessionStorage.setItem("hour", hour);
  sessionStorage.setItem("minute", minute);
  sessionStorage.setItem("familyMember", family);
  sessionStorage.setItem("partner", partner.partner);
  sessionStorage.setItem("partnerNeed", partnerNeed.partnerNeed);
}

export default function Profile() {
  const classes = useStyles();
  const [partner, setPartner] = React.useState("2");
  const [partnerNeed, setPartnerNeed] = React.useState("2");
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>通勤時間・家族構成を入力</h2>
        </div>
        <div id="access">
          <div className={classes.title}>
            <h5>通勤時間</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="時間"
                id="hour"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="分"
                id="minute"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="family">
          <div className={classes.title}>
            <h5>扶養家族(配偶者除く)</h5>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="扶養家族"
                id="familyMember"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div id="partner">
          <GridContainer>
            <GridItem xs={12} sm={6} md={4} lg={3}>
              <div className={classes.title}>
                <h5>配偶者</h5>
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
                      checked={partner === "1"}
                      onChange={() => setPartner("1")}
                      value="1"
                      name="isPartner"
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
                  label="あり"
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
                      checked={partner === "2"}
                      onChange={() => setPartner("2")}
                      value="2"
                      name="isPartner"
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
                  label="なし"
                />
              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={4} lg={3}>
              <div className={classes.title}>
                <h5>配偶者の扶養義務</h5>
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
                      checked={partnerNeed === "1"}
                      onChange={() => setPartnerNeed("1")}
                      value="1"
                      name="isPartnerNeed"
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
                  label="あり"
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
                      checked={partnerNeed === "2"}
                      onChange={() => setPartnerNeed("2")}
                      value="2"
                      name="isPartnerNeed"
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
                  label="なし"
                />
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div id="buttons">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Link to="/edit/reason">
                <Button color="info" round onClick={() => setAccess({partner}, {partnerNeed})}>
                  戻る
                </Button>
              </Link>
              <Link to="/edit/want">
                <Button color="primary" round onClick={() => setAccess({partner}, {partnerNeed})}>
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