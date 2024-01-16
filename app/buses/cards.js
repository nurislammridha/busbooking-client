import SingleCard from "./singleCard";
import { Row, Col } from "antd";
import { useCallback } from "react";

const Cards = ({ buses = [] }) => {
  const calculateEmptySeats = useCallback(() => {
    if (!buses.length) return 0;

    let totalAvailable = 0;

    buses.forEach((bus) => {
      totalAvailable += bus.seatsAvailable;
    });

    return totalAvailable;
  }, [buses])



  const markup =
    buses.length <= 0 ? (
      <h2>No bus found</h2>
    ) : (
      <div className="cards">
        <div className="card-header">
          <h2>
            <b>{calculateEmptySeats()}</b> seats available in{" "}
            <strong>{buses.length}</strong> buses
          </h2>
        </div>

        <div>
          <hr />
          <Row className="buses-header">
            <Col span={4}></Col>
            <Col span={4}>
              <h3>Travels</h3>
            </Col>
            <Col span={4}>
              <h3>Bus Type</h3>
            </Col>
            <Col span={4}>
              <h3>Departure</h3>
            </Col>
            <Col span={4}>
              <h3>Available</h3>
            </Col>
            <Col span={4}>
              <h3>Fare</h3>
            </Col>
          </Row>
          {buses.length > 0 &&
            buses.map((bus) => <SingleCard key={bus._id} bus={bus} />)}
        </div>
      </div>
    );

  return markup;
};

export default Cards;
