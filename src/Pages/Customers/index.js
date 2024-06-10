import { Avatar, Space, Table, Typography } from "antd";
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
          const allUsers = res.users.flatMap((users) => users);
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
  return (
    <div>
      <Space style={20} direction="vertical">
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
          ]}
          dataSource={dataSource}
        ></Table>
      </Space>
    </div>
  );
}

export default Customers;
