// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import {UnAuthError} from "@/exceptions/UnAuthException";

enum HttpMethod {
  Get, POST
}

enum ContentTypeHeader {
  JSON, FORM_DATA, FORM
}

const headers = (contextType: ContentTypeHeader) => {
  switch (contextType) {
    case ContentTypeHeader.JSON:
      return {'Content-Type': 'application/json',};
    case ContentTypeHeader.FORM_DATA:
      return {'Content-Type': 'multipart/form-data',};
    case ContentTypeHeader.FORM:
      return {'Content-Type': 'application/x-www-form-urlencoded',};
    default:
      return {};
  }
}

export async function executeRequest<T extends API.ResponseModel>(url: string,
                                                                  method: HttpMethod,
                                                                  body: any,
                                                                  headers: { [key: string]: any } | null,
                                                                  hasToken: boolean,
                                                                  options?: { [key: string]: any }){
  if (headers == null) {
    headers = {};
  }
  if (hasToken) {
    let token = localStorage.getItem("token");
    const whenLogin = localStorage.getItem("whenLogin");
    if (!token || !whenLogin) {
      throw new UnAuthError('未登录');
    }
    if (new Date().getTime() - parseInt(whenLogin) < 2 * 60 * 60 * 1000
      && new Date().getTime() - parseInt(whenLogin) > 1.5 * 60 * 60 * 1000) {
      const loginResult = await request<API.LoginResult>('/api/user/refreshToken', {
        method: 'POST',
        headers: {"Authorization": token},
      })
      if (loginResult.success) {
        localStorage.setItem("token", loginResult.data);
        localStorage.setItem("whenLogin", new Date().getTime() + '');
        token = loginResult.data;
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("whenLogin");
        throw new UnAuthError('token失效，请重新登录');
      }
    } else if (new Date().getTime() - parseInt(whenLogin) > 2 * 60 * 60 * 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("whenLogin");
      throw  new UnAuthError('token失效，请重新登录');
    }
    headers = {
      ...headers,
      "Authorization": token,
    }
  }
  return request<T>(url, {
    method: HttpMethod[method],
    headers: headers,
    data: body,
    ...(options || {}),
  })
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return executeRequest<API.LoginResult>('/api/user/login', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), false, options);
}

export async function registryApi(body: API.RegistryUser, options?: {[key: string]: any}) {
  return executeRequest<API.ResponseModel>('/api/user/registry', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), false, options);
}

/** 登录接口 POST /api/login/account */
export async function getUserInfo(token: string, options?: { [key: string]: any }) {
  return executeRequest<API.CurrentUserResponse>('/api/user/userInfo', HttpMethod.Get, null, {'Authorization': token,}, false, options);
}

export async function getBlogList(body: API.BlogQueryModel | API.PageParams, options?: {[key: string]: any}){
  return executeRequest<API.BlogListResponse>('/api/blog/getPage', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), false, options);
}

export async function saveBlog(body: API.BlogModel, options?: {[key: string]: any}){
  if (body.id) {
    return executeRequest<API.BlogObjectResponse>('/api/blog/update', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), true, options);
  } else {
    return executeRequest<API.BlogObjectResponse>('/api/blog/save', HttpMethod.POST, body, headers(ContentTypeHeader.JSON), true, options);
  }
}

export async function deleteBlog(blogId: string, options?: {[key: string]: any}){
  return executeRequest<API.ResponseModel>('/api/blog/delete', HttpMethod.POST, "ids=" + blogId, headers(ContentTypeHeader.FORM), true, options);
}

export async function getBlogDetail(body: string, options?: {[key: string]: any}){
  return executeRequest<API.BlogObjectResponse>('/api/blog/detail/' + body, HttpMethod.POST, body, null, false, options);
}

export async function fileUpload(file: File){
  const form = new FormData();
  form.append("file", file);
  return executeRequest<API.FileObjectResponse>('/api/file/upload/', HttpMethod.POST, form, null, false, {requestType: "form"});
}
