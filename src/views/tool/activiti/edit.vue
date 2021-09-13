<template>
  <div class="app-container">
    <el-form
      ref="modelForm"
      :rules="rules"
      :model="modelForm"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="模型名称" prop="name">
        <el-input v-model="modelForm.name" placeholder="请输入模型名称" />
      </el-form-item>
      <el-form-item label="模型标识" prop="key">
        <el-input v-model="modelForm.key" placeholder="请输入模型标识" />
      </el-form-item>
      <el-form-item label="档案类型" prop="codeType">
        <el-cascader
            class="w100"
            v-model="modelForm.codeType"
            :options="datas"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="保密等级" prop="secrecyLevel">
        <el-select v-model="modelForm.secrecyLevel" class="w100"  placeholder="请选择保密等级" clearable>
          <el-option v-for="dict in SecrecyLevelOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流程描述" prop="desc">
        <el-input v-model="modelForm.desc" type="textarea" :rows="2" placeholder="请输入流程描述" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
 
export default {
  name: 'ModelEdit',
  props: {
    modelId: {
      required: false,
      type: String,
      default: ''
    }
  },
  data() {
    return {
      datas:[],
      SecrecyLevelOptions:[],
      props: {
        value: 'id',
        label: 'name'
      },
      modelForm: {
        name: '',
        key: '',
        category: '',
        codeType:'',
        secrecyLevel:'',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '模型名称不能为空', trigger: 'change' }
        ],
        key: [
          { required: true, message: '模型标识不能为空', trigger: 'change' }
        ],
        codeType:[
           { required: true, message: '模型标识不能为空', trigger: 'change' }
        ],
        secrecyLevel:[
           { required: true, message: '保密等级不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getDicts("SecrecyLevel").then(response => {
      this.SecrecyLevelOptions = response.data;
    });
    this.initTree()
  },
  methods: {
    ...mapActions('model', ['saveModel']),
    submitForm(fn) {
      const self = this
      this.$refs['modelForm'].validate(valid => {
        if (valid) {
          const data = {
            data: self.modelForm,
            success: fn
          }
          self.saveModel(data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs['modelForm'].resetFields()
    },
    getValue(val) {
      this.modelForm.category = val
    },
    initTree() {
      // baseGetLevelList().then(res => {
      //   this.initTreeData(this.datas, res.data)
      // })
    },
    initTreeData(child, res) {
      res.map(item => {
        var obj = {
          value: item.info.typeCode,
          label: item.info.typeName
        }
        if (item.subList) {
          obj.children = []
          this.initTreeData(obj.children, item.subList)
        }
        child.push(obj)
      })
    }
  }
}
</script>
