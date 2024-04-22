"use client";

import { useState } from "react";
import {
  Divider,
  Row,
  Col,
  Card,
  Alert,
  Button,
  Space,
  Typography,
  notification,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";

import { useCoinStore } from "./_lib/store";

export default function Home() {
  const { push } = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const increaseCoins = useCoinStore((state) => state.increaseCoins);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Coins added",
      placement: "bottomRight",
    });
  };

  return (
    <>
      {contextHolder}
      <Alert
        message="Congratz on your 10 day streak"
        type="success"
        action={
          <Space direction="vertical">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setIsButtonDisabled(true);
                increaseCoins(100);
                openNotificationWithIcon("success");
              }}
              disabled={isButtonDisabled}
            >
              Get my 100 coins
            </Button>
          </Space>
        }
        closable
      />
      <Divider />
      <Typography.Title level={3}>My courses</Typography.Title>

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            onClick={() => {
              push("courses/sql");
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="SQL 101" />
          </Card>
        </Col>
      </Row>
    </>
  );
}
