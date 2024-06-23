import ReactDOM from 'react-dom';

import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signIn, signup, signupCheck } from "./Store/LoginSignUpSlice"
import { login } from './Store/LoginSignUpSlice';





const LoginModal = () => {

  const navigate = useNavigate();
  const [Email, setEmail] = useState('abhi@gmail.com');
  const [pass, setPass] = useState("abhishek");
  const IsLogin = useSelector((state) => state.IsLogin.login);
  console.log("Login" + " " + IsLogin);
  const dispatch = useDispatch();
  const handleForm = async (e) => {
    e.preventDefault();

    if (Email !== '' && pass !== '') {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBv8SOw4SaNyyIcjL-bEkirn1qxbEDrl80",
        {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: pass,
            returnSecureToken: true,
          }),
        }
      );


      let data = await response.json();

      if (data.error) return console.log(data.error);
      else {
        console.log(data);
        dispatch(login());
        dispatch(signIn({
          token: data.idToken,
          userId: data.localId,
          email: data.email,
          name: data.displayName,
          url: data.profilePicture,
        }))

        setEmail("")
        setPass("")
        alert("Welcome back!")
      }
    }
  }

  return !IsLogin && ReactDOM.createPortal(<>
    <div className='fixed z-10 inset-0 bg-black opacity-90 '>
      <div className="flex justify-center items-center h-full ">

        <form
        //  data-aos="fade-up"
          className="rounded-md border w-72 py-4 text-white " 
          action="" onSubmit={handleForm}>

          <h1 className="text-3xl text-center font-bold mb-5 ">Login</h1>

          <div className="mx-auto flex flex-col gap-10 mb-20 md:mb-0 text-center  ">
            
            <div className="flex flex-col gap-3">
              {/* <label className="font-bold text-4" htmlFor="">Email</label> */}
              <input className="p-2 w-48 mx-auto text-white text-center rounded outline-none focus:outline-none bg-black border-b"
              type="email" 
              value={Email} 
              onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex flex-col gap-3">
              {/* <label className="font-bold text-4" htmlFor="">Password</label> */}
              <input className="p-2 w-48 mx-auto text-white text-center rounded outline-none focus:outline-none bg-black border-b"
               type="password"
              value={pass} 
              onChange={(e) => setPass(e.target.value)} />
            </div>

            <button className="shadow-md shadow-slate-400 p-2 rounded-lg w-20 mx-auto hover:bg-slate-500">Login</button>



            <div className="flex flex-col ">

              <button className=" p-3  mx-auto hover:text-blue-400">
                <Link to={"/forget"}>Forget Password?</Link>
              </button>


              <button className='hover:text-blue-400'
               onClick={() => {
                navigate("/")
                dispatch(signupCheck());
                dispatch(login());
              }}>  
              Dont have account, SignUp here.
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  </>, document.getElementById('roots'));

}




export default LoginModal;  