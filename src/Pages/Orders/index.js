import { Space, Typography, Table, Avatar } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";

function Orders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((res) => {
        if (res && Array.isArray(res.carts)) {
          const allProducts = res.carts.flatMap((cart) => cart.products);
          setDataSource(allProducts);
        } else {
          console.error("Unexpected response structure:", res);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error setting data source:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Space style={20} direction="vertical">
        <Typography.Title level={4}>Transaksi</Typography.Title>
        <Table
          columns={[
            {
              title: "Kode Pesanan",
              dataIndex: "",
            },
            {
              title: "Nama Barang",
              dataIndex: "title",
            },
            {
              title: "Harga Barang",
              dataIndex: "price",
              render: (value) => <span>Rp{value}</span>,
            },
            {
              title: "Jumlah Barang",
              dataIndex: "quantity",
            },
            {
              title: "Harga Total",
              dataIndex: "total",
              render: (value) => <span>Rp{value}</span>,
            },
            {
              title: "Status",
              dataIndex: "",
            },
          ]}
          loading={loading}
          dataSource={dataSource}
        />
      </Space>
    </div>
  );
}

export default Orders;
