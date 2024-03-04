import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Space, Tag, Button, Modal } from "antd";
import SearchBar from "./SearchBar";
import { useGetAllContactsQuery } from "../../redux/features/contacts/contactsApi";
import { FaPrint } from "react-icons/fa6";

import "./Print.css";

import { useReactToPrint } from "react-to-print";

const ContactsView = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [isPrint, setPrint] = useState(null);
  const [contacts, setContacts] = useState([]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { data: getContacts, refetch } = useGetAllContactsQuery(searchItems);

  const totalPages = Math.ceil(Array.isArray(contacts) && contacts.length / 4);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Designation",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },

    {
      title: "Tag",
      key: "tag",
      dataIndex: "tag",
      //   render: (_, { tags }) => (
      //     <>
      //       {tags.map((tag) => {
      //         let color = tag.length > 5 ? "geekblue" : "green";
      //         if (tag === "loser") {
      //           color = "volcano";
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Divison",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Upazila",
      dataIndex: "upazila",
      key: "upazila",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Edit</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    setContacts(getContacts?.data);
  }, [getContacts]);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <SearchBar searchItems={searchItems} setSearchItems={setSearchItems} />
      <div style={{ textAlign: "end", marginTop: ".5rem" }}>
        <Button
          onClick={() => {
            setPrint(true);
            // handlePrint();
          }}
          type="primary"
          size="large"
        >
          <FaPrint size={18} />
          Print
        </Button>
      </div>
      <div style={{ marginTop: ".5rem" }}>
        <Table
          size="small"
          columns={columns}
          dataSource={contacts}
          scroll={true}
        />
      </div>

      <Modal
        open={isPrint}
        onCancel={() => {
          setPrint(false);
        }}
        footer={null}
        width={"auto"}
        centered
      >
        <div className="print-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <div key={index} className="print-page" ref={componentRef}>
              {contacts.slice(index * 4, (index + 1) * 4).map((user, i) => (
                <div  className="print-item" key={i}>
                  Name: {user?.name}, Age: {user?.age}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Button
          onClick={handlePrint}
          type="primary"
          size="large"
          style={{ marginTop: "1rem" }}
        >
          <FaPrint size={18} />
          Print
        </Button>
      </Modal>
    </div>
  );
};

export default ContactsView;
