import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  logo: '/api/file/download/12',
  colorWeak: false,
  title: 'Xiao Yi Blog',
  iconfontUrl: '',
  navTheme: "light",
  primaryColor: "#52C41A",
  layout: "top",
  contentWidth: "Fixed",
  fixedHeader: false,
  pwa: false,
  headerHeight: 48,
  splitMenus: false
};

export default Settings;
