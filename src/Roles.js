import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import { apiHandler } from "./utility/utility";

function Roles() {
  const [modalShow, setModalShow] = useState(false);
  const [rolesList, setRolesList] = useState([]);

  const [orgList, setOrgList] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [datasets, setDataSets] = useState([]);

  useEffect(() => {
    let isMounted = true; //for use effect cleanup

    if (isMounted) {
      const org = apiHandler("/v1/org", "GET");

      org.then((data) => {
        const optionsArr = data.data.map((ele) => {
          return { value: ele.orgId, label: ele.orgName };
        });
        setOrgList(optionsArr);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const orgNameHandler = async (e) => {
    setOrgId(e.value);

    try {
      const { data } = await apiHandler(`/v1/roles/${orgId}`, "GET");
      setRolesList(data);

      let optionsArr2 = data.map((ele) => {
        return ele.datasets.map((ele) => {
          return {
            value: ele.datasetId,
            label: ele.datasetName,
          };
        });
      });

      optionsArr2 = optionsArr2.flat();

      setDataSets(optionsArr2);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form>
        <Form.Group>
          <Form.Label>Select Org Name</Form.Label>
          <Select options={orgList} onChange={orgNameHandler} />
        </Form.Group>
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Role Id</th>
            <th>Role Name</th>
          </tr>
        </thead>
        <tbody>
          {rolesList.map((row) => {
            return (
              <tr>
                <td>{row.roleId}</td>
                <td>{row.roleName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Role
      </Button>

      <MyVerticallyCenteredModal
        datasets={datasets}
        setModalShow={setModalShow}
        orgList={orgList}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

function MyVerticallyCenteredModal({
  datasets,
  setModalShow,
  orgList,
  ...rest
}) {
  const [datasetsIds, setDataSetsIds] = useState([]);
  const [orgId, setOrgId] = useState([]);
  let orgValue = "";

  const orgNameHandler2 = (e) => {
    setOrgId(e.value);
  };

  const onAddRoleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const addRoleValue = formDataObj.name;

    const jsonData = {
      orgId,
      roleName: addRoleValue,
      datasetIds: datasetsIds,
    };

    const resopnse = await apiHandler("/v1/role", "POST", jsonData);
    setModalShow(false);
  };

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Role
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onAddRoleFormSubmit}>
          <Form.Group>
            <Form.Label>Select Org Name</Form.Label>
            <Select options={orgList} onChange={orgNameHandler2} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Enter Role Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Role Name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Data sets</Form.Label>
            <Multiselect
              options={datasets}
              displayValue="label"
              onSelect={(values) => {
                setDataSetsIds(() => values.map(({ value }) => value));
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Role
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Roles;
