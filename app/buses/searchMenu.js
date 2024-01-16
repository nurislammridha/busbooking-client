import { Select, Button, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getAllLocations } from "../../actions/location";
import { useRouter } from "next/navigation";

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

const SearchMenu = ({ buses, info = {} }) => {
  const Router = useRouter()
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    startLocation: info.startLocation,
    endLocation: info.endLocation,
    journeyDate: info.journeyDate
  });

  const onChangeFrom = val => {
    setFormData({ ...formData, ...{ startLocation: val } });
  };

  const onChangeTo = val => {
    setFormData({ ...formData, ...{ endLocation: val } });
  };

  const onChangeDate = val => {
    const journeyDate = val && moment(val._d).format("YYYY-MM-DD");
    setFormData({ ...formData, ...{ journeyDate } });
  };

  const routeTransition = () => {
    typeof window !== 'undefined' && localStorage.setItem("formData", JSON.stringify(formData))
    Router.push("/buses");
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchAllLocations = async () => {
    const locations = await getAllLocations();
    setLocations(locations);
  };

  return (
    <div className="route-form bus-search-menu m-1">
      <label htmlFor="">
        <h4 className="color-white">From: </h4>
      </label>
      <Select
        showSearch
        defaultValue={info.startLocation}
        style={{ width: 200, marginRight: "1rem" }}
        placeholder="eg- Dhangadhi"
        optionFilterProp="children"
        onChange={onChangeFrom}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        defaultValue={info.endLocation}
        style={{ width: 200, marginRight: "1rem" }}
        placeholder="eg- Kathmandu"
        optionFilterProp="children"
        onChange={onChangeTo}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        disabledDate={disabledDate}
        defaultValue={moment(info.journeyDate, "YYYY-MM-DD")}
        onChange={onChangeDate}
      />
      <Button
        type="primary"
        icon="search"
        style={{ marginLeft: "1rem" }}
        onClick={routeTransition}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchMenu;
