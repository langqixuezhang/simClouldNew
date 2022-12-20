<!--
 * @Description: 角色管理
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-21 16:36:51
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-22 10:07:38
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\roleManage.vue
 -->


<template>
      <el-dialog v-model="dialogVisible" title="角色管理" @close="dialogCancel" width="50%" custom-class="permission-dialog">
        <div class="perm-dialog-contant">
          <div class="perm-dialog-left">
            <div class="left-search">
              <el-input class="serviceSearch" v-model="searchRole" :suffix-icon="Search" placeholder="请输入搜索内容" @input="filterServices()">
              </el-input>
            <Tooltip effect="light" popper-class="hr-ui"  content="角色添加"  placement="top" :open-delay=1500 >
              <span class="addCategory" @click.stop="allRoleHandle()"></span>
            </Tooltip>
            </div>
            <div class="left-list">
              <ul  >
                <li v-for="item in searchRoleList || systeminRoleList" :key="item.roleId" @click="roleClickHandle(item)" :class="item.roleId === roleActiveId ? 'li-acition' : ''">
                  <span class="ellipsis">{{item.roleName}}</span>
                  <Tooltip effect="light" popper-class="hr-ui"  content="角色删除"  placement="top" :open-delay=1500 >
                   <i class="hr-icon-shanchutubiao" @click="deleRoleHandle(item)"></i>
                  </Tooltip>
                  </li>
              </ul>
            </div>
          </div>
          <div class="perm-dialog-right">
            <Tabs :stretch='true' v-model="activeName" @tab-click="tabHnadleCilck()">
              <TabPane label="用户" name="用户">
                <div class="tab-user">
                  <div class="tab-user-content">
                    <div class="user " v-for="item in  roleActiveId ? roleUsers : [] " :key="item.Id">
                      <span class="ellipsis">{{item.nickName}}</span>
                      <i class="hr-icon-clear" @click="deleUserHandle(item)"></i></div>
                  </div>
                  <div class="tab-user-add">
                    <Tooltip effect="light" popper-class="hr-ui"  content="用户添加"  placement="top" :open-delay=1500>
                     <span class="addCategory" @click.stop="addCategoryClick()"></span>
                    </Tooltip>
                  </div>
                   <div class="right-check" v-if="checkShowR" @click.stop>
                    <Input class="serviceSearch" v-model="searchAllUser" placeholder="请输入搜索内容" @input="userSearch()">
                    </Input>
                    <div class="check-box">
                      <CheckboxGroup v-model="checkUserList">
                        <Checkbox  v-for="item in searchAllUserList || localUserList" :label="item.userId" :key="item.userId" :disabled="item.disabled">{{ item.nickName }}</Checkbox>
                      </CheckboxGroup>
                    </div>
                    <span class="add-btn" :class="{'disbtn':addUserBtn}"  @click="!addUserBtn && addCategoryHandle()">添加用户</span>
                  </div>
                </div>
              </TabPane>
              <TabPane label="权限">
                  <div class="tab-permissions">
                    <div v-if="permissionsTab">
                      <div v-for="item in this.roleActiveId && roleinPowerList" :key="item.Id" class="service service-no"
                        @click="rolePermissionsHandle(item)">
                        <span class="ellipsis">{{ item.path }}</span>
                        <i></i>
                      </div>
                    </div>
                    <div class="permissions-mangen" v-else>
                      <div class="title"><i @click="rolePermissionsBack()"></i> <span>test</span></div>
                      <div class="info">
                        <span v-for="item in rolePermissionsSetList" :key="item.id" @click="rolePermissionsSetHandle(item)" :class="item.status ? 'confirm' : 'noconfirm'">
                            name-test
                        </span>
                      </div>
                      </div>
                  </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
<!--     
        <template #footer>
          <span class="dialog-footer"> 
            <el-botton class="btn-cancel" @click="dialogCancel">取消</el-botton>
            <el-botton class="btn-primary" type="primary" @click="dialogPrimary">确定</el-botton>
          </span>
        </template> -->
      </el-dialog>
</template>

<script setup>
import { ref,defineProps,watch , defineEmits} from "vue";
import { Search } from '@element-plus/icons-vue'
import { globalStore } from "@/store/globalManage.ts"
const store = globalStore()

// props
const props = defineProps ({
  openRoleManage:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)

// 确认
// const dialogPrimary = () => {
//   dialogCancel()
// }

// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
}


watch ( () => props.openRoleManage,  (newValue, oldValue) => {
    console.log('watc1h', newValue, oldValue)
  dialogVisible.value = newValue
})


const roleActiveId = ref('')  // 激活角色ID

const searchRole = ref('')  // input搜索
const searchRoleList = ref(null)
const filterServices = () => {

}

const roleClickHandle = () => { // 角色点击回调

}
const deleRoleHandle = () => { // 角色删除回调

}
const allRoleHandle = () => { // 角色添加

}
// right
const activeName = ref('用户')
const tabHnadleCilck = () => { // tab点击回调

} 
const roleUsers = []    // 角色用户
const deleUserHandle = () => {  // 角色用户删除回调

}
const addCategoryClick = () => {  // 添加用户（点击

}
const checkShowR = ref(false)  // 用户list显示
const searchAllUser = ref('') // 所有用户搜索
const userSearch = () => {  // 全部用户 》 搜索

}
const checkUserList = []     // 用户类型变量
const searchAllUserList = ref(null)   // 所有用户搜索list
const localUserList = []   // 角色下用户数据
const addUserBtn = ref(false)
const addCategoryHandle = () => {   // 添加用户

}
// 权限
const roleinPowerList = []
const rolePermissionsHandle = () => { // 角色权限点击回调

}
const rolePermissionsBack = () => {

}
const rolePermissionsSetList = []   // 角色权限list
const rolePermissionsSetHandle = () => { 

}




const systeminRoleList = [{   // 系统数据list
  roleName:'1',
  roleId:1,

}]




</script>

<style lang='scss' >
  .permission-dialog {
    .ellipsis {
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      word-break: normal;
    }
    .add-btn {
        float: right;
        cursor: pointer;
        font-size: 12px;
        padding: 0 16px;
        line-height: 30px;
        margin-top: 10px;
        background-color: #2687ff;
        border-radius: 5px;
        color: #ffffff;
        border: solid 1px #2687ff;
        &:hover {
          background-color: #036def;
          border: solid 1px #036def;
        }
      }
      .disbtn {
        cursor: not-allowed;
        background-color: rgba(38, 135, 255, 0.5);
        border: solid 1px rgba(38, 135, 255, 0.1);
        &:hover {
          background-color: rgba(38, 135, 255, 0.5);
          border: solid 1px rgba(38, 135, 255, 0.1);
        }
      }
    // .serviceSearch {
    //     .el-input__inner {
    //       background-color: #f2f5f8;
    //       border: solid 1px #ced9e6;
    //       height: 34px;
    //       &::-webkit-input-placeholder {
    //           color: #a9b6c6;
    //       }
    //     }
    //     .el-input__suffix .el-input__suffix-inner {
    //         position: relative;
    //         top: 7px;
    //         right: 5px;
    //         .hr-icon-sousuo {
    //           color: #6981a0;
    //         }
    //       }
    //   }
    .el-dialog__body {
      background-color: #e5e9f1;
      // padding: 10px !important;
      &> div {
        background-color: #e5e9f1;

      }
      .perm-dialog-contant {
        height: 520px;
        overflow: hidden;
        .perm-dialog-left {
          float: left;
          width: 300px;
          height: 100%;
          padding: 10px;
          box-sizing: border-box;
          background-color: white;
        }
        .perm-dialog-right {
          float: right;
          width: calc(100% - 310px);
          height: 100%;
          background-color: white;
        }
      }
    }
    .el-dialog__footer {
      display: none;
    }
    //
    .perm-dialog-left {
      position: relative;
      .left-search {
        display: flex;
        justify-content: space-between;
        .serviceSearch {
          width: 235px;
        }
        .addCategory {
          cursor: pointer;
          display: inline-block;
          width: 34px;
          height: 34px;
          // background: url('../../../../../assets/images/common/add_deploy_nomal.png') no-repeat;
          // &:hover {
          //   background: url('../../../../../assets/images/common/add_deploy_hover.png') no-repeat;
          // }
        }
      }
      .left-list {
        height: calc(100% - 45px);
        padding-top: 10px;
        ul li {
          list-style: none;
        }
        ul {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          overflow-y: scroll;
          scrollbar-width: none;
          &::-webkit-scrollbar {
              width: 3px;
              background-color: white;
            }
            &::-webkit-scrollbar-thumb {
              background: #b8c4d5 ;
              border-radius: 3px;
              box-shadow:none;
            }
            &::-webkit-scrollbar-track{
              box-shadow:none;
              // background-color: #f7f9fb;
            }
        }
        li {
          padding: 0 11px;
          line-height: 34px;
          cursor: pointer;
          background-color: #ecf0f6;
          border: solid 1px #d9e0ec;
          display: flex;
          .hr-icon-shanchutubiao {
            display: none;
            cursor: pointer;
              float: right;
              margin-top: 9px;
              color:  #8ba1bb;
              &:hover {
                color: #59a1ff;
              }
            }
          &:hover {
            border: solid 1px #3f95ff;
            .hr-icon-shanchutubiao {
              display: block;
            }
          }
          & + li {
            margin-top: 10px;
          }
        }
        .li-acition {
            background-color: #d2e6ff;
            border: solid 1px #3f95ff;
            color: #185db1;
            cursor: default;
            .hr-icon-shanchutubiao  {
              color: #59a1ff;
              &:hover {
                color: #1770dc;
              }
            }
        }
      }
      .left-check {
        top: 10px;
        right: 55px;
        position: absolute;
        width: 200px;
        height: 475px;
        padding: 10px;
        background-color: #f7f9fb;
        box-shadow: 0px 5px 5px 0px
          rgba(116, 144, 177, 0.2);
        border: solid 1px #ced9e6;
        .serviceSearch {
          width: 100%;
        }
        .check-box {
          height: 83%;
          overflow-x: hidden;
          overflow-y: scroll;
          scrollbar-width: none;
          &::-webkit-scrollbar {
              width: 0px;
              background-color: white;
            }
            &::-webkit-scrollbar-thumb {
              background: #b8c4d5 ;
              border-radius: 3px;
              box-shadow:none;
            }
            &::-webkit-scrollbar-track{
              box-shadow:none;
              // background-color: #f7f9fb;
            }
        }
        .el-checkbox-group {
          margin-top: 12px;
          .el-checkbox__input  {
            display: none;
          }
          .el-checkbox {
            width: 100%;
            margin: 0;
            .el-checkbox__label {
              display: inline-block;
              width: 100%;
              padding: 0;
              line-height: 30PX;
            }
          }
        }
        .add-role {
          font-size: 12px;
          background-color: #2687ff;
          border-radius: 5px;
          border: solid 1px #2687ff;
        }
      }
    }
    .perm-dialog-right {
      .el-tabs, .el-tab-pane {
        height: 100%;
      }
      .el-tabs__content {
        height: calc(100% - 55px);
      }
      // 用户
      .tab-user {
        height: 100%;
        position: relative;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 25px 25px;
        .tab-user-content {
          width: 92%;
          background: white;
          .user {
            float: left;
            display: flex;
            line-height: 36px;
            background-color: #ecf0f6;
            margin: 0 10px 10px 0;
            padding: 0 10px;
            // width: 170px;
            width: calc(30% - 11px);
            i {
              display: none;
              cursor: pointer;
              float: right;
              font-size: 18px;
              margin-top: 8px;
              &:hover {
                color: #59a1ff;
              }
            }
            &:hover {
              i {
                display: block;
              }
            }
          }

        }
        .tab-user-add {
          .addCategory {
            cursor: pointer;
            display: inline-block;
            width: 34px;
            height: 34px;
              // background: url('../../../../../assets/images/common/add_deploy_nomal.png') no-repeat;
              // &:hover {
              //   background: url('../../../../../assets/images/common/add_deploy_hover.png') no-repeat;
              // }
          }
        }
        .right-check {
            top: 0px;
            right: 88px;
            position: absolute;
            width: 240px;
            height: 430px;
            padding: 10px;
            background-color: #f7f9fb;
            box-shadow: 0px 5px 5px 0px
              rgba(116, 144, 177, 0.2);
            border: solid 1px #ced9e6;
            .serviceSearch {
              width: 100%;
            }
            .check-box {
              height: 82%;
              overflow-x: hidden;
              overflow-y: scroll;
              scrollbar-width: none;
              &::-webkit-scrollbar {
                  width: 0px;
                  background-color: white;
                }
                &::-webkit-scrollbar-thumb {
                  background: #b8c4d5 ;
                  border-radius: 3px;
                  box-shadow:none;
                }
                &::-webkit-scrollbar-track{
                  box-shadow:none;
                  // background-color: #f7f9fb;
                }
            }
            .el-checkbox-group {
              margin-top: 12px;
              .el-checkbox__input  {
                display: none;
              }
              .el-checkbox {
                width: 100%;
                margin: 0;
                  &:hover {
                    color: rgb(110, 153, 206);
                    background-color: #d8e9ff;
                  }
                .el-checkbox__label {
                  display: inline-block;
                  width: 100%;
                  padding: 0;
                  line-height: 30PX;
                }
                & +.el-checkbox {
                  margin-top: 2px;
                }
              }
              .is-checked {
                color: #c6dfff;
                background: #c6dfff;
                &:hover {
                  background: #c6dfff;
                }
              }
              .is-disabled {
                color: #606266;
                background:  #f7f9fb;
                &:hover {
                  background:  #f7f9fb;
                }
              }
            }
            .add-role {
              font-size: 12px;
              background-color: #2687ff;
              border-radius: 5px;
              border: solid 1px #2687ff;
            }
        }
      }
      // 权限
      .tab-permissions {
        height: calc(100% - 20px);
        box-sizing: border-box;
        padding: 0 20px;
        margin-bottom: 20px;
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
        .service {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          line-height: 36px;
          float: left;
          width: calc(50% - 10px);
          box-sizing: border-box;
          padding: 0 10px;
          margin-bottom: 10px;
          i {
            display: inline-block;
            height: 29px;
            width: 28px;
            vertical-align: middle;
          }
          &:nth-child(odd) {
            margin-right: 20px;
          }
        }
        .permissions-mangen {
          height: 100%;
          .title {
            border-bottom: 1px solid #ced9e6;
            padding-bottom: 8px;
            display: flex;
            align-items: center;
            i {
              display: inline-block;
              width: 26px;
              height: 26px;
              cursor: pointer;
              margin-right: 16px;
              // background: url('../../../../../assets/images/hr-service-node/exit_normal.png') no-repeat;
              // &:hover {
              //   background: url('../../../../../assets/images/hr-service-node/exit_hover.png')no-repeat;
              // }
            }
            span {
              font-size: 16px;
              font-weight: 700;
              color: #415875;
            }
          }
          .info {
            height:calc(100% - 48px);
            padding-top: 8px;
            span {
              display: flex;
              cursor: pointer;
              line-height: 36px;
              float: left;
              width: calc(50% - 10px);
              box-sizing: border-box;
              padding: 0 10px;
              margin-bottom: 15px;
              &:nth-child(odd) {
                margin-right: 20px;
                }
            }
            .confirm {
              color: #ffffff;
              background-color: #00b361;
            }
            .noconfirm {
              color: #32373c;
              background-color: #ecf0f6;
            }
          }
        }
        .service-confirm {
          color: #ffffff;
          background-color: #00b361;
          // i {
          //   background: url('../../../../../assets/images/hr-service-arrange/enable.png') no-repeat;
          // }
        }
        .service-no {
          color: #32373c;
          background-color: #ecf0f6;
          // i {
          //   background: url('../../../../../assets/images/hr-service-arrange/no_enable.png') no-repeat;
          // }
        }
          &::-webkit-scrollbar {
              width: 3px;
              background-color: white;
            }
            &::-webkit-scrollbar-thumb {
              background: #b8c4d5 ;
              border-radius: 3px;
              box-shadow:none;
            }
            &::-webkit-scrollbar-track{
              box-shadow:none;
              // background-color: #f7f9fb;
            }
      }
    }

}
</style>