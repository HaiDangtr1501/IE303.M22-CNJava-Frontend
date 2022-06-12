import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import ProductList from "../Product-List";
import ProductApi from "../../api/product";
import "./categoryPageStyle.css"

const CategoryPage = ({ size, isAuth, type, isAdmin}) => {
  const [listBrand, setListBrand] = useState([]);
  const [brand, setBrand] = useState(null);
  const [price, setPrice] = useState({ min: 0, max: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSorBy] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const loadBrandOptions = async () => {
      const response = await ProductApi.getBrand();
      const optionsBrandCustom = response.data.map((item) => ({
        label: item,
        value: item,
      }));
      optionsBrandCustom.unshift({ label: "Tất cả", value: "" });
      setListBrand(optionsBrandCustom);
    };

    loadBrandOptions();
  }, []);

  const onChangePrice = (e) => {
    if (e.target.value === "all") {
      setPrice({ min: null, max: null });
      return;
    }
    const { min, max } = JSON.parse(e.target.value);
    setPrice({ min: min, max: max });
    setPage(0);
  };

  const onChangeSorted = (e) => {
    switch (e.target.value) {
      case "latest":
        setSorBy("createdDate");
        setSortDirection("desc");
        break;
      case "priceAsc":
        setSorBy("price");
        setSortDirection("asc");
        break;
      case "priceDesc":
        setSorBy("price");
        setSortDirection("desc");
        break;
      default:
        break;
    }
    setPage(0);
  };

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const onChangeBrand = (e) => {
    setBrand(e.value);
    setPage(0);
  };

  return (
    <div className="CategoryPage-container">
      <div className={(type==="Laptop") ? "slider-container_laptop" : "slider-container_smartphone"}>
      </div>
      <div className="container mt-3">
        <div className="product-search_form">
            <Form.Row className="justify-content-between">
              <Form.Group as={Col} md="6" controlId="formSearch">
                <Form.Label>
                  <strong style={{ marginLeft:"10px"}}>TÌM KIẾM</strong>
                </Form.Label>
                <Form.Control type="text" onChange={onChangeSearchTerm} />
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label><b>Thương hiệu</b></Form.Label>
                <Select
                  onChange={onChangeBrand}
                  placeholder="Tất cả"
                  options={listBrand}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="formPrice">
                <Form.Label><b>Giá sản phẩm</b></Form.Label>
                <Form.Control as="select" onChange={onChangePrice}>
                  <option value="all">Tất cả</option>
                  <option value={JSON.stringify({ max: 5000000 })}>
                    Dưới 5 Triệu
                  </option>
                  <option value={JSON.stringify({ min: 5000000, max: 10000000 })}>
                    5 - 10 Triệu
                  </option>
                  <option value={JSON.stringify({ min: 10000000, max: 20000000 })}>
                    10 - 20 Triệu
                  </option>
                  <option value={JSON.stringify({ min: 20000000 })}>
                    Hơn 20 Triệu
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="formSortBy">
                <Form.Label><b>Sắp xếp theo</b></Form.Label>
                <Form.Control as="select" onChange={onChangeSorted}>
                  <option value="latest">Mới nhất</option>
                  <option value="priceAsc">Giá thấp đến cao</option>
                  <option value="priceDesc">Giá cao đến thấp</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
        </div>

        <div className="product-show">
        <ProductList
          page={page}
          size={8}
          sortBy={sortBy}
          brand={brand}
          minPrice={price.min}
          maxPrice={price.max}
          sortDirection={sortDirection}
          name={searchTerm}
          category={type}
          isAdmin={isAdmin}
          isAuth={isAuth}
          enableBtnAddToCard={true}
          enablePagination={true}
          handleWithTotalPage={(totalPage) => setTotalPage(totalPage)}
        />
        </div>
        
        <Row className="justify-content-center mt-2 product-list-pagination">
          <Col md="5">
            <ReactPaginate
              pageCount={totalPage}
              forcePage={page}
              pageRangeDisplayed={size}
              marginPagesDisplayed={5}
              nextLabel={<FaAngleRight />}
              previousLabel={<FaAngleLeft />}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
              disabledClassName={"disabled"}
              onPageChange={({ selected }) => setPage(selected)}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CategoryPage;
