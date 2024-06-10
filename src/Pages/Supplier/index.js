import React, { useEffect, useState } from "react";
import {
  Avatar,
  Space,
  Table,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { EditFilled, DeleteFilled, UserAddOutlined } from "@ant-design/icons"; // Import simbol tambah
import { getCustomers } from "../../API";

function Supplier() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

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
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
    // Tambahkan logika untuk menghapus supplier
  };

  const handleSave = (values) => {
    console.log("Save:", values);
    // Tambahkan logika untuk menyimpan perubahan
    message.success("Supplier berhasil diperbarui");
    setIsModalVisible(false);
    setCurrentRecord(null);
    form.resetFields();
  };

  const handleAdd = () => {
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <div>
      <Space style={{ width: "100%" }} direction="vertical">
        <Typography.Title level={4}>Daftar Supplier</Typography.Title>
        <Button type="primary" icon={<UserAddOutlined />} onClick={handleAdd}>
          Tambah Supplier
        </Button>
        <Table
          columns={[
            {
              title: "Nama Supplier",
              dataIndex: "firstName",
            },
            {
              title: "Nomor Telepon",
              dataIndex: "phoneNumber",
              render: (_, record) => record.phoneNumber || "Tidak tersedia",
            },
            {
              title: "Alamat Supplier",
              dataIndex: "address",
              render: (_, record) => record.address || "Tidak tersedia",
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
          loading={loading}
        ></Table>
      </Space>
      <Modal
        title={currentRecord ? "Edit Supplier" : "Tambah Supplier"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="firstName"
            label="Nama Supplier"
            rules={[
              { required: true, message: "Mohon masukkan nama supplier" },
            ]}
          >
            <Input placeholder="Masukkan nama supplier" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Nomor Telepon"
            rules={[
              { required: true, message: "Mohon masukkan nomor telepon" },
            ]}
          >
            <Input placeholder="Masukkan nomor telepon" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Alamat Supplier"
            rules={[
              { required: true, message: "Mohon masukkan alamat supplier" },
            ]}
          >
            <Input placeholder="Masukkan alamat supplier" />
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
    </div>
  );
}

export default Supplier;
