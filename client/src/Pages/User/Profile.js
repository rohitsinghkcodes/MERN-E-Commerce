import React from "react";
import Layout from "../../Components/Layouts/Layout";
import UserMenu from "../../Components/Layouts/UserMenu";
const Profile = () => {
  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Profile Page</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
