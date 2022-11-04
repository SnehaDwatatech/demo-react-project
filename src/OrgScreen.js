import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { apiHandler } from "./utility/utility";

function OrgScreen() {
  const [modalShow, setModalShow] = useState(false);
  const [orgList, setOrgList] = useState([]);

  function MyVerticallyCenteredModal(props) {
    const onFormSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
      let OrgNameValue = formDataObj.name;
      var jsonData = {
        orgName: OrgNameValue,
      };
      let resopnse = apiHandler("/v1/org", "POST", jsonData);
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
            Add New Org
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <Form.Label>Enter Org Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your full name"
              />
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    let isMounted = true; //for use effect cleanup
    if (isMounted) {
      let data = apiHandler("/v1/org", "GET");
      data.then((data) => setOrgList(data.data));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Org
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Org Id</th>
            <th>Org Name</th>
          </tr>
        </thead>
        <tbody>
          {orgList.map((row) => {
            return (
              <tr>
                <td>{row.orgId}</td>
                <td>{row.orgName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default OrgScreen;
