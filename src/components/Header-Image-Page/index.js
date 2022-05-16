import React, { useState, useEffect } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import SAlert from "react-s-alert";
import EditHeaderImage from "../Edit-HeaderImage";
import HeaderImageList from "../HeaderImageList";
import HeaderImageApi from "../../api/header-image";

const HeaderImagePage = () => {
  const [sliderList, setSliderList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHeaderImageList = async () => {
      setLoading(true);
      try {
        const response = await HeaderImageApi.getAll();
        if (response.status === 200) {
          const sliders = response.data.filter((i) => i.type === "Slider");
          const banners = response.data.filter((i) => i.type === "Banner");
          setSliderList(sliders);
          setBannerList(banners);
          setLoading(false);
        }
      } catch (err) {
        const errMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        SAlert.error(errMessage);
        setLoading(false);
      }
    };
    getHeaderImageList();
    setHasUpdate(false);
  }, [hasUpdate]);

  if (loading) {
    return <Spinner animation="border" variant="light" size="sm" />;
  }

  return (
    <Row className="mb-4">
      <Col lg="4">
        <EditHeaderImage editMode={false} onSubmit={() => setHasUpdate(true)} />;
      </Col>
      <Col lg="5">
        <Alert variant="info">Danh sách Slider</Alert>
        <HeaderImageList
          headerImageList={sliderList}
          handleOnUpdate={() => setHasUpdate(true)}
        />
      </Col>
      <Col lg="3">
        <Alert variant="info">Danh sách Banner</Alert>
        <HeaderImageList
          headerImageList={bannerList}
          handleOnUpdate={() => setHasUpdate(true)}
        />
      </Col>
    </Row>
  );
};

export default HeaderImagePage;
