import React from "react";
import { db } from "../firebase/config";

const data = db();

export class CrudPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "",
      isOpen: false,
      record: {
        username: props.username,
        fullname: props.record.Fullname,
        phonenum: props.record.Phonenumber,
        dob: props.record.dateofbirth,
      },
      modUsername: "",
      modFullname: "",
      modPhonenum: "",
      modDob: "",
    };
  }
}
