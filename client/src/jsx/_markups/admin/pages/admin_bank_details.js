import AdminBankDetailsTable from "../components/AdminBankDetails"

function AdminBankDetails({services, useService}) {
  const { group } = services;
  const get = useService(group.getKYC)
  console.log(get)
  return (<>
    <AdminBankDetailsTable/>
    </>)
}

export default AdminBankDetails