import { useHistory } from "react-router-dom";
import "./ErrorPage.css";

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="error-page">
          <img className="error-img" src="https://i.imgur.com/0PgCPE0.png" alt="404 img"></img>
          <div className="btn-container">
      <button
        className="return-btn"
        onClick={() => {
          history.push("/");
        }}
      >
        Return Home
              </button>
              </div>
    </div>
  );
};

export default PageNotFound;
