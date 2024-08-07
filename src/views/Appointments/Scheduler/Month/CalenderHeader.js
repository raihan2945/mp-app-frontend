import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const CalenderHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [calender, setCalender] = useState(
    searchParams.has("m") ? new Date(searchParams.get("m")) : new Date(),
  );

  const handleNextMonth = () => {
    var now = calender;
    let nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    setCalender(nextMonth);
    searchParams.set("m", dayjs(nextMonth).format("YYYY-MM-DD"));
    setSearchParams(searchParams);
  };

  const handlePrevMonth = () => {
    var now = calender;
    let prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    setCalender(new Date(prevMonth));
    searchParams.set("m", dayjs(prevMonth).format("YYYY-MM-DD"));
    setSearchParams(searchParams);
  };

  const handleTodayButton = () => {
    searchParams.delete("m");
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if(!searchParams.has('m')) {
      setCalender(new Date())
    }
  }, [searchParams])

  return (
    <>
      <div className="calender-header">
        <div className="left-content">
          <div className="icons">
            <button className="btn--icon" onClick={handlePrevMonth}>
              <FaChevronLeft />
            </button>
            <button className="btn--icon" onClick={handleNextMonth}>
              <FaChevronRight />
            </button>
          </div>

          {/* caleder month */}
          <div className="calender-header__month">
            <h2>{dayjs(searchParams.has("m") ? new Date(searchParams.get("m")) : new Date()).format("MMMM, YYYY")}</h2>
          </div>
        </div>

        <div className="right-content">
          {/* today button */}
          <Button onClick={handleTodayButton}>Today</Button>

          <Select
            style={{ width: "100px", fontSize: "14px" }}
            value={searchParams.has('v') ? searchParams.get("v") : 'm'}
            onChange={(value) => {
              searchParams.set("v", value);
              searchParams.delete('m')
              setSearchParams(searchParams);
            }}
            size="large"
            placeholder="View"
            suffixIcon={<FaChevronDown />}
          >
            <Select.Option value="m">Month</Select.Option>
            <Select.Option value="d">Day</Select.Option>
          </Select>
        </div>
      </div>
    </>
  );
};

export default CalenderHeader;
