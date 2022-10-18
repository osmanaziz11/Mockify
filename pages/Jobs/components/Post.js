const Post = ({ data }) => {
  return (
    <div className="row my-5 px-3">
      <div className="col-md-8  post__container  rounded shadow mb-4 p-3">
        <div className="w-100">
          <h4>Job Title</h4>
          <h6>Company Name</h6>
          <p>Location</p>
          <p className="c">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            veniam excepturi sint enim tenetur. Fuga, incidunt natus quos
            ratione laudantium tenetur sit rem amet mollitia beatae ipsa nulla
            cum quam possimus architecto facere voluptas pariatur! Est quaerat
            praesentium dicta, quisquam ipsa, amet corporis provident dolor
            deserunt molestias dolorum dolore quia ea esse labore obcaecati
            fugit incidunt eius sequi modi laboriosam non minima dolores a! Quos
            similique incidunt dolores itaque perspiciatis consequuntur et
            perferendis nostrum, blanditiis explicabo ullam ex minima optio. Ut
            harum corporis beatae adipisci deserunt doloremque at nam delectus
            qui tempora error impedit, minus molestias placeat mollitia
            veritatis! Labore?
          </p>
          <ul className="list-unstyled m-0 p-0 d-flex">
            <li className="salary me-3">1200</li>
            <li className="type">Internship</li>
          </ul>
          <div className="date mt-2 d-flex justify-content-between align-content-between">
            <p>Posted Date</p>
            <a href="">
              <p>Complete Picture</p>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4 p-4 graph__container d-flex flex-column justify-content-center align-items-center">
        <div className="graph w-100">
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sint
            quis corporis at iusto odio asperiores, mollitia quo eaque! Enim
            eligendi exercitationem repellat sapiente magni eum, quibusdam odio
            dicta explicabo!
          </p>
        </div>
        <button>PREDICT</button>
      </div>
    </div>
  );
};
export default Post;
