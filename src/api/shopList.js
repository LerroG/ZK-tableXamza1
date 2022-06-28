import http from '@/libs/axios';

export function getShopList(params) {
  return http({
    url: '/marked/marked/',
    method: 'get',
    params,
  });
}
export function getOneShopList(id) {
  return http({
    url: `/marked/marked/${id}/`,
    method: 'get',
  });
}

export function createShopList(data) {
  return http({
    url: '/marked/marked/',
    method: 'post',
    data,
  });
}

export function editShopList(data) {
  return http({
    url: `/marked/marked/${data.id}/`,
    method: 'patch',
    data,
  });
}

export function deleteShopList(data) {
  return http({
    url: `/marked/marked/${data.id}/`,
    method: 'delete',
    data,
  });
}

export function getShopList2(query) {
  return http({
    url: '/shoplist/',
    method: 'get',
    params: query,
  });
}
