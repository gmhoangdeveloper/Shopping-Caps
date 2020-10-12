import { Layout, Menu, Table } from "antd";
import React, { useState, useEffect } from "react";
import SiderLeft from "../../../components/Admin/SiderLeft";
import OrderDetailGetAll from "../../../actions/Admin/orderdetailAction"
import { useDispatch } from "react-redux";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
function OrderDetailAdmin(props) {
  const [state, setstate] = useState({ collapsed: false });
  // const { account, userordercart } = useSelector((state) => state.myaccount);
  const dispatch = useDispatch();
  const onCollapse = () => {
    setstate({ collapsed: !state.collapsed });
  };
useEffect(() => {
  
  dispatch(OrderDetailGetAll())
}, [])
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
          <SiderLeft></SiderLeft>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              orderdetail
            </div>
            {/* <Table columns={columns} dataSource={data} onChange={onChange} /> */}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default OrderDetailAdmin;
