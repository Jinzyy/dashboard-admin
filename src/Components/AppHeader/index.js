import {
  BellFilled,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Image, Space, Typography, Dropdown, Menu } from "antd";

function AppHeader() {
  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="AppHeader"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Space>
        <Image
          width={40}
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        ></Image>
        <Typography.Title style={{ fontSize: 24 }}>
          Toko Bawang Berkat
        </Typography.Title>
      </Space>
      <Space>
        <Dropdown overlay={menu}>
          <Space>
            <UserOutlined style={{ fontSize: 24 }} />
            <Typography.Text>Admin</Typography.Text>
          </Space>
        </Dropdown>
      </Space>
    </div>
  );
}

export default AppHeader;
