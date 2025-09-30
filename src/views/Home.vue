<script>
import http from "@/request/http.js";

export default {
  name: "Home",
  data() {
    return {
      activeIndex: '1',
      orders: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      order:{
        id:"",
        orderCode:"",
        orderName:"",
        price:"",
        isPay:0,
        address:"",
      }

    }
  },
  async mounted() {
    try {
      let {data: res} = await http.get("/findAllOrders")
      this.orders = res.data;
    } catch (error) {
      console.error("获取订单数据失败", error);
      this.$message.error('获取订单数据失败：' + (error.response?.data?.message || '请稍后重试'));
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      switch (key) {
        case '1':
          this.dialogTableVisible = true;
          break;
        case '2':
          this.dialogFormVisible = true;
          break;
        case '3':
          this.$message('查看历史订单');
          break;
        case '4':
          this.$message('进入个人后台');
          break;
      }
    },

    getStatusClass(status) {
      switch (status) {
        case '已完成':
          return 'status-completed';
        case '处理中':
          return 'status-processing';
        case '待处理':
          return 'status-pending';
        default:
          return '';
      }
    },

    saveOrder() {
      // 这里应该添加保存订单的逻辑
      console.log('保存订单:', this.order);
      // 重置表单
      this.order = {
        id: "",
        orderCode: "",
        orderName: "",
        price: "",
        isPay: 0,
        address: ""
      };
      // 关闭对话框
      this.dialogFormVisible = false;
      this.$message.success('订单保存成功');
    }
  }
}
</script>

<template>
  <div id="home">

    <el-dialog title="添加订单" :visible.sync="dialogFormVisible">
      <el-form :model="order">
        <el-form-item label="订单编号" :label-width="'120px'">
          <el-input v-model="order.orderCode" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="订单名称" :label-width="'120px'">
          <el-input v-model="order.orderName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="订单价格" :label-width="'120px'">
          <el-input v-model="order.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="支付情况" :label-width="'120px'">
          <el-input v-model="order.isPay" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="配送地址" :label-width="'120px'">
          <el-input v-model="order.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrder">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="订单信息" :visible.sync="dialogTableVisible"
        placement="right"
        width="400"
        trigger="click">
      <el-table :data="orders">
        <el-table-column width="150" property="id" label="序号"></el-table-column>
        <el-table-column width="150" property="orderCode" label="订单编号"></el-table-column>
        <el-table-column width="150" property="orderName" label="订单名称"></el-table-column>
        <el-table-column width="150" property="price" label="订单价格"></el-table-column>
        <el-table-column width="150" property="isPay" label="是否支付"></el-table-column>
        <el-table-column width="150" property="address" label="配送地址"></el-table-column>
      </el-table>
      <el-button slot="reference">click 激活</el-button>
    </el-dialog>


    <div class="home-container">
      <!-- 头部导航 -->
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <i class="el-icon-shopping-bag-1"></i>
            <span>订单管理系统</span>
          </div>
          <div class="nav-menu">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#409EFF"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
            >
              <el-menu-item index="1">订单信息</el-menu-item>
              <el-menu-item index="2">添加订单</el-menu-item>
              <el-menu-item index="3">历史订单</el-menu-item>
              <el-menu-item index="4">进入个人后台</el-menu-item>
            </el-menu>
          </div>
          <div class="user-info">
            <div class="user-avatar">
              <i class="el-icon-user"></i>
            </div>
            <span>系统操作员</span>
          </div>
        </div>
      </header>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 欢迎区域 -->
        <div class="welcome-section">
          <h2 class="welcome-title">欢迎使用订单管理系统</h2>
          <p class="welcome-subtitle">高效管理您的订单信息，提升业务处理效率</p>
        </div>

        <!-- 数据卡片 -->
        <div class="dashboard-cards">
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-icon" style="background-color: #409EFF;">
                <i class="el-icon-document"></i>
              </div>
              <div class="card-title">今日订单</div>
            </div>
            <div class="card-content">今日新增订单数量</div>
            <div class="card-value">128</div>
          </div>
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-icon" style="background-color: #67C23A;">
                <i class="el-icon-shopping-cart-full"></i>
              </div>
              <div class="card-title">待处理订单</div>
            </div>
            <div class="card-content">需要立即处理的订单</div>
            <div class="card-value">24</div>
          </div>
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-icon" style="background-color: #E6A23C;">
                <i class="el-icon-money"></i>
              </div>
              <div class="card-title">本月销售额</div>
            </div>
            <div class="card-content">当前月份的总销售额</div>
            <div class="card-value">¥86,500</div>
          </div>
        </div>

        <!-- 最近订单 -->
        <div class="recent-orders">
          <h3 class="section-title">最近订单</h3>
          <el-table
              :data="orders"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column
                prop="id"
                label="序号id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="orderCode"
                label="订单号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="orderName"
                label="订单名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格">
            </el-table-column>
            <el-table-column
                prop="isPay"
                label="是否支付"
                sortable>
            </el-table-column>
            <el-table-column
                prop="address"
                label="配送地址"
                sortable>
            </el-table-column>
          </el-table>
        </div>
      </main>

      <!-- 页脚 -->
      <footer class="footer">
        <p>订单管理系统 © 2025 版权所有</p>
      </footer>
    </div>
  </div>

</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  background-color: #f5f7fa;
}

.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #409EFF;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.logo i {
  margin-right: 10px;
  font-size: 24px;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-menu .el-menu-item {
  font-size: 16px;
  padding: 0 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #E6A23C;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 10px;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.welcome-section {
  background: linear-gradient(135deg, #409EFF, #67C23A);
  color: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.welcome-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.welcome-subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.dashboard-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 18px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.card-content {
  color: #606266;
  font-size: 14px;
  margin-bottom: 15px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.recent-orders {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #303133;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.footer {
  text-align: center;
  padding: 20px;
  color: #909399;
  font-size: 14px;
  border-top: 1px solid #ebeef5;
  background-color: white;
}

.status-tag {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.status-pending {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.status-completed {
  background-color: #f0f9eb;
  color: #67c23a;
}

.status-processing {
  background-color: #ecf5ff;
  color: #409eff;
}

</style>