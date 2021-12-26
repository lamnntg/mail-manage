import React from "react";
import "./SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { db } from "../../firebase";
import firebase from "firebase";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function SendMail() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    const data = formData.subject + " " + formData.message;
    handleCheckMail(data)
      .then((res) => {
        alert(`Mail's type is ${res.result}`);
        db.collection("emails").add({
          to: formData.to,
          subject: formData.subject,
          message: formData.message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          type: res.result,
        });
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(closeSendMessage());
  };

  const handleCheckMail = async (data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const req = await axios.get(
      `https://salty-thicket-51839.herokuapp.com/raw_predict?text=${data}`,
      headers
    );
    return req.data;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className="sendMail">
        <div className="sendMail-header">
          <h3>New Message</h3>
          <CloseIcon
            onClick={() => dispatch(closeSendMessage())}
            className="sendMail-close"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="to"
            placeholder="To"
            type="email"
            {...register("to", { required: true })}
          />
          {errors.to && <p className="sendMail-error">To is Required!</p>}
          <input
            name="subject"
            placeholder="Subject"
            type="text"
            {...register("subject", { required: true })}
          />
          {errors.subject && (
            <p className="sendMail-error">Subject is Required!</p>
          )}
          <input
            name="message"
            placeholder="Message"
            type="text"
            className="sendMail-message"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <p className="sendMail-error">Message is Required!</p>
          )}
          <div className="sendMail-options">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="sendMail-send"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
      <div className={classes.root}>
        <Alert onClose={handleClose}>
          This is a success alert — check it out!
        </Alert>
      </div>
    </>
  );
}

export default SendMail;
