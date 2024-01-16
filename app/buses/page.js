"use client"; // This is a client component 👈🏽
import Layout from "../../components/Layout";
import SearchMenu from "./searchMenu";
import Filters from "./filters";
import Cards from "./cards";
import { Row, Col } from "antd";
import { searchBus } from "../../actions/location";
import Param from "../../utils/checkQueryParam";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem("formData")))
    fetchAllBuses(JSON.parse(localStorage.getItem("formData")))
  }, []);
  const fetchAllBuses = async (data) => {
    const buss = await searchBus(data);
    setBuses(buss);
  };

  console.log('cx', buses)
  return (
    <Layout>
      <Param info={info}>
        <SearchMenu buses={buses} info={info} />
        <Row className="row-container">
          <Col span={6} className="main-filter">
            <Filters info={info} setBuses={setBuses} setLoading={setLoading} />
          </Col>
          <Col span={18}>
            {loading ? <Loading /> : <Cards buses={buses} />}
          </Col>
        </Row>
      </Param>
    </Layout>
  );
};

// Buses.getInitialProps = async () => {
//   const info = JSON.parse(localStorage.getItem("formData"))
//   console.log('info', info)
//   const resp = await searchBus(info);
//   return { resp, info };
// };

export default Buses;
