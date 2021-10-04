import {genAdminRoute} from '../../admin/routes'



export default function Playground() {
  console.log("am here",genAdminRoute())
    return (
      <>
      {genAdminRoute().chatHistory()}
        <div>Admin Dashboard Settings</div>
      </>
    );
  }
  