import React, {useState} from "react";
import {Button, Col, Input, message, Row, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import {registryApi} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";

const Registry : React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const getBase64 = (img: Blob | undefined, callback: (arg0: (string | ArrayBuffer | null)) => any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img as Blob);
  }

  const handleChange = (info: UploadChangeParam<UploadFile<API.FileObjectResponse>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const fileResponse : API.FileObjectResponse | undefined = info.file.response
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setLoading(false);
        setAvatar(fileResponse?.data?.id || "");
      });
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('只能上传小于2M的文件!');
    }
    return isJpgOrPng && isLt2M;
  }

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

  const uploadButton = (
    <div id={'div'}>
      {loading ? <LoadingOutlined id={'LoadingOutlined'} /> : <PlusOutlined id={'PlusOutlined'} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Row gutter={[16, 16]} style={{paddingTop: 36, overflow: "hidden"}}>
      <Col span={24}>
        <Row justify={"center"}>
          <Col>
            <Upload
              id={'upload'}
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/file/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Col>
        </Row>
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
