<template>
  <el-row
    v-else
    v-loading="loading"
    element-loading-text="拼命加载中">
    <error-comp v-if="error" :title="'asdgsd'"></error-comp>
    <h1>Hello App!
      <button @click="signOut">退出系统</button>
    </h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/wms/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item to="/wms/pane">标签页</el-breadcrumb-item>
          <el-breadcrumb-item to="/wms/qrcode">活动列表</el-breadcrumb-item>
          <el-breadcrumb-item to="/wms/user/1241">活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-card>
  </el-row>
</template>

<script>
  import { speckText } from '../config/Tools';
  import Vue from 'vue';
  import App from '../main';
  import {leaveSocket, socketConfig, checkSocket} from '../config/socket';

  import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    Scrollbar,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
  } from 'element-ui';

  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(Autocomplete);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Checkbox);
  Vue.use(CheckboxGroup);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(DatePicker);
  Vue.use(TimeSelect);
  Vue.use(TimePicker);
  Vue.use(Popover);
  Vue.use(Tooltip);
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Tag);
  Vue.use(Tree);
  Vue.use(Alert);
  Vue.use(Slider);
  Vue.use(Icon);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Progress);
  Vue.use(Spinner);
  Vue.use(Badge);
  Vue.use(Card);
  Vue.use(Rate);
  Vue.use(Steps);
  Vue.use(Step);
  Vue.use(Carousel);
  Vue.use(Scrollbar);
  Vue.use(CarouselItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Cascader);
  Vue.use(ColorPicker);

  socketConfig();
  
  export default {
    name: 'wms',
    beforeRouteEnter (to, from, next) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        let nickname = App.user.nickname;
        if (typeof nickname === 'undefined' || nickname === '') {
          App.$http.post('/wms4/users/Login')
          .then(response => {
            App.statusJudg(response.body.status, {
              s: () => {
                App.f(0, response.body.data);
                checkSocket(App.user.nickname);
                speckText(`欢迎回来! ${App.user.role}-${App.user.nickname}!`);
                next();
              },
              e: () => {
                next({path: '/login/1'});
              },
              show: true,
              type: 'warning',
            });
          });
        } else {
          speckText(`欢迎 ${App.user.role}-${App.user.nickname}!`);
          checkSocket(App.user.nickname);
          setTimeout(() => {
            console.log('页面加载完成!\n等待上一个页面动画完成中...');
            next();
          }, 1500);
        }
      } else {
        next();
      }
    },
    data () {
      return {
        loading: false,
        error: false,
        ws: '',
      };
    },
    methods: {
      signOut () {
        this.$http.post('/wms4/users/logout')
        .then(response => {
          if (response.body.status < 10000) {
            this.$router.push({path: '/login/1'});
            leaveSocket();
            console.log('用户退出！');
          }
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  /* 设置 router-view 动画特效*/
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }
  
  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
  
</style>
