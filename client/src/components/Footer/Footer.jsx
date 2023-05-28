import { FacebookOutlined, GithubOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";
import React from "react";
import Logo from "../../img/vq9_blog_footer.png";
import './footer.scss'

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <div className="footer-icon">
        <a href="https://www.facebook.com/quyetdaica.09/"><FacebookOutlined /></a>
        <a href="https://www.instagram.com/_buiduyquyet/"><InstagramOutlined /></a>
        <a href="https://www.linkedin.com/in/quyet-dai-ca-092k/"><LinkedinOutlined /></a>
        <a href="https://github.com/quyWin"><GithubOutlined /></a>

      </div>
      <span className="made-love">
        Made with <b>♥️ and you</b>.
      </span>
    </footer>
  );
};

export default Footer;
