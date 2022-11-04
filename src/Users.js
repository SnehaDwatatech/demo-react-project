import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { apiHandler } from "./utility/utility";
import Select from "react-select";

function Users() {
  const [modalShow, setModalShow] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [rolesList, setRolesList] = useState([]);

  useEffect(() => {
    let isMounted = true; //for use effect cleanup

    if (isMounted) {
      const org = apiHandler("/v1/org", "GET");
      org.then((data) => {
        const optionsArr = data.data.map((ele) => {
          return { value: ele.orgId, label: ele.orgName };
        });
        setOrgList(optionsArr);

        let usersdata = apiHandler(`/v1/users/{orgId}`, "GET");
        usersdata.then((data) => setUsersList(data.data));

        let rolesdata = apiHandler("/v1/roles/{orgId}", "GET");
        rolesdata.then((data) => {
          const optionsArr2 = data.data.map((ele) => {
            return { value: ele.roleId, label: ele.roleName };
          });
          setRolesList(optionsArr2);
        });
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const orgNameHandler = async (e) => {
    setOrgId(e.value);
  };

  function MyVerticallyCenteredModal(props) {
    let orgData = "";
    let roleData = "";

    const orgNameHandler2 = async (e) => {
      orgData = e.value;
    };

    const rolesListHandler = async (e) => {
      roleData = e.value;
    };

    const onUserFormSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());

      let usersFormData = {
        userName: formDataObj.name,
        uesrEmail: formDataObj.email,
        userPhone: formDataObj.phoneNumber,
        roleId: roleData,
        orgId: orgData,
      };

      const resopnse = await apiHandler("/v1/user", "POST", usersFormData);
      setModalShow(false);
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Users
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onUserFormSubmit}>
            <Form.Group>
              <Form.Label>Enter User Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter user Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter PhoneNumber</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phoneNumber"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Org Name</Form.Label>
              <Select options={orgList} onChange={orgNameHandler2} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Roles</Form.Label>
              <Select options={rolesList} onChange={rolesListHandler} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add form
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <form>
        <Form.Group col-md-6>
          <Form.Label>Select Org Name</Form.Label>
          <Select options={orgList} onChange={orgNameHandler} />
        </Form.Group>
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((row) => {
            return (
              <tr>
                <td>{row.userId}</td>
                <td>{row.userName}</td>
                <td>{row.userPhoneNumber}</td>
                <td>{row.userEmail}</td>
                <td>{row.userRole}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add users
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Users;
