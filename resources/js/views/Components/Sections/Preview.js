import React from "react";
import {Document, Page} from "react-pdf";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import Button from "~/components/CustomButtons/Button.js";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

function getStorageForMake() {
    var education = sessionStorage.getItem("education");
    var job = sessionStorage.getItem("job");
    var skill = sessionStorage.getItem("skill");

    var educationYear = [];
    var educationMonth = [];
    var educationEducation = [];
    for(var i = 0; i < education; i++) {
     educationYear.push(sessionStorage.getItem("educationYear" + i));
     educationMonth.push(sessionStorage.getItem("educationMonth" + i));
     educationEducation.push(sessionStorage.getItem("educationEducation" + i));
    }

    var jobYear = [];
    var jobMonth = [];
    var jobJob = [];
    for(var i = 0; i < job; i++) {
     jobYear.push(sessionStorage.getItem("jobYear" + i));
     jobMonth.push(sessionStorage.getItem("jobMonth" + i));
     jobJob.push(sessionStorage.getItem("jobJob" + i));
    }

    var skillYear = [];
    var skillMonth = [];
    var skillSkill = [];
    for(var i = 0; i < skill; i++) {
     skillYear.push(sessionStorage.getItem("skillYear" + i));
     skillMonth.push(sessionStorage.getItem("skillMonth" + i));
     skillSkill.push(sessionStorage.getItem("skillSkill" + i));
    }

    var isEmergencyAddress = sessionStorage.getItem("isEmergencyAddress");
    var emergencyAddress = []
    if(isEmergencyAddress) {
        emergencyAddress.push(sessionStorage.getItem("emergencyPostalCode"));
        emergencyAddress.push(sessionStorage.getItem("emergencyPrefecture"));
        emergencyAddress.push(sessionStorage.getItem("emergencyAddress"));
        emergencyAddress.push(sessionStorage.getItem("emergencyApartment"));
        emergencyAddress.push(sessionStorage.getItem("emergencyAddresskana"));
    }
    var isEmergencyContact = sessionStorage.getItem("isEmergencyContact");
    var emergencyContact = [];
    if(isEmergencyContact) {
        emergencyContact.push(sessionStorage.getItem("emergencyPhoneNumber"));
        emergencyContact.push(sessionStorage.getItem("emergencyEmailAddress"));
    }

    var params = {
    "template": sessionStorage.getItem("template"),
    "lname": sessionStorage.getItem("lname"),
    "fname": sessionStorage.getItem("fname"),
    "lnamekana": sessionStorage.getItem("lnamekana"),
    "fnamekana": sessionStorage.getItem("fnamekana"),
    "year": sessionStorage.getItem("year"),
    "month": sessionStorage.getItem("month"),
    "day": sessionStorage.getItem("day"),
    "age": sessionStorage.getItem("age"),
    "sex": sessionStorage.getItem("sex"),
    "postalCode": sessionStorage.getItem("postalCode"),
    "prefecture": sessionStorage.getItem("prefecture"),
    "address": sessionStorage.getItem("address"),
    "apartment": sessionStorage.getItem("apartment"),
    "addresskana": sessionStorage.getItem("addresskana"),
    "phoneNumber": sessionStorage.getItem("phoneNumber"),
    "emailAddress": sessionStorage.getItem("emailAddress"),
    "reason": sessionStorage.getItem("reason"),
    "how": sessionStorage.getItem("how"),
    "hour": sessionStorage.getItem("hour"),
    "minute": sessionStorage.getItem("minute"),
    "familyMember": sessionStorage.getItem("familyMember"),
    "partner": sessionStorage.getItem("partner"),
    "partnerNeed": sessionStorage.getItem("partnerNeed"),
    "want": sessionStorage.getItem("want"),
    "emergencyAddress": "",
    "emergencyContact": "",
    "educationYear": educationYear,
    "educationMonth": educationMonth,
    "educationEducation": educationEducation,
    "jobYear": jobYear,
    "jobMonth": jobMonth,
    "jobJob": jobJob,
    "skillYear": skillYear,
    "skillMonth": skillMonth,
    "skillSkill": skillSkill,
    "emergencyAddress": emergencyAddress,
    "emergencyContact": emergencyContact,
  }

  return params;
}

export default function Preview() {
  const classes = useStyles();
  const [resumePath, setResumePath] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
      getResumePath()
  }, [])

  const getResumePath = async() => {
      const params = getStorageForMake();
      console.log(params);
      await axios.post("/preview", {params: {"params": params}})
      .then((results) => {
          const data = results.data;
          const file = data.file;
          console.log(file.resume_path);
          console.log(file.id);
          setResumePath(file.resume_path);
      },
      )
      .catch((error) => {
          console.log(error);
      });
  }

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div id="preview">
          <GridContainer>
            <Document
              file={resumePath}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </GridContainer>
        </div>
        <div id="buttons">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <a href={resumePath} download='resume.pdf'>
                <Button color="primary" round>
                  ダウンロードPDF
                </Button>
              </a>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}