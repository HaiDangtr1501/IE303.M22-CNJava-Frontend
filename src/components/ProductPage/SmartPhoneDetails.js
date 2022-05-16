import React from "react";
import { Table } from "react-bootstrap";

const LaptopDetails = ({ details }) => {
  return (
    <Table striped bordered>
      <tbody>
        <tr>
          <td>Cpu</td>
          <td>{details.cpu}</td>
        </tr>
        <tr>
          <td>Ram</td>
          <td>{details.ram}</td>
        </tr>
        <tr>
          <td>Ổ cứng</td>
          <td>{details.hardDrive}</td>
        </tr>
        <tr>
          <td>Màn hình</td>
          <td>{details.display}</td>
        </tr>
        <tr>
          <td>Kích thước</td>
          <td>{details.size}</td>
        </tr>
        <tr>
          <td>Hệ điều hành</td>
          <td>{details.operatingSystem}</td>
        </tr>
        <tr>
          <td>Thiết kế</td>
          <td>{details.design}</td>
        </tr>
        <tr>
          <td>Card đồ họa</td>
          <td>{details.graphicsCard}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default LaptopDetails;
