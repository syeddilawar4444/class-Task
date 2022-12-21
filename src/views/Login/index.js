import React from 'react'
import "../../App.css"
import {loginFacebookHandler} from "../../config/firebase"

export default function login() {
  return (
    <div>
      <h1>Q Application</h1>
    <button onClick={loginFacebookHandler}>Login With Facebook</button>
    </div>
  )
}
