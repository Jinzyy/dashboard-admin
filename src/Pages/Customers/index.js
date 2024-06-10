import { Avatar, Space, Table, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";

function Customers() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCustomers()
      .then((res) => {
        if (res && Array.isArray(res.users)) {
          const allUsers = res.users.flatMap((user) => user);
          setDataSource(allUsers);
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

  const handleEdit = (record) => {
    console.log("Edit:", record);
    // Tambahkan logika untuk mengedit pelanggan
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
    // Tambahkan logika untuk menghapus pelanggan
  };

  return (
    <div>
      <Space style={{ width: "100%" }} direction="vertical">
        <Typography.Title level={4}>Pelanggan</Typography.Title>
        <Table
          columns={[
            {
              title: "Nama Pelanggan",
              dataIndex: "firstName",
            },
            {
              title: "Alamat Pengiriman",
              dataIndex: "gender",
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
          loading={loading}
        ></Table>
      </Space>
    </div>
  );
}

export default Customers;
