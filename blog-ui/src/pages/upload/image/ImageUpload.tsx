import React, {useState} from "react";
import {Col, message, Row, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {UploadChangeParam, UploadFile} from "antd/lib/upload/interface";

export interface ImageUploadProperty {
  handChange?: (fileId: string) => void;
  uploadText?: string;
  cover?: string;
}

const ImageUpload : React.FC<ImageUploadProperty> = (props) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
  const [hasChange, setHasChange] = useState(false);

  const uploadButton = (
    <div id={'div'}>
      {loading ? <LoadingOutlined id={'LoadingOutlined'} /> : <PlusOutlined id={'PlusOutlined'} />}
      <div style={{ marginTop: 8 }}>{props.uploadText?props.uploadText:'Upload'}</div>
    </div>
  );

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
        setHasChange(true);
        setImageUrl(imageUrl);
        setLoading(false);
        if (props.handChange) {
          props.handChange(fileResponse?.data?.id || "");
        }
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

  return (
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
          {props.cover || imageUrl ? <img src={!hasChange && props.cover ? '/api/file/download/' + props.cover : imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Col>
    </Row>
  )
}

export default ImageUpload;
