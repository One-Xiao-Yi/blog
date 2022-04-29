import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';
import React from "react";

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Xiao Yi Blog',
  });

  const currentYear = new Date().getFullYear();
  // <a target="_blank" href="'https://icons8.com/icon/79041/博客'">博客</a> icon by <a target="_blank" href=""></a>
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
          {
            key: 'Icons8',
            href: 'https://icons8.com',
            title: 'Icon By Icons8',
            blankTarget: true,
          },
        ]}
    />
  );
};

export default Footer;
