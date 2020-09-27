import { createPeerConnection } from 'p2p-chat';

const iceServers: RTCIceServer[] = [
    {
        urls: 'stun:stun.l.google.com:19302',
    },
    {
        urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
        username: 'webrtc',
        credential: 'webrtc',
    },
];

window['masterAsyncFunc'] = async () => {
    console.log('started masterAsyncFunc');
    const onChannelOpen = () => console.log(`Connection ready!`);
    const onMessageReceived = (message: string) => console.log(`New incomming message: ${message}`);

    const { localDescription, setAnswerDescription, sendMessage } = await createPeerConnection({ iceServers, onMessageReceived, onChannelOpen });
    console.log('localDescription', localDescription);
    // you will send localDescription to your SLAVE and he will give you his localDescription. You will set it as an answer to establish connection
    const answerDescription = 'This is a string you will get from a SLAVE trying to connect with your localDescription';
    setAnswerDescription(answerDescription);

    // later on you can send a message to SLAVE
    sendMessage('Hello SLAVE');
}

window['slaveAsyncFunc'] = async () => {
    console.log('started slaveAsyncFunc');
    const remoteDescription = 'This is a string you will get from a host...';
    const onChannelOpen = () => console.log(`Connection ready!`);
    const onMessageReceived = (message: string) => console.log(`New incomming message: ${message}`);

    const { localDescription, sendMessage } = await createPeerConnection({ remoteDescription, iceServers, onMessageReceived, onChannelOpen });
    console.log('localDescription', localDescription);
    // Send your local description to HOST and wait for a connection to start

    // Later on you can send a message to HOST
    sendMessage('Hello HOST');
};