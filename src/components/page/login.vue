<template>

<div class="login-wrap">

  <div class="ws-title">Genesis 后台管理系统</div>
  <div class="ws-login">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <div class="login-btn">
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>



</div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'login',
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        pass: ''
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var qs = require('qs')
          var user = this.loginForm.username
          var pass = this.loginForm.pass
          var router = this.$router
          this.$axios.post('http://localhost:8080/api/loginCheck', qs.stringify({
            username: user,
            password: pass
          }))
            .then(function (res) {
              console.log(res)
              console.log(res.data['stateCode'])
              if (res.data['stateCode'] == 2) {
                Message.success('登录成功')
                const wsUsername = localStorage.getItem('wsUsername')
                if (wsUsername) {
                  localStorage.removeItem('wsUsername')
                }
                localStorage.setItem('wsUsername', user)
                router.push('/main')
              } else if (res.data['stateCode'] == 1) {
                Message.error('密码错误')
              } else if (res.data['stateCode'] == 0) {
                Message.warning('用户名不存在')
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          this.$message.error('请检查输入!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>

<style scoped>
.login-wrap{
  background-color: #324157;
  position: absolute;
  width:100%;
  height:100%;
}

.ws-title{
  position: absolute;
  top:50%;
  width:100%;
  margin-top: -230px;
  text-align: center;
  font-size:30px;
  color: #fff;
}
.ws-login{
  position: absolute;
  left:50%;
  top:50%;
  width:300px;
  height:160px;
  margin:-150px 0 0 -190px;
  padding:40px 60px 40px 5px;
  border-radius: 5px;
  background: #fff;
  }
.login-btn{
    text-align: center;
}
.login-btn button{
    width: 100%;
   height: 30px;
}
</style>
