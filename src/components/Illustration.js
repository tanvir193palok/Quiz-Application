import React from 'react'
import classes from '../styles/Illustration.module.css'
import signupImage from '../assets/images/signup.svg'

function Illustration() {
  return (
    <div className={classes.illustration}>
    <img src={signupImage} alt="Signup" />
  </div>
  )
}

export default Illustration
