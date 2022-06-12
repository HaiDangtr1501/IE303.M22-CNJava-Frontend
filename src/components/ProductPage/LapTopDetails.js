import React from "react";
import { Table } from "react-bootstrap";
import "./style.css"

const SmartPhoneDetails = ({ details }) => {
  return (
    <Table striped bordered className="table-custom">
      <tbody>
        <tr>
          <td>Màn Hình</td>
          <td>{details.display}</td>
        </tr>
        <tr>
          <td>Hệ điều hành</td>
          <td>{details.operatingSystem}</td>
        </tr>
        <tr>
          <td>Camera trước</td>
          <td>{details.fontCamera}</td>
        </tr>
        <tr>
          <td>Camera sau</td>
          <td>{details.rearCamera}</td>
        </tr>
        <tr>
          <td>Chip</td>
          <td>{details.chipName}</td>
        </tr>
        <tr>
          <td>Ram</td>
          <td>{details.ram}</td>
        </tr>
        <tr>
          <td>Bộ nhớ trong</td>
          <td>{details.internalMemory}</td>
        </tr>
        {/* <tr>
          <td>Sim</td>
          <td>{details.sim}</td>
        </tr> */}
        <tr>
          <td>Pin, Sạc</td>
          <td>{details.batteryCapacity}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SmartPhoneDetails;
