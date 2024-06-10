import { Space, Typography, Table, Button } from "antd";
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

  const handleEdit = (record) => {
    console.log("Edit:", record);
    // Tambahkan logika untuk mengedit barang
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
    // Tambahkan logika untuk menghapus barang
  };

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
              render: (value) => <span>Rp {value.toLocaleString()}</span>,
            },
            {
              title: "Nama Supplier",
              dataIndex: "brand",
            },
            {
              title: "Aksi",
              dataIndex: "aksi",
              render: (_, record) => (
                <Space size="middle">
                  <Button type="primary" onClick={() => handleEdit(record)}>
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(record)}
                  >
                    Hapus
                  </Button>
                </Space>
              ),
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
