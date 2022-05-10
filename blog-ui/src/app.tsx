import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import {getUserInfo} from "@/services/ant-design-pro/api";

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
  currentUser?: API.CurrentUser;
  token?: string;
  tokenKey: string;
}> {
  const tokenKey = "token";
  const token = localStorage.getItem(tokenKey);
  const whenLogin = localStorage.getItem("whenLogin");
  let userInfo = undefined;
  if (token && whenLogin) {
    if (new Date().getTime() - parseInt(whenLogin) < 2 * 60 * 60 * 1000) {
      try {
        userInfo = (await getUserInfo(token)).data;
        userInfo.avatar = '/api/file/download/' + userInfo.avatar;
      } catch (e) {}
    } else {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem("whenLogin");
    }
  }
  return {
    settings: defaultSettings,
    tokenKey: "token",
    currentUser: userInfo,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                  tokenKey: "token",
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
