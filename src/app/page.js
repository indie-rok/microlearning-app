"use client";

import {
  Divider,
  Row,
  Col,
  Card,
  Alert,
  Button,
  Space,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

export default function Home() {
  const { push } = useRouter();
  return (
    <>
      <Alert
        message="Congratz on your 10 day streak"
        type="success"
        action={
          <Space direction="vertical">
            <Button size="small" type="primary">
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
