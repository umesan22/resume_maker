import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/icons/Add";
// core components
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import Button from "~/components/CustomButtons/Button.js";
import CustomInput from "~/components/CustomInput/CustomInput.js";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

function setEducation(counter) {
  sessionStorage.setItem("education", counter);
  for(let i = 0; i < counter; i++) {
    let year = document.getElementById("education" + i + "_year").value;
    let month = document.getElementById("education" + i + "_month").value;
    let education = document.getElementById("education" + i + "_education").value;
    sessionStorage.setItem("educationYear" + i, year);
    sessionStorage.setItem("educationMonth" + i, month);
    sessionStorage.setItem("educationEducation" + i, education);
  }
}

export default function Education() {
  const classes = useStyles();
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const addForm = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  }

  const removeForm = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  }

  const clearForm = () => {
    setIndexes([]);
    setCounter(0);
  }
  
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>学歴を入力</h2>
        </div>
        {indexes.map(index => {
          const educationId = `education${index}`;
          return (
            <div key={index}>
              <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={3}>
                    <CustomInput
                    labelText="YYYY"
                    id={`${educationId}_year`}
                    formControlProps={{
                        fullWidth: true
                    }}
                    />
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={3}>
                    <CustomInput
                    labelText="MM"
                    id={`${educationId}_month`}
                    formControlProps={{
                        fullWidth: true
                    }}
                    />
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={3}>
                    <CustomInput
                    labelText="学歴"
                    id={`${educationId}_education`}
                    formControlProps={{
                        fullWidth: true
                    }}
                    />
                  <Button color="danger" round onClick={removeForm(index)}>
                    Remove
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          )
        })}
        <div id="addButton">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Button color="rose" justIcon round onClick={addForm}>
                <Icon className={classes.icons} />
              </Button>
            </GridItem>
            {counter > 0 ? 
              <GridItem xs={12} sm={4} md={4} lg={3}>
                <Button color="rose" round onClick={clearForm}>
                  Clear
                </Button>
              </GridItem>
              :
              null
            }
          </GridContainer>
        </div>
        <div id="buttons">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Link to="/edit/contact">
                <Button color="info" round onClick={() => setEducation(counter)}>
                  戻る
                </Button>
              </Link>
              <Link to="/edit/job">
                <Button color="primary" round onClick={() => setEducation(counter)}>
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