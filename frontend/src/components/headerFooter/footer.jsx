import React from 'react'; 
import filledLogo from '../../assets/images/postcard-filled.png'


const Footer = () => {

  return (
    <footer className="site-footer">
      <aside>
        <img 
        className="logo"
        src={filledLogo} alt="Postcard Logo"/>
      </aside>
      <section>
        <h2>Creators</h2>
        <ul role="list">
          <li>
            <h2>Daniel Cho</h2>
            <ul role="list">
              <li><a href="https://github.com/thedanielcho" target="_blank">Github</a></li>
              <li><a href="https://www.linkedin.com/in/daniel-cho-376110189/" target="_blank">LinkedIn</a></li>
            </ul>
          </li>
          <li>
            <h2>Tim Fraczak</h2>
            <ul role="list">
              <li><a href="https://github.com/tfraczak" target="_blank">Github</a></li>
              <li><a href="https://www.linkedin.com/in/timothy-fraczak-e-i-t-1393a183/" target="_blank">LinkedIn</a></li>
            </ul>
          </li>
          <li>
            <h2>Chris Joo</h2>
            <ul role="list">
              <li><a href="https://github.com/chrisj1225" target="_blank">Github</a></li>
              <li><a href="https://www.linkedin.com/in/chrisj1225/" target="_blank">LinkedIn</a></li>
            </ul>
          </li>
          <li>
            <h2>Freddy Diengott</h2>
            <ul role="list">
              <li><a href="https://github.com/fdiengott" target="_blank">Github</a></li>
              <li><a href="https://www.linkedin.com/in/freddiengott/" target="_blank">LinkedIn</a></li>
            </ul>
          </li>
        </ul>
      </section>
    </footer>
  )
}; 


export default Footer; 