"use client"; // This is a client component 👈🏽
import Layout from "../../components/Layout";
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  AutoComplete,
  InputNumber,
  Button
} from "antd";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
import { dec } from "../../utils/encdec";
import { postBookSeat } from "../../actions/book";
import { useState } from "react";
// const { Option } = Select;

const Details = (props) => {
  const [dataSource, setDataSource] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const Router = useRouter()
  const infoDetails = dec(JSON.parse(localStorage.getItem('info')));
  // console.log('infossss', info)
  const handleAutoComplete = (value) => {
    setDataSource({
      dataSource:
        !value || value.indexOf("@") >= 0
          ? []
          : [
            `${value}@gmail.com`,
            `${value}@hotmail.com`,
            `${value}@yahoo.com`
          ],
      email: value
    });
  };
  const handleSubmit = async () => {
    const seatNumber = infoDetails.seat;
    const info = { name, phone: parseInt(phone) || 7234567765, address, email, seatNumber };
    console.log('infoprops', props.info)
    const resp = await postBookSeat(infoDetails.slug, info);
    if (!resp.error) {
      sweetAlert("success");
    } else {
      sweetAlert("error");
    }
  };

  const sweetAlert = status => {
    setTimeout(() => {
      if (status !== "error") {
        Router.push("/");
      }
    }, 1000);

    if (status === "error") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    } else {
      Swal.fire("Congrats!", "Your seat is booked", "success");
    }
  };

  return (
    <Layout>
      <Row className="row-container">

        <Col span={4}></Col>
        <Col span={8}>
          <Card title="Passengers Details" style={{ width: "100%" }}>
            <Input.Group>
              <h4>Passenger Name:</h4>
              <Input onChange={(e) => setName(e.target.value)} name="name" />
            </Input.Group>
            <br />
            <Input.Group>
              <h4>Email:</h4>
              <Input onChange={(e) => setEmail(e.target.value)} name="name" />
            </Input.Group>
            <Input.Group>
              <h4>Current Address:</h4>
              <Input onChange={(e) => setAddress(e.target.value)} name="address" />
            </Input.Group>
            <br />
            <Row>
              <Col span={11}>
                <Input.Group>
                  <h4>Mobile: </h4>
                  <Input onChange={(e) => setPhone(e.target.value)} name="name" />
                </Input.Group>
              </Col>
              <Col span={2}></Col>

            </Row>
            <br />
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => handleSubmit()}
            >
              Proceed to Confirmation
            </Button>
          </Card>
        </Col>
        <Col span={2}></Col>
        <Col span={6}>
          <Card title="Travel Details" style={{ width: "100%" }}>
            <p>
              <b>Route: </b>
              {infoDetails.start} - {infoDetails.end}
            </p>
            <p>
              <b>Date: </b>
              {infoDetails.journeyDate}
            </p>
            <p>
              <b>Seat: </b>
              {infoDetails.seat}
            </p>
            <p>
              <b>Travel: </b>
              {infoDetails.travelName}
            </p>
          </Card>

          <br />
          <Card title="Payment Details" style={{ width: "100%" }}>
            <p>
              <b>Per Ticket Cost: </b>Rs. {infoDetails.fare}
            </p>
            <p>
              <b>Total Cost: </b>Rs. {infoDetails.fare}
            </p>
          </Card>
        </Col>
        <Col span={4}></Col>
      </Row>
    </Layout>
  );
}


export default Details;
