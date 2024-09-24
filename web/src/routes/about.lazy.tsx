import { Button, Card, Layout, Space, Typography } from 'antd';
import { createLazyFileRoute } from '@tanstack/react-router';

import { DefaultLayout } from '@/pages/DefaultLayout';
import { useToggle } from '@/lib/hooks';
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export const Route = createLazyFileRoute('/about')({
  component: About,
});

function About() {
  const [enable, handleToggle] = useToggle();

  return (
    <DefaultLayout
      additionalHeaders={
        <Button
          type={enable ? 'primary' : undefined}
          icon={<CheckOutlined />}
          onClick={handleToggle}
        />
      }
    >
      <Layout className='justify-center items-center'>
        <div className='flex flex-col gap-4 items-center'>
          <Card className='w-60' title='Ant & Flow'>
            <Space direction='vertical'>
              <Typography>Ant.Design</Typography>
              <Typography>React DnD</Typography>
              <Typography>React Flow</Typography>
              <Typography>Tailwind</Typography>
              <Typography>Tamstack Router</Typography>
            </Space>
          </Card>
          <Card
            className={classNames(
              'w-72 transition-colors',
              enable && 'bg-green-400 text-black',
            )}
          >
            A second page with a button link
          </Card>
        </div>
      </Layout>
    </DefaultLayout>
  );
}
