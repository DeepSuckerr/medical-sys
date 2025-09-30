<template>
  <div class="login-container">
    <!-- 左侧欢迎信息 -->
    <div class="left-panel">
      <h1 class="welcome-text">创建账户</h1>
      <p class="subtitle">注册新账户以访问系统功能，管理您的数据并与团队协作。</p>
    </div>

    <!-- 右侧注册表单 -->
    <div class="right-panel">
      <h2 class="login-title">注册系统</h2>

      <el-form :model="regForm" :rules="regRules" ref="regForm" class="login-form" @submit.native.prevent>
        <div class="form-item">
          <el-form-item prop="username">
            <el-input
                v-model="regForm.username"
                placeholder="用户名"
                prefix-icon="el-icon-user"
                clearable
                class="custom-input">
            </el-input>
          </el-form-item>
        </div>

        <div class="form-item">
          <el-form-item prop="password">
            <el-input
                v-model="regForm.password"
                type="password"
                placeholder="密码"
                prefix-icon="el-icon-lock"
                show-password
                clearable
                class="custom-input">
            </el-input>
          </el-form-item>
        </div>

        <el-button
            type="primary"
            class="custom-button"
            :loading="loading"
            @click="handleReg">
          注册
        </el-button>
      </el-form>

      <div class="divider">
        <span>其他注册方式</span>
      </div>

      <div class="social-login">
        <div class="social-icon wechat">
          <i class="el-icon-message"></i>
        </div>
        <div class="social-icon qq">
          <i class="el-icon-user"></i>
        </div>
        <div class="social-icon weibo">
          <i class="el-icon-star-on"></i>
        </div>
      </div>

      <div class="footer">
        <p>已有账户？<a @click="goToLogin" class="register-link">立即登录</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/request/http";

export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      regForm: {
        username: '',
        password: ''
      },
      regRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '3-15个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '6-20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
   async handleReg() {
      // 先进行表单验证
      this.$refs.regForm.validate(async (valid) => {
        if (!valid) return;

        let {data : res} = await http.post('/addUser', {
          userName: this.regForm.username,
          password: this.regForm.password,
        })
        if(res.code === 200){
          this.$message({
            "message": res.msg,
            "type": 'success'
          })
          await this.$router.push('Login')
        }else{
          this.$message({
            "message": res.msg,
            "type": 'error'
          })
        }

      });
    },
    goToLogin() {
      this.$router.push('/Login');
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  width: 900px;
  height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.left-panel {
  flex: 1;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-text {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
}

.right-panel {
  flex: 1;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-title {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
}

.login-form {
  width: 100%;
}

.form-item {
  margin-bottom: 15px;
}

.custom-input ::v-deep .el-input__inner {
  height: 45px;
  border-radius: 25px;
  padding-left: 45px;
  font-size: 14px;
  border: 2px solid #e0e0e0;
  transition: border-color 0.3s;
}

.custom-input ::v-deep .el-input__inner:focus {
  border-color: #409EFF;
}

.custom-input ::v-deep .el-input__icon {
  line-height: 45px;
  width: 40px;
  font-size: 16px;
  color: #909399;
}

.custom-input ::v-deep .el-form-item__error {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  line-height: 1.5;
  padding-top: 2px;
}

.custom-button {
  width: 100%;
  height: 45px;
  border-radius: 25px;
  font-size: 16px;
  background: linear-gradient(135deg, #409EFF, #66b1ff);
  border: none;
  margin-top: 10px;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.custom-button:hover {
  background: linear-gradient(135deg, #66b1ff, #409EFF);
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3);
  transform: translateY(-2px);
}

.custom-button:active {
  transform: translateY(0);
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}

.divider span {
  padding: 0 15px;
  color: #909399;
  font-size: 14px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.wechat {
  background: #07C160;
  color: white;
}

.qq {
  background: #12B7F5;
  color: white;
}

.weibo {
  background: #E6162D;
  color: white;
}

.footer {
  text-align: center;
  margin-top: 20px;
  color: #909399;
  font-size: 14px;
}

.footer p {
  margin: 0;
}

.register-link {
  color: #409EFF;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    width: 90%;
    height: auto;
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    margin: 20px auto;
  }

  .left-panel {
    padding: 30px 20px;
  }

  .right-panel {
    padding: 20px;
  }
}
</style>