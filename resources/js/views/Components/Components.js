import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "~/components/Header/Header.js";
import Footer from "~/components/Footer/Footer.js";
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import Parallax from "~/components/Parallax/Parallax.js";
// sections for this page
import Template from "./Sections/Template.js";
import Profile from "./Sections/Profile.js";
import Address from "./Sections/Address.js";
import Contact from "./Sections/Contact.js";
import Education from "./Sections/Education.js";
import Job from "./Sections/Job.js";
import Skill from "./Sections/Skill.js";
import Reason from "./Sections/Reason.js";
import Access from "./Sections/Access.js";
import Want from "./Sections/Want.js";
import Preview from "./Sections/Preview.js";

import styles from "~/assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="ResuMaker"
        fixed
        color="white"
        changeColorOnScroll={{
          height: 500,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("~/assets/img/resume.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>ResuMaker</h1>
                <h3 className={classes.subtitle}>
                  手書きの履歴書とさようなら<br />
                  PC、スマホ、タブレット、全てのデバイスで簡単に履歴書を作成する時代
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <Router>
          <Switch>
            <Route exact path="/" component={Template} />
            <Route path="/edit/profile" component={Profile} />
            <Route path="/edit/address" component={Address} />
            <Route path="/edit/contact" component={Contact} />
            <Route path="/edit/education" component={Education} />
            <Route path="/edit/job" component={Job} />
            <Route path="/edit/skill" component={Skill} />
            <Route path="/edit/reason" component={Reason} />
            <Route path="/edit/access" component={Access} />
            <Route path="/edit/want" component={Want} />
            <Route path="/preview" component={Preview} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}
