import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Space,
  Typography,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

function AddProduct() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Received values from form: ", values);
    // Tambahkan logika untuk mengirim data ke server atau API
    message.success("Barang berhasil ditambahkan!");
    form.resetFields();
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div>
      <Typography.Title level={4}>Tambah Barang</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
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

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Tambah Barang
            </Button>
            <Button htmlType="button" danger onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddProduct;
