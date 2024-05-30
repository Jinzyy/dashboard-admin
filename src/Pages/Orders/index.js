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
        <Typography.Title level={4}>Orders</Typography.Title>
        <Table
          columns={[
            {
              title: "Thumbnail",
              dataIndex: "thumbnail",
              render: (link) => {
                return <Avatar src={link} />;
              },
            },
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Total Discount",
              dataIndex: "discountedTotal",
              render: (value) => <span>${value}</span>,
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
