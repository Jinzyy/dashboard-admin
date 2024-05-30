import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Image, Space, Typography } from "antd";
import getFontSizes from "antd/es/theme/themes/shared/genFontSizes";

function AppHeader() {
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
      ></Image>
      <Typography.Title style={{ fontSize: 28 }}>
        Dashboard Admin
      </Typography.Title>
      <Space>
        <Badge count={10} dot>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
