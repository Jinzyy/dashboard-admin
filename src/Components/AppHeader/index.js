import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Image, Space, Typography } from "antd";

function AppHeader() {
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
      ></Image>
      <Typography.Title style={{ fontSize: 24 }}>
        Toko Bawang Berkat
      </Typography.Title>
      <Space>
        <Badge count={10} dot>
          <MailOutlined style={{ fontSize: 20 }} />
        </Badge>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 20 }} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
