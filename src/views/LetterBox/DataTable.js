import React, { useEffect, useState } from "react";
import {Button, DatePicker, Input, Modal, Pagination, Popconfirm, Select, Table} from 'antd';
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { dateFormatter } from "../../utils/format";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetAllLetterQuery } from "../../redux/features/letterBox/letterBoxApi";


const {RangePicker} = DatePicker

const DataTable = () => {

    const [search, setSearch] = useState('')
    const debounceValue = useDebounce(search);
    const [searchParams, setSearchParams] = useSearchParams()

    const {data, isLoading} = useGetAllLetterQuery({
      page: searchParams.get("p") || 1,
      limit: searchParams.get("size") || 10,
      search: searchParams.get("q") || "",
      start: searchParams.get("start") || "",
      end: searchParams.get("end") || "",
    })


    useEffect(() => {
        if (debounceValue.length != 0) {
          searchParams.set("p", 1);
          searchParams.set("q", debounceValue);
        } else {
          searchParams.delete("q");
        }
        setSearchParams(searchParams);
      }, [debounceValue]);



    const columns = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Full Name",
          dataIndex: "full_name",
          key: "full_name",
        },
        {
          title: "Mobile",
          dataIndex: "mobile",
          key: "mobile",
        },
        {
          title: "Company Name",
          dataIndex: "company_name",
          key: "company_name",
        },
        {
          title: "Designation",
          dataIndex: "designation",
          key: "designation",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
        {
          title: "Date",
          dataIndex: "created_at",
          key: "created_at",
          render: (_, { created_at }) => `${dateFormatter(created_at)}`,
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button onClick={() => {}} size="small">
                View
              </Button>
              <Button
                // onClick={() => setEditAppointment(record)}
                type="primary"
                size="small"
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                // onConfirm={() => deleteAppointment(record?.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          ),
        },
      ];


  return (
    <>
      {/* data table filters and sorting */}
      <div className="appointment__table-filter">
        <RangePicker
          onCalendarChange={(value) => {
            if (value != null && value[0] != null && value[1] != null) {
              searchParams.set("p", 1);
              searchParams.delete("q");
              searchParams.set("start", dateFormatter(value[0].$d));
              searchParams.set("end", dateFormatter(value[1].$d));
            } else {
              searchParams.delete("start");
              searchParams.delete("end");
            }

            setSearchParams(searchParams);
          }}
        />

        <div className="data-table-inputs">
          {/* page size */}
          <Select
            style={{ width: "150px" }}
            value={searchParams.get("size")}
            onChange={(value) => {
              searchParams.set("p", 1);
              searchParams.set("size", value);
              setSearchParams(searchParams);
            }}
            size="large"
            placeholder="Page Size"
            suffixIcon={<FaChevronDown />}
          >
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="20">20</Select.Option>
            <Select.Option value="50">50</Select.Option>
          </Select>

          {/* search entities */}
          <Input
            placeholder="Search by name"
            style={{ width: "200px", padding: "0 1rem" }}
            prefix={<FiSearch />}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* data table */}
      <div className="appointment__table">
        <Table
          loading={isLoading}
          scroll={{ x: true }}
          rowKey={"id"}
          columns={columns}
          dataSource={data?.data || []}
          pagination={false}
        />

        <div className="pagination__container">
          <Pagination
            defaultCurrent={searchParams.get("p") || 1}
            current={Number(searchParams.get("p") || 1)}
            onChange={(value) => {
              searchParams.set("p", value);
              setSearchParams(searchParams);
            }}
            total={data?.count}
            pageSize={searchParams.get("size") || 10}
          />
        </div>

        {/* update appointment modal */}
        {/* <Modal
          centered
          open={editAppointment}
          onCancel={() => setEditAppointment("")}
          footer={false}
          width={"70%"}
          title="Update Appointment"
        >
          <AppointmentForm
            appointment={editAppointment}
            closeModal={() => setEditAppointment("")}
          />
        </Modal> */}

        {/* View appointment modal */}
        {/* <Modal
          centered
          open={viewAppointment}
          onCancel={() => setViewAppointment("")}
          footer={false}
          width={"70%"}
        >
          {viewAppointment ? (
            <AppointmentDetails data={viewAppointment} />
          ) : (
            <p>loading...</p>
          )}
        </Modal>  */}
      </div>
    </>
  );
};

export default DataTable;
