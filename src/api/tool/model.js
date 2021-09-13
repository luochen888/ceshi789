import request from '@/utils/request'

/**
 * 查询模型列表
 * @param {*} query
 */
export function getModelList(query) {
  return request({
    url: '/activiti/model/list',
    method: 'post',
    params: {
      pageSize: query.pageSize,
      pageNum: query.pageNum
    },
    data: {
      ...query
    }
  })
}

/**
 * 根据Id查询模型
 * @param {*} modelId
 */
export function getById(modelId) {
  return request({
    url: '/activiti/model/edit/' + modelId ,
    method: 'get'
  })
}

/**
 * 保存模型
 */
export function save(data) {
  return request({
    url: '/activiti/model/add',
    method: 'post',
    data
  })
}

/**
 * 删除模型
 * @param {*} modelId
 */
export function del(modelId) {
  return request({
    url: '/activiti/model/' + modelId,
    method: 'delete'
  })
}
/**
 * 部署模型
 * @param {*} modelId
 */
export function deployment(modelId) {
  return request({
    url: `/activiti/model/deploy/${modelId}`,
    method: 'get'
  })
}
