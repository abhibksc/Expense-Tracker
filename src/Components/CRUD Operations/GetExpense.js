
import { DbUrl } from "../../Constants/URLs"

const GetExpense = async (userId) => {

    let response = await fetch(`${DbUrl}${userId}.json`);

    let data = await response.json();


    if(data !== null){
            let arr = [];
            for (let key in data) {
                data[key].id = key;
                arr.push(data[key]);
            }
            arr = arr.reverse();
            return arr;

    }

 

}


export const GetProfileImage = async ({ userId }) => {


    const data = await fetch(`${DbUrl}${userId}.json`,

        {
            method: "GET",
        }

    );


    let response = await data.json();

    if (response !== null) {
        if (response.Profile.ProfileImageToken) {



            return response.Profile.ProfileImageToken

        }
        else {
            alert("Please Set Profile Pic")
        }


    }
    else {
        console.log("Haaan yehi chala");
        alert("Please Signup")
    }



}

export const GetUserName = async ({ userId }) => {

    let url = `${DbUrl}/${userId}.json`;

    const data = await fetch(`${DbUrl}/${userId}.json`,

        {
            method: "GET",
        }

    );


    let response = await data.json();
    console.log(response);

    if (response !== null) {
        let arr = [];
        for (let key in response) {
            response[key].id = key;
            arr.push(response[key]);
        }
        arr = arr.reverse();

        const userNameFilter = arr.filter((ele) => ele.UserName);


        return userNameFilter
    }

};



export const userIdChecker = async ({ UserName }) => {

    console.log(UserName);


    let userId = await fetch(`${DbUrl}.json`);
    let userIddata = await userId.json();
    console.log(userIddata);



    let flag = false;

    if (userIddata != null) {

        if (userIddata !== null && UserName !== undefined) {


            let arr = [];
            for (let key in userIddata) {
                userIddata[key].id = key;
                arr.push(userIddata[key]);
            }
            arr = arr.reverse();





            const mydata = arr.filter((ele) => ele.Profile.UserName === UserName)


            if (mydata.length === 0) {
                return flag = true;
            }
            else {
                alert("UserName Already Exits")
                console.log("UserName Already Exits");

            }



            return flag;

        }
    }
    else {
        return flag = true;
    }
}

export default GetExpense;