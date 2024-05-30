import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomer(res.total);
    });
    getRevenue()
      .then((res) => {
        if (res && Array.isArray(res.carts)) {
          const data = res.carts.map((cart) => cart.discountedTotal);

          setRevenue(data.slice(0, 1));
        } else {
          console.error("Unexpected response structure:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching revenue data:", error);
      });
  });

  return (
    <div>
      <Space size={12} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Orders"}
            value={orders}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Inventory"}
            value={inventory}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(255,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Customer"}
            value={customer}
          />
          <DashboardCard
            icon={
              <DollarOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
          />
        </Space>
        <Space>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    </div>
  );
}

function DashboardCard({ icon, title, value }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((res) => {
        if (res && Array.isArray(res.carts)) {
          const allProducts = res.carts.flatMap((cart) => cart.products);
          setDataSource(allProducts.slice(0, 5)); // Take first 5 products
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
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: "total",
          },
          {
            title: "Total Discount",
            dataIndex: "discountedTotal",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue()
      .then((res) => {
        if (res && Array.isArray(res.carts)) {
          const labels = res.carts.map((cart) => `User-${cart.userId}`);
          const data = res.carts.map((cart) => cart.discountedTotal);

          const dataSource = {
            labels,
            datasets: [
              {
                label: "Revenue",
                data: data,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          };

          setRevenueData(dataSource);
        } else {
          console.error("Unexpected response structure:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching revenue data:", error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
