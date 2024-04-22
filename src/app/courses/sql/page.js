"use client";

import { Card, Divider, Flex } from "antd";
import Link from "next/link";

export default function Sql() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Your SQL journey</h2>
      <Divider />
      <Flex vertical={true} justify="center" align="center">
        <Card
          title="What are databases?"
          extra={<Link href="/courses/sql/1">More</Link>}
          style={{
            width: 300,
            marginBottom: 60,
          }}
        >
          <p>Discover this magic word of databases</p>
        </Card>

        <Card style={{ width: 300 }}>
          <p>More courses coming soon!</p>
        </Card>
      </Flex>
    </div>
  );
}
