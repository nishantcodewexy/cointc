import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Dropdown } from "react-bootstrap";
import UsersTable from "../tables/user.management.table";
import { useState } from "react";




function UserManagement() {
  const [params,setParams] = useState({
    q:'',
    limit:10,
    offset:10,
    data:{
      name:"akan",
      data:{
        newName:"akan"
      }
    }
  })
  const handleChange = e =>{
    setParams(prev=>({...prev,q:e.target.value}))
  }

  const handleKeyDown = e =>{
    if(e.ctrlKey&&e.keyCode===8){
      setParams(prev=>({...prev,q:''}))
    }
    
  }
  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <div className="input-group search-area right d-lg-inline-flex d-none">
            <input
              value={params.q}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              className="form-control"
              placeholder="Find user here..."
            />
            {/* <div className="input-group-append">
              <span className="input-group-text">
                <Link to={"#"}>
                  <i className="simple-magnifier"></i>
                </Link>
              </span>
            </div> */}
          </div>
        </Col>
        <Col sm="auto">
        <Button size="sm">
              <i className="fa fa-plus"></i>{" "}
              Add User
            </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
            <UsersTable params={params} />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserManagement;

