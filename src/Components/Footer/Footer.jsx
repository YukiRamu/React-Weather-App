import React from 'react';
import "./Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <>
      <footer>
        <h5>@Yuki Matsubara all right reserved. 2021/06.
      <a href="https://www.linkedin.com/in/yukimatsubara/" target="_blank"><FaLinkedin></FaLinkedin></a>
          <a href="https://github.com/YukiRamu" target="_blank"><FaGithub></FaGithub></a>
        </h5>
      </footer>
    </>
  );
};

export default Footer;
