import React, { useEffect, useState, useRef, useContext } from 'react';
// import './App.css';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {logUserContext} from  '../../App';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function Vidcall() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [logUser] = useContext(logUserContext)

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("/", {query: {_id: logUser._id}});
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    socket.current.on("yourID", (id) => {
      setYourID(id);
    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
      setReceivingCall(true)
      setCaller(data.callFrom)
      setCallerSignal(data.signal)
    })
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })

    peer.on("signal", data => {
      socket.current.emit("callUser", {userToCall: id, signal: data, callFrom: yourID })
    })

    peer.on("stream", stream => {
      if(partnerVideo.current){
        partnerVideo.current.srcObject = stream
      }
    })

    socket.current.on("callAccepted", signal => {
      setCallAccepted(true)
      peer.signal(signal)
    })
  }

  function acceptCall() {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })

    peer.on("signal", data => {
      socket.current.emit("acceptCall", {signal: data, to: caller } )
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
  }

  function randomUser(){
    const keys = Object.keys(users)
    console.log("keys: ", keys)
    console.log("num users: ", keys.length)
    let idx = Math.floor(Math.random()*keys.length)
    // let idx = 1
    console.log("index: ", idx)
    while(keys[idx] === yourID){
      idx = Math.floor(Math.random() * keys.length)
    }
    console.log("yourid: ", yourID)
    console.log("connectid: ", keys[idx])
    return keys[idx]
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }
  return (
    <Container>
      <Row>
        {UserVideo}
        {PartnerVideo}
      </Row>
      <Row>
        <p>your id: {yourID}</p>
        <button onClick={() => callPeer(randomUser())}>Call {randomUser()}</button>
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
  );
}

export default Vidcall;
