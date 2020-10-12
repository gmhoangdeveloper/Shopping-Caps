import { Button, Col, Form, Input, Modal, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
function ModalProduct({ itemProduct }) {
  const [OpenandCloseModal, setOpenandCloseModal] = useState(false);
  const [form] = Form.useForm();
  console.log(form);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const layout = {
    layout: "vertical",
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const showModal = () => {
    setOpenandCloseModal(true);
  };

  const handleCancel = (e) => {
    setOpenandCloseModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title={itemProduct.title}
        visible={OpenandCloseModal}
        onCancel={handleCancel}
        width="920px"
        footer={false}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input value={itemProduct.title} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ModalProduct;
