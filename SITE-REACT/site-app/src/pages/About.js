import React from 'react'
import photo from '../static/background.jpg'
const About = () => {
  return (
    <div style={{'justifyContent':'center'}}>
        <img src={photo} className="img-fluid big-banner" alt="Responsive image"></img>
      <h2 style={{'fontFamily':'fantasy','textAlign':'center'}}><p>SeCarz</p></h2>
    </div>
  )
}

export default About