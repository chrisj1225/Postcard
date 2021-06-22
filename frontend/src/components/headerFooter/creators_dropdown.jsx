import React from 'react'; 


class CreatorsDropdown extends React.Component {
  constructor(props) {
    super(props);   

    this.state = { clicked: false }

    this.toggleClicked = this.toggleClicked.bind(this); 
  }

  toggleClicked() {
    this.setState({ clicked: !this.state.clicked })
  }


  render() {
    const { clicked } = this.state; 

    return (
      <div onClick={this.toggleClicked} className={clicked ? "creators-btn active" : "creators-btn inactive"}>
        <p>Creators <i className={ clicked ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i></p>
        <section className={clicked ? "creators-list active" : "creators-list inactive"}>
          <ul role="list">
            <li>
              <h2><a href="https://thedanielcho.com" target="_blank">Daniel Cho</a></h2>
              <ul role="list">
                <li><a href="https://github.com/thedanielcho" target="_blank">Github</a></li>
                <li><a href="https://www.linkedin.com/in/daniel-cho-376110189/" target="_blank">LinkedIn</a></li>
                <li><a href="https://angel.co/u/daniel-cho-31" target="_blank">AngelList</a></li>
              </ul>
            </li>
            <li>
              <h2><a href="https://tfraczak.github.io/portfolio/" target="_blank">Tim Fraczak</a></h2>
              <ul role="list">
                <li><a href="https://github.com/tfraczak" target="_blank">Github</a></li>
                <li><a href="https://www.linkedin.com/in/tfraczak/" target="_blank">LinkedIn</a></li>
                <li><a href="https://angel.co/u/tfraczak" target="_blank">AngelList</a></li>
              </ul>
            </li>
            <li>
              <h2><a href="https://fdiengott.github.io/portfolio/" target="_blank">Freddy Diengott</a></h2>
              <ul role="list">
                <li><a href="https://github.com/fdiengott" target="_blank">Github</a></li>
                <li><a href="https://www.linkedin.com/in/freddiengott/" target="_blank">LinkedIn</a></li>
                <li><a href="https://angel.co/u/freddy-diengott" target="_blank">AngelList</a></li>
              </ul>
            </li>
            <li>
              <h2><a href="https://chrisj1225.github.io/portfolio/" target="_blank">Chris Joo</a></h2>
              <ul role="list">
                <li><a href="https://github.com/chrisj1225" target="_blank">Github</a></li>
                <li><a href="https://www.linkedin.com/in/chrisj1225/" target="_blank">LinkedIn</a></li>
                <li><a href="https://angel.co/u/chris-joo" target="_blank">AngelList</a></li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}; 

export default CreatorsDropdown;  