import  { useContext } from "react";
import { RecoveryContext } from "../../../App";
import { Link } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export default function Login() {
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);

  const navigate = useNavigate()

  const { userName, password, role, onInputChange, onResetForm } = useForm({ userName: "", password: "", role: ""})

  function navigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log("Generated OTP:", OTP);
      setOTP(OTP);

      axios
        .post("http://localhost:3000/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then((response) => {
          console.log("Email sent successfully:", response.data);
          setPage("otp");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          console.log(
            "Response data:",
            error.response ? error.response.data : "No response data"
          );
        });
    } else {
      alert("Please enter your email");
    }
  }
  

  const handlerSubmit = (e) => {
    e.preventDefault()

    navigate("/intranet", {
      replace: true,
      state: {
        logged: true,
        userName,
        role
      },
    });
    setEmail(userName);
    onResetForm()
  }

  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-/12 md:w-9/12 mb-10 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                style={{ width: "90%" }}
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handlerSubmit}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Sign in with</p>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                  >
                    {/* SVG icon */}
                  </button>
                  {/* Other buttons */}
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>

                <div className="mb-6">
                  <input
                    onChange={onInputChange}
                    name="userName"
                    id="userName"
                    value={userName}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="User or Email address"
                    required
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={onInputChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  {/* Use Link component for navigation */}
                  <Link
                    to="#"
                    onClick={navigateToOtp}
                    className="text-gray-800"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    // type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Dont have an account?
                    <a
                      href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
