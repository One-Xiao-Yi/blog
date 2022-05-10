// @ts-ignore
/* eslint-disable */

declare namespace API {

  type CurrentUser = {
    name?: string;
    avatar?: string;
    id?: string;
    account?: string;
  };

  type RegistryUser = CurrentUser & {
    password: string,
    retryPassword: string,
    inviteCode: string,
  }

  type LoginResult = ResponseModel & {
    data: string
  };

  type CurrentUserResponse = ResponseModel & {
    data: CurrentUser,
  }

  type PageParams = {
    current?: number;
    pageSize?: number;
    total?: number
  };

  type ResponseModel = PageParams & {
    msg: string,
    success: boolean,
    code: number,
  }

  type FileModel = {
    id: string,
    path: string,
  }

  type FileObjectResponse = ResponseModel & {
    data?: FileModel,
  }

  type BlogModel = {
    id?: string,
    title: string,
    path?: string,
    createdBy: string,
    src?: string,
    cover?: string,
  }

  type BlogListResponse = ResponseModel & {
    rows?: BlogModel[],
  }

  type OrderQuery = {
    orderFields?: string,
    orderType?: string,
  }

  type BlogQueryModel = ResponseModel & OrderQuery & {
    createdBy?: string,
  }

  type BlogObjectResponse = ResponseModel & {
    data?: BlogModel,
  }

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    account?: string;
    password?: string;
  };
}
