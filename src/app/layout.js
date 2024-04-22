"use client";

import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import { IconCoin } from "@tabler/icons-react";

const { Header, Content, Footer } = Layout;
import { useCoinStore } from "./_lib/store";

import "./reset.css";
import "./globals.css";

export default function RootLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const coins = useCoinStore((state) => state.coins);

  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ flex: 1, minWidth: 0 }}
            >
              <Menu.Item>
                <Link href="/">All courses</Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/garden">My garden</Link>
              </Menu.Item>
            </Menu>

            <h3>
              <span style={{ color: "#f39c12" }}>{coins}</span>{" "}
              <IconCoin color="#f1c40f" size={24} />
            </h3>
          </Header>
          <Content style={{ padding: "0 48px" }}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: "90vh",
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </body>
    </html>
  );
}
