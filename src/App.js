import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SpamList from "./components/SpamList/SpamList";
import SendMail from "./components/SendMail/SendMail";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";
import Login from "./components/Login/Login";
// import gmailApi from 'react-gmail'


function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  // const handleSignIn = () => {
  //   gmailApi.handleSignIn().then(() => {
  //     console.log("handleSignIn");
  //   });
  // };

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/" exact>
                <EmailList />
              </Route>
              <Route path="/spam" exact>
                <SpamList />
              </Route>
            </Switch>
          </div>
          
          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
