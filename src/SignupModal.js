import ReactDOM from "react-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, signup, signupCheck } from "./Store/LoginSignUpSlice";

const SignupModal = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const dispatch = useDispatch();
  const sig = useSelector((state) => state.IsLogin.signupp);
  console.log("signup" + "   " + sig);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mail !== "" && pass !== "") {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBv8SOw4SaNyyIcjL-bEkirn1qxbEDrl80",
        {
          method: "POST",
          body: JSON.stringify({
            email: mail,
            password: pass,
            returnSecureToken: true,
          }),
        }
      );
      let data = await response.json();
      if (data.error) {
        if (data.error.message == "EMAIL_EXISTS") {
          alert(data.error.message);
        }
        return alert(data.error.message);
      } else {
        dispatch(signupCheck());
        dispatch(
          signup({
            token: data.idToken,
            userId: data.localId,
            email: data.email,
          })
        );
        setMail("");
        setPass("");
        setConfirmPass("");
        alert("Account successfully created.");
      }
    }
  };
  return (
    sig &&
    ReactDOM.createPortal(
      <>
        <div className="fixed z-10 inset-0 bg-black opacity-90 ">
          <div className="flex justify-center items-center h-full">
            <form
              data-aos="fade-up"
              className="rounded-md border w-72 py-4 text-white "
              onSubmit={handleSubmit}
            >
              <h1 className="text-3xl text-center font-bold mb-5">Signup</h1>

              <div className="mx-auto flex flex-col gap-10 mb-20 md:mb-0 text-center ">
                <div className="flex flex-col gap-2">
                  <input
                    className="p-2 w-48 mx-auto text-white text-center rounded outline-none focus:outline-none bg-black border-b"
                    type="email"
                    value={mail}
                    placeholder="Enter your email"
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    className="p-2 w-48 mx-auto text-white text-center rounded outline-none focus:outline-none bg-black border-b"
                    type="text"
                    value={pass}
                    placeholder="password"

                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    className="p-2 w-48 mx-auto text-white text-center rounded outline-none focus:outline-none bg-black border-b"
                    type="text"
                    value={ConfirmPass}
                    placeholder="comfirm password"

                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>

                <div className="flex justify-between flex-col gap-3">
                  <button className="sign_up_btn">Signup</button>

                  <button
                    className="p-4  mx-auto hover:text-blue-400"
                    onClick={() => {
                      dispatch(login());
                      dispatch(signupCheck());
                    }}
                  >
                    Already have an account, login here.
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>,
      document.getElementById("roots")
    )
  );
};

export default SignupModal;
