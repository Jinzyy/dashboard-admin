import { Space, Typography, Table, Avatar, Rate } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory()
      .then((res) => {
        setDataSource(res.products);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Total Barang</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Nama Barang",
              dataIndex: "title",
            },
            {
              title: "Harga",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Nama Supplier",
              dataIndex: "brand",
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </Space>
    </div>
  );
}

export default Inventory;
