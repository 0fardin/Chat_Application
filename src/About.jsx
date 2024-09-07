import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  let data = useSelector((state) => state.Userinfo.name);
  return (
    <>
      <h1>Batch : {data.batch}</h1>
      <h2>Class Time : {data.class}</h2>
    </>
  );
};

export default About;
