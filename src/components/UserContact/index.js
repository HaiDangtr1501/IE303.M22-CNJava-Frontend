import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import UserApi from "../../api/user";
import SAlert from "react-s-alert";

const UserContact = ({ country, province, district, detail, phone, onUpdated }) => {
  const initUserInfo = {
    phone: phone,
    country: country,
    province: province,
    district: district,
    detail: detail,
  };
  const [updatedInfo, setUpdateInfo] = useState(false);
  const [userContactInfo, setUserContactInfo] = useState(initUserInfo);

  const updateInfo = async () => {
    if (updatedInfo) {
      try {
        const response = await UserApi.updateInfo(userContactInfo);
        if (response.status === 200) {
          onUpdated();
          SAlert.success(response.data.message);
        }
      } catch (error) {
        const message =
          error.response || error.response.data || error.response.data.message;
        SAlert.error(message);
      }
    }
    setUpdateInfo(!updatedInfo);
  };

  const cancelUpdate = () => {
    setUserContactInfo(initUserInfo);
    setUpdateInfo(false);
  };

  return (
    <>
      <Form>
        <Form.Group controlId="country">
          <Form.Label>Quốc Gia</Form.Label>
          <Form.Control
            type="text"
            readOnly={!updatedInfo}
            value={userContactInfo.country}
            onChange={(e) =>
              setUserContactInfo({ ...userContactInfo, country: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="province">
          <Form.Label>Tỉnh, Thành phố</Form.Label>
          <Form.Control
            type="text"
            readOnly={!updatedInfo}
            value={userContactInfo.province}
            onChange={(e) =>
              setUserContactInfo({ ...userContactInfo, province: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="district">
          <Form.Label>Quận, Huyện</Form.Label>
          <Form.Control
            type="text"
            readOnly={!updatedInfo}
            value={userContactInfo.district}
            onChange={(e) =>
              setUserContactInfo({ ...userContactInfo, district: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="addressDetail">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            readOnly={!updatedInfo}
            value={userContactInfo.detail}
            onChange={(e) =>
              setUserContactInfo({ ...userContactInfo, detail: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            readOnly={!updatedInfo}
            value={userContactInfo.phone}
            onChange={(e) =>
              setUserContactInfo({ ...userContactInfo, phone: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Button onClick={updateInfo}>{updatedInfo ? "Hoàn tất" : "Sửa đổi"}</Button>{" "}
        {updatedInfo && (
          <Button onClick={cancelUpdate} variant="danger">
            Hủy
          </Button>
        )}
      </Form>
    </>
  );
};

export default UserContact;
