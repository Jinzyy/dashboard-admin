import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {
          //TODO: item.key
          navigate(item.key);
        }}
        items={[
          {
            label: "Beranda",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Penyimpanan",
            icon: <ShopOutlined />,
            key: "/inventory",
          },
          {
            label: "Daftar Transaksi",
            icon: <ShoppingCartOutlined />,
            key: "/orders",
          },
          {
            label: "Daftar Supplier",
            icon: <TeamOutlined />,
            key: "/supplier",
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
