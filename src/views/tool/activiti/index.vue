<template>
  <div class="app-container">

    <el-card>
      <SearchForm
        :form-options="model.formOptions"
        :create="handleCreate"
        :delete="handleDelete"
        @search="search"
      />
      <Table
        :loading="loading"
        :data="model.list"
        :columns="model.columns"
        :total="model.total"
        :query="query"
        @pagination="queryList"
      >
        <el-table-column slot="status" label="状态" prop="deploymentId" align="center">
          <template slot-scope="{row}">
            <span v-if="row.deploymentId !== null">
              <el-tag type="success">已部署</el-tag>
            </span>
            <span v-else>
              <el-tag type="info">未部署</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          slot="action"
          label="操作"
          align="center"
          width="150"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-tooltip content="流程设计" placement="top"  v-hasPermi="['activiti:model:save']">
              <i class="el-icon-s-marketing operate operate-design" @click="handleDraw(row)" />
            </el-tooltip>
            <el-tooltip content="部署发布" placement="top" v-hasPermi="['activiti:model:deploy']">
              <i class="el-icon-s-promotion operate ml10 mr10 operate-edit" @click="handleDeploy(row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top" v-hasPermi="['activiti:model:remove']">
              <i class="el-icon-delete-solid operate operate-delete" @click="handleDelete(row)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </Table>
      <el-dialog
        :title="title"
        width="40%"
        top="5vh"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        @close="cancel"
      >
        <model-edit v-if="showDialog" ref="modelForm" :model-id="modelId" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Table from '@/components/Table'
import ModelEdit from './edit'
import request from '@/utils/request'
import { mapState, mapActions } from 'vuex'
import { MessageBox } from 'element-ui'
import SearchForm from '@/components/SearchForm'

export default {
  name: 'Model',
  components: { Table, ModelEdit, SearchForm },
  data() {
    return {
      title: '创建模型',
      loading: false,
      showDialog: false,
      tableKey: 1,
      query: {
        name: '',
        key: '',
        pageNum: 1,
        pageSize: 10
      },
      modelId: '',
      actUrl: process.env.VUE_APP_ACTIVITI_URL +'/modeler.html?'
    }
  },
  computed: {
    ...mapState({
      model: state => state.model
    })
  },
  mounted() {
    this.queryList()
  },
  methods: {
    ...mapActions('model', ['getList', 'deleteModel', 'deploy']),
    search(formData) {
      this.query = {
        ...this.query,
        ...formData
      }
      this.queryList()
    },
    queryList() {
      const self = this
      this.loading = true
      this.getList({
        ...self.query,
        success: () => {
          self.loading = false
        }
      })
    },
    handleDraw(row) {
       window.open(this.actUrl + `modelId=${row.id}`)
    },
    handleDeploy(row) {
      const self = this
      MessageBox.confirm('您确定要部署该模型吗？', '确认部署', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.deploy({
          modelId: row.id,
          success: (res) => {
          debugger
          if(res.code == 200){
            self.$message.success("部署成功")
            self.queryList()
          }else{
          self.$message.error(`部署失败，失败原因：${res.message}`)
          }

          }
        })
      })
    },
    handleCreate() {
      this.title = '创建模型'
      this.showDialog = true
    },
    handleDelete(row) {
      const self = this
      MessageBox.confirm('您确定要删除该模型吗？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.deleteModel({
          modelId: row.id,
          success: () => {
            self.queryList()
          }
        })
      })
    },
    cancel() {
      this.modelId = ''
      this.showDialog = false
      this.$refs.modelForm.resetForm()
    },
    submit() {
      const self = this
      this.$refs.modelForm.submitForm(() => {
        self.showDialog = false
        self.queryList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .operate{
    font-size: 20px;
  }
</style>
