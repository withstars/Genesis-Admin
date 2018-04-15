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
          this.$axios.post('http://localhost:8080/api/loginCheck', {
            username: this.loginForm.username,
            password: this.loginForm.pass
          })
            .then(function(res){
              console.log(res);
            })
            .catch(function(err){
              console.log(err);
            })

          const ws_username = localStorage.getItem('ws_username');

          if (ws_username){
            localStorage.removeItem('ws_username')
          }
          localStorage.setItem('ws_username', this.loginForm.username)
          this.$router.push('/main')
        } else {
          console.log('error submit!!')
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
