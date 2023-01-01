import React from 'react';

const Recruiter = () => {
  return (
    <div id="artist_profile" className="container-fluid p-5">
      {/* <!-- Main Profile  --> */}
      <div className="container shadow rounded" id="profile">
        {/* <!-- Bio --> */}
        <div className="row">
          <div className="col-lg-3 p-2 d-flex flex-column align-items-center justify-content-center">
            <div id="image-box">
              <label for="adminImage">
                <img src="/avatar.png" alt="" />
              </label>
              <input
                type="file"
                name="adminImage"
                id="adminImage"
                data-id="image-container"
                className="file"
                hidden="true"
              />
            </div>
            <h6 className="mt-2">Osman Aziz</h6>
            <p>Islamabad, Pakistan</p>
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <p>Since 2022</p>
            <p>Badge New</p>
            <p></p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              quisquam ad dolorem perferendis facilis explicabo voluptate
              voluptas libero corporis sapiente iste, dicta reprehenderit nulla
              voluptatum tempora molestiae, quod animi possimus.
            </p>
          </div>
          <div className="col-12 px-5">
            <div className="style-bar"></div>
          </div>
        </div>
        {/* <!-- Timeline --> */}
        <div className="row my-3">
          <div className="col p-3 px-5 text-center">No Post to be shown.</div>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
