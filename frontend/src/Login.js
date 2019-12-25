import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import api from './api'

export default withRouter(function(props){
  var nameRef = useRef()
  var passwordRef = useRef()
  var captchaRef = useRef()

  async function login(e) {
    e.preventDefault()
    var name = nameRef.current.value
    var password = passwordRef.current.value
    var captcha = captchaRef.current.value

    try {
      var res = await api.post('/login', {name, password, captcha})
      props.history.push(`/restaurant/${res.data.id}/manage/`)
    } catch(e) {
      alert(e.response.data.msg)
    }

  }
  
  return (
    <div>
      <h2>餐厅管理员登陆</h2>
      <form onSubmit={login}>
      用户名<br/><input type="text" ref={nameRef}/><br/>
      密码<br/><input type="password" ref={passwordRef}/><br/>
      验证码（区分大小写）<br/><input type="text" ref={captchaRef}/><br/>
      <br/><img src="/api/captcha" alt="captcha"/><br/>
      <br/><button>Login</button><br/>
      </form>
    </div>
  )
})
