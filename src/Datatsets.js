import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { apiHandler } from "./utility/utility";
import Select from "react-select";

function Datasets() {
  const [modalShow, setModalShow] = useState(false);
  const [dataSetsList, setDataSetsList] = useState([]);
  const [orgList, setOrgList] = useState([]);
  const [orgId, setOrgId] = useState([]);

  function MyVerticallyCenteredModal(props) {
    const onFormSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
      let dataSetValue = formDataObj.name;
      var jsonData = {
        orgId: orgId,
        datasetName: dataSetValue,
      };
      let resopnse = apiHandler("/v1/dataset", "POST", jsonData);
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
              <Form.Label>Dataset Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter name" />
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
      let org = apiHandler("/v1/org", "GET");
      org.then((data) => {
        let optionsArr = data.data.map((ele) => {
          return { value: ele.orgId, label: ele.orgName };
        });
        setOrgList(optionsArr);
      });

      let data = apiHandler("/v1/dataset/{orgId}", "GET");
      data.then((data) => setDataSetsList(data.data));
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const orgNameHandler = (e) => {
    setOrgId(e.orgId);
  };
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
            <th>Dataset Id</th>
            <th>Dataset Name</th>
          </tr>
        </thead>
        <tbody>
          {dataSetsList.map((row) => {
            return (
              <tr>
                <td>{row.datasetId}</td>
                <td>{row.datasetName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Data
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Datasets;
