// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

enum HttpMethod {
  Get, POST
}

enum ContentTypeHeader {
  JSON
}

const headers = (contextType: ContentTypeHeader) => {
  switch (contextType) {
    case ContentTypeHeader.JSON:
      return {'Content-Type': 'application/json',};
    default:
      return {};
  }
}

export async function executeRequest<T extends API.ResponseModel>(url: string, method: HttpMethod, body: any, headers: any, options?: { [key: string]: any }){
  return request<T>(url, {
    method: HttpMethod[method],
    headers: headers,
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return executeRequest<API.LoginResult>('/api/user/login', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), options);
}

export async function registryApi(body: API.RegistryUser, options?: {[key: string]: any}) {
  return executeRequest<API.ResponseModel>('/api/user/registry', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), options);
}

/** 登录接口 POST /api/login/account */
export async function getUserInfo(token: string, options?: { [key: string]: any }) {
  return executeRequest<API.CurrentUserResponse>('/api/user/userInfo', HttpMethod.Get, null, {'Authorization': token,}, options);
}

export async function getBlogList(body: API.BlogListResponse | API.PageParams, options?: {[key: string]: any}){
  return executeRequest<API.BlogListResponse>('/api/blog/getPage', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), options);
}

export async function saveBlog(body: API.BlogModel, options?: {[key: string]: any}){
  if (body.id) {
    return executeRequest<API.BlogObjectResponse>('/api/blog/update', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), options);
  } else {
    return executeRequest<API.BlogObjectResponse>('/api/blog/save', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), options);
  }
}

export async function getBlogDetail(body: string, options?: {[key: string]: any}){
  return executeRequest<API.BlogObjectResponse>('/api/blog/detail/' + body, HttpMethod.POST, body, null, options);
}
