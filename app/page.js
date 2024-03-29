"use client"; // This is a client component 👈🏽
import { Button, DatePicker, Select } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { getAllLocations } from "../actions/location";
import { useRouter } from 'next/navigation'
import moment from "moment";

const { Option } = Select;

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const threeLengthArray = [];

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({});
  const [disButton, setDisButton] = useState(true);
  const Router = useRouter()
  const checkButtonDisabled = val => {
    threeLengthArray.push(val);
    if (threeLengthArray.length >= 3) {
      setDisButton(false)
    }
  };
  console.log('formData', formData)
  const onChangeFrom = val => {
    setFormData({ ...formData, ...{ startLocation: val } });
    checkButtonDisabled(val);
  };

  const onChangeTo = val => {
    setFormData({ ...formData, ...{ endLocation: val } });
    checkButtonDisabled(val);
  };

  const onChangeDate = (val) => {
    const journeyDate = val && moment(val._d).format("YYYY-MM-DD");
    setFormData({ ...formData, ...{ journeyDate } });
    checkButtonDisabled(val);
  };

  const dummytransition = () => {
    // Router.push({
    //   pathname: "/buses",
    //   query: formData
    // });
    typeof window !== 'undefined' && localStorage.setItem("formData", JSON.stringify(formData))
    Router.push("/buses")
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchAllLocations = async () => {
    const locations = await getAllLocations();
    setLocations(locations);
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="./favicon.ico" importance="low" />
      </Head>
      <Layout>
        <div className="hero">
          <Hero />

          <div className="row">
            <div className="input-background">
              <h1 className="tag-line">Book Your Seat And Go</h1>
              <div className="route-form">
                <label htmlFor="">
                  <h4 className="color-white">From: </h4>
                </label>
                <Select
                  showSearch
                  placeholder="eg- Bagerhat"
                  style={{ width: 200, marginRight: "1rem" }}
                  optionFilterProp="children"
                  onChange={onChangeFrom}
                  onFocus={onFocus}
                  name="startLocation"
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {locations.map(location => (
                    <Option value={location._id} key={location._id}>
                      {location.name}
                    </Option>
                  ))}
                </Select>
                <label htmlFor="">
                  <h4 className="color-white">To: </h4>
                </label>
                <Select
                  showSearch
                  style={{ width: 200, marginRight: "1rem" }}
                  placeholder="eg- Dhaka"
                  optionFilterProp="children"
                  onChange={onChangeTo}
                  name="endLocation"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {locations.map(location => (
                    <Option value={location._id} key={location._id}>
                      {location.name}
                    </Option>
                  ))}
                </Select>
                <label htmlFor="">
                  <h4 className="color-white">Date: </h4>
                </label>
                <DatePicker
                  style={{ width: "20%" }}
                  format="YYYY-MM-DD"
                  disabledDate={() => disabledDate()}
                  onChange={(e) => onChangeDate(e)}
                />
                <Button
                  type="primary"
                  icon="search"
                  style={{ marginLeft: "1rem" }}
                  onClick={() => dummytransition()}
                  disabled={disButton}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
