import {
  Space,
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

import { EditFilled, DeleteFilled, FileAddFilled } from "@ant-design/icons";

const { Option } = Select;

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [addForm] = Form.useForm();

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
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
    // Tambahkan logika untuk menghapus barang
  };

  const handleSave = (values) => {
    console.log("Save:", values);
    // Tambahkan logika untuk menyimpan perubahan
    message.success("Barang berhasil diperbarui");
    setIsModalVisible(false);
    setCurrentRecord(null);
    form.resetFields();
  };

  const handleAddProduct = (values) => {
    console.log("Add Product:", values);
    // Tambahkan logika untuk menambahkan produk baru
    message.success("Produk berhasil ditambahkan");
    setIsAddModalVisible(false);
    addForm.resetFields();
  };

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Daftar Barang</Typography.Title>
        <Button
          type="primary"
          icon={<FileAddFilled />}
          onClick={() => setIsAddModalVisible(true)}
        >
          Tambah Produk
        </Button>
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
                  <Button
                    type="primary"
                    icon={<EditFilled />}
                    onClick={() => handleEdit(record)}
                  ></Button>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteFilled />}
                    onClick={() => handleDelete(record)}
                  ></Button>
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
      <Modal
        title="Edit Barang"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="title"
            label="Nama Barang"
            rules={[{ required: true, message: "Mohon masukkan nama barang" }]}
          >
            <Input placeholder="Masukkan nama barang" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Harga"
            rules={[{ required: true, message: "Mohon masukkan harga barang" }]}
          >
            <Input placeholder="Masukkan harga barang" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Nama Supplier"
            rules={[
              { required: true, message: "Mohon masukkan nama supplier" },
            ]}
          >
            <Input placeholder="Masukkan nama supplier" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                }}
              >
                Batal
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Tambah Produk"
        visible={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          addForm.resetFields();
        }}
        footer={null}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            name="title"
            label="Nama Barang"
            rules={[{ required: true, message: "Mohon masukkan nama barang" }]}
          >
            <Input placeholder="Masukkan nama barang" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Harga"
            rules={[{ required: true, message: "Mohon masukkan harga barang" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
              placeholder="Masukkan harga barang"
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stok"
            rules={[
              { required: true, message: "Mohon masukkan jumlah stok barang" },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Masukkan jumlah stok barang"
            />
          </Form.Item>
          <Form.Item
            name="supplier"
            label="Supplier"
            rules={[{ required: true, message: "Mohon pilih supplier" }]}
          >
            <Select placeholder="Pilih supplier">
              <Option key="1" value="1">
                Supplier A
              </Option>
              <Option key="2" value="2">
                Supplier B
              </Option>
              <Option key="3" value="3">
                Supplier C
              </Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Tambahkan
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  setIsAddModalVisible(false);
                  addForm.resetFields();
                }}
              >
                Batal
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Inventory;
