import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "~/components/Grid/GridContainer.js";
import GridItem from "~/components/Grid/GridItem.js";
import Card from "~/components/Card/Card.js";

import jisTemplate from "~/assets/img/jisTemplate.jpg";

import styles from "~/assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

function setTemplate(template) {
  sessionStorage.setItem('template', template);
};

export default function Template() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justiy="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2>テンプレートを選ぶ</h2>
            <h4>テンプレートは全部で1種類。画像を選んでクリック！</h4>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <Link to="/edit/profile" onClick={() => setTemplate("jis")}>
                    <img src={jisTemplate} alt="First slide" className="slick-image" />
                  </Link>
                  <div className={classes.centerItems}>
                      JIS規格を選ぶ
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
