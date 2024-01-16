"use client"; // This is a client component 👈🏽
import { Card, Row, Col, Modal, Button } from "antd";
import { useRouter } from 'next/navigation'
import SeatDetails from "./seatDetails";
import { API_ROOT } from "../../utils/config";
import { enc, dec } from "../../utils/encdec";
import React, { useState } from "react";

const SingleCard = ({ bus }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userBooked, setUserBooked] = useState([])
  const Router = useRouter()
  const showModal = () => {
    setVisible(true)
    setLoading(true)
  };

  const handleUserBooked = (seat) => {
    encryptInfo(seat);
  }

  const handleOk = (info) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
      localStorage.setItem("info", JSON.stringify(info))
      Router.push("/details");
    }, 1000);
  };

  const encryptInfo = (seat) => {
    const { startLocation, endLocation, fare, journeyDate, travel = {}, slug } = bus;
    let start = startLocation.name;
    let end = endLocation.name;
    let travelName = travel.name;
    const info = { start, end, fare, journeyDate, travelName, seat, slug }

    const resp = enc(info);
    handleOk(resp)
  }

  const handleCancel = () => {
    setVisible(false)
  };

  const seatColorMeaning = () => {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'row-reverse' }}>
          <p>Available</p>
          <Button type="primary" style={{ margin: '0 1rem' }}></Button>
          <p>Booked</p>
          <Button style={{ backgroundColor: "rgb(67, 67, 67)", margin: '0 1rem' }}></Button>
          <p>Sold</p>
          <Button type="danger" style={{ margin: '0 1rem' }}></Button>
        </div>
      </>
    )
  }

  const seatModal = () => (
    <Modal
      title="Seat Details"
      visible={visible}
      onCancel={() => handleCancel()}
      footer={[
        () => seatColorMeaning()
      ]}
      width={1000}
    >
      <SeatDetails
        sold={bus.soldSeat}
        setSold={() => { }}
        booked={bus.bookedSeat}
        setBooked={() => { }}
        slug={"ss"}
        handleUserBooked={(seat) => handleUserBooked(seat)}
        numberOfSeats={bus.numberOfSeats}
      />
    </Modal>
  );


  return (
    <>
      <Card
        className="single-card"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => showModal()}
      >
        <Row>
          <Col span={3}>
            <img
              src={`${API_ROOT}/uploads/${bus.image}`}
              alt="suspense"
              className="bus-thumbnail"
            />
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <p>{bus.travel ? bus.travel.name : null}</p>
          </Col>
          <Col span={4}>
            <p>{bus.type}</p>
          </Col>
          <Col span={4}>
            <strong>
              <p>{bus.departure_time}</p>
            </strong>
          </Col>
          <Col span={4}>
            <p>{bus.seatsAvailable} seats</p>
          </Col>
          <Col span={4}>
            <p>Rs {`${bus.fare}`}</p>
          </Col>
        </Row>
      </Card>
      {visible && seatModal()}
    </>
  );
}


export default SingleCard;
