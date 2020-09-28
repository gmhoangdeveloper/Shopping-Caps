import React, { useState, useEffect } from "react";
import "date-fns";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// function addPost(postdetail) {
//   axios
//     .post("http://localhost:4000/blog", postdetail, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res) => {
//       dispatch({
//         type: "ADD_DATA",
//         payload: res.data,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
export default function Addpost() {
  const [title, settitle] = useState("");
  const [des, setdes] = useState("");
  const [file, setfile] = useState(null);
  // const { addPost } = useContext(Globalcontext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file[0]);
    console.log([...formData]);

    const addedValue = {
      title,
      des,
      formData,
    };
    console.log("addedValue", addedValue,file);

    // settitle("");
    // setdes("");
    // setfile("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          type="text"
          name="des"
          value={des}
          onChange={(e) => setdes(e.target.value)}
        />
        <input
          type="file"
          name="file"
          onChange={(e) => {
            setfile(e.target.files);
          }}
        />
        <button type="submit" value="submit">
          Add Post
        </button>
      </form>
    </div>
  );
}
