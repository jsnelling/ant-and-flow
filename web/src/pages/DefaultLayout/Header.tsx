import { Button, Divider, Space, Typography } from 'antd';
import { Fragment } from 'react';
import { Link } from '@tanstack/react-router';
import { ProjectOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { useDefaultLayoutContext } from '.';

export function Header() {
  const { additionalHeaders } = useDefaultLayoutContext();

  return (
    <Space align='baseline'>
      <Typography.Title level={4}>Ant & Flow</Typography.Title>

      <Divider type='vertical' />

      <Link to='/'>
        {({ isActive }) => (
          <Button
            type={isActive ? 'primary' : undefined}
            icon={<ProjectOutlined />}
          />
        )}
      </Link>

      <Link to='/about'>
        {({ isActive }) => (
          <Button
            type={isActive ? 'primary' : undefined}
            icon={<QuestionCircleOutlined />}
          />
        )}
      </Link>

      {Object.entries(additionalHeaders).map(
        ([key, header]) =>
          header && (
            <Fragment key={key}>
              <Divider type='vertical' />

              {header}
            </Fragment>
          ),
      )}
    </Space>
  );
}
