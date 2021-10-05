import {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Dropdown } from "react-bootstrap";
import pt from 'prop-types'
import {LinearProgress, TablePagination} from '@material-ui/core';
import useClient from '../../../_apiClient'
import ActionButton from '../../_shared_component/ActionButton'


function UsersTable({params}) {
    const [list, setList] = useState(null)
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const api = useClient()
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /**
     * 
     * @param {Object} args 
     */
    const deleteItem = ({id}) =>async ()=>{

        const data =  await api.Admin.User.delete({
            data:{
                data:[id],
                soft:true
            }
        })
        await refreshList({...params,limit:rowsPerPage,offset:rowsPerPage*page})

        return data

        
    }

    /**
     * 
     * @param {Object} args 
     */
    const editItem = async(args) =>{

    }


    const refreshList = (params)=>{
        return api.Admin.User.list({params}).then(data=>{
            setList(data)

            console.log(data)
        })
        .catch(err=>{
            console.log(err)   
            return err
        })
        
    }


    useEffect(() => {
        refreshList(params)
        return api.abort
    }, [])

//   const action = (
//     <div className="d-flex" style={{gap: 20}}>
//       <a href="">
//         <span className="themify-glyph-29"></span>{" "}Edit
//       </a>
//       <a href="">
//         <span className="themify-glyph-165"></span>{" "}Delete
//       </a>
//     </div>
//   );

  const chackbox = document.querySelectorAll(".customer_shop_single input");
  const motherChackBox = document.querySelector(".customer_shop input");
  // console.log(document.querySelectorAll(".publish_review input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  const chack = (i) => (
    <div className={`custom-control custom-checkbox ml-2`}>
      <input
        type="checkbox"
        className="custom-control-input "
        id={`checkAll${i}`}
        required=""
        onClick={() => chackboxFun()}
      />
      <label className="custom-control-label" htmlFor={`checkAll${i}`}></label>
    </div>
  );

  return (
    <>
      <table className="table mb-0 table-striped respon-table-data">
        <thead>
          <tr>
            <th className="customer_shop">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll"
                  onClick={() => chackboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll"
                ></label>
              </div>
            </th>
            <th>User ID</th>
            <th>Email</th>
            <th>KYC Status</th>
            <th className="pl-5 width200">Status</th>
            <th>Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="customers">
            {
                list?list.results.map(item=>(

                    <tr key={item.id} className="btn-reveal-trigger">
                        <td className="customer_shop_single">{chack(1)}</td>
                        <td className="py-3">
                        <Link to="">
                            <div className="media d-flex align-items-center">
                            <div className="media-body">
                                <h5 className="mb-0 fs--1">{item.id}</h5>
                            </div>
                            </div>
                        </Link>
                        </td>
                        <td className="py-2">
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                        </td>
                        <td className="py-2">
                        <a href="tel:2012001851">Not verified</a>
                        </td>
                        <td className="py-2 pl-5 wspace-no">Active</td>
                        <td className="py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="py-2 text-right">
                            <div className="d-flex" style={{gap: 20}}>
                                <ActionButton type="edit" action={editItem} actionTitle="edit" title="edit user" />
                                <ActionButton type="delete" action={deleteItem({id:item.id})} actionTitle="delete" title={`delete ${item.email}?`} />
                            </div>
                        </td>
                    </tr>
                )):<LinearProgress color="secondary" />
            }
        </tbody>
      </table>
      <TablePagination
      component="div"
      count={list?list.count:0}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}

UsersTable.defaultProps = {
    params:{

    }
}


UsersTable.propTypes = {
    params:pt.object
}


export default UsersTable