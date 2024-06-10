import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  FileAddOutlined,
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
            label: "Tambah Barang",
            icon: <FileAddOutlined />,
            key: "/tambah",
          },
          {
            label: "Daftar Transaksi",
            icon: <ShoppingCartOutlined />,
            key: "/orders",
          },
          {
            label: "Daftar Pelanggan",
            icon: <UserOutlined />,
            key: "/customers",
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
