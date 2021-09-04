import React, { Component } from "react";
import Resource from "../Resource/Resource";
import TextInput from "../Forms/TextInput";
import axios from "axios";
import SelectOption from "../Forms/SelectOption";
import SessionData from "../SessionData/SessionData";

export class Sessions extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      isSessions: false,
      date: "",
      time: "",
      client_id: "",
      physio_id: "",
      fee: "",
      number: "",
      duration: "",
      type: "",
      other: "",
    };

    this.toggleSessions = this.toggleSessions.bind(this);
  }

  //show/hide all physios
  toggleSessions = () => {
    this.setState((state) => ({ isSessions: !state.isSessions }));
  };

  //listens for keystrokes updates state by target name
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  //on form submission prepares req.body for posting
  handleSubmit = (event) => {
    const {
      date,
      time,
      client_id,
      physio_id,
      fee,
      number,
      duration,
      type,
      other,
    } = this.state;

    const session = {
      date,
      time,
      client_id,
      physio_id,
      fee,
      number,
      duration,
      type,
      other,
    };

    axios
      .post("http://localhost:5000/sessions", session)
      .then(() => console.log("Session created"))
      .catch((err) => {
        console.error(err);
      });

    event.target.reset();

    this.fetchSessions();
  };

  render() {
    const OpeningHours = require("../JSON/OpeningHours.json");
    const Treatments = require("../JSON/Treatments.json");

    return (
      <div className="col-sm-4 m-2">
        <div className="session-form container-row w-100 pb-2">
          <h1 className="pb-3">Sessions</h1>
          <form className="row" onSubmit={this.handleSubmit} novalidate>
            <div className="form-row pb-2">
              <TextInput
                name="date"
                onChange={this.handleChange}
                placeholder="Date"
              />
              <SelectOption
                name="time"
                description={"Select Time"}
                onChange={this.handleChange}
                data={OpeningHours}
              />
              <SelectOption
                name="type"
                description={"Select Treatment Type"}
                onChange={this.handleChange}
                data={Treatments}
              />
              <TextInput
                name="client_id"
                onChange={this.handleChange}
                placeholder="Insert Client ID"
              />
              <TextInput
                name="physio_id"
                onChange={this.handleChange}
                placeholder="Insert Phyiso"
              />
              <div className="row g-2">
                <TextInput
                  name="fee"
                  onChange={this.handleChange}
                  placeholder="Fee"
                />
                <TextInput
                  name="number"
                  onChange={this.handleChange}
                  placeholder="Number"
                />
                <TextInput
                  name="duration"
                  onChange={this.handleChange}
                  placeholder="Duration"
                />
              </div>
              <div className="p-2">
                <button type="submit" class="btn btn-primary mb-3">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="p-2">
          <div>
            <button
              type="button"
              className="btn  m-2 btn-dark"
              onClick={this.toggleSessions}
            >
              Show All Sessions
            </button>
          </div>
          {this.state.isSessions ? (
            <Resource
              path="http://localhost:5000/sessions"
              render={(data) => {
                if (data.loading) return <p>Loading Sessions...</p>;
                return <SessionData sessionDetails={data.payload} />;
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Sessions;
