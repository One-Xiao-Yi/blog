import React, {useState} from "react";
import {Button, Col, Input, message, Row} from "antd";
import {registryApi} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";
import ImageUpload from "@/pages/upload/image/ImageUpload";

const Registry : React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleChange = (fileId: string) => {
    setAvatar(fileId);
  };

  const registry = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await registryApi({
        account: account,
        avatar: avatar,
        inviteCode: inviteCode,
        name: name,
        password: password,
        retryPassword: retryPassword,
      });
      if(response.success) {
        message.success("注册成功");
        history.push('/user/registry');
        return;
      } else {
        message.error("注册失败" + response?.msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Row gutter={[16, 16]} style={{paddingTop: 36, overflow: "hidden"}}>
      <Col span={24}>
        <ImageUpload handChange={handleChange} uploadText={"上传头像"}/>
      </Col>
      <Col span={24}>
        <Row justify={"center"}>
          <Col span={4}>
            <Input size={"large"} onInput={(e) => {
              setName(e.currentTarget.value);
            }}  placeholder={"昵称"} required/>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"center"}>
          <Col span={4}>
            <Input size={"large"} onInput={(e) => {
              setAccount(e.currentTarget.value);
            }} placeholder={"账号"} required/>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"center"}>
          <Col span={4}>
            <Input.Password onInput={(e) => {
              setPassword(e.currentTarget.value);
            }} size={"large"} placeholder={"密码"} required/>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"center"}>
          <Col span={4}>
            <Input.Password onInput={(e) => {
              setRetryPassword(e.currentTarget.value);
            }} size={"large"} placeholder={"确认密码"} required/>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"center"}>
          <Col span={4}>
            <Input onInput={(e) => {
              setInviteCode(e.currentTarget.value);
            }} size={"large"} placeholder={"邀请码"} required/>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"center"}>
          <Col>
            <Row justify={"center"} gutter={64}>
              <Col>
                <Button type={"primary"} loading={loading} size={"large"} onClick={registry}>注册</Button>
              </Col>
              <Col>
                <Button size={"large"} loading={loading} onClick={() => {
                  history.goBack();
                }} >返回</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Registry;
