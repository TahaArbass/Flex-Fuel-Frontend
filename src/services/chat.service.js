import http from '../Axios.config'; // import Axios instance

// get all chats
const getAllChats = () => {
    return http.get('/chats');
};

// get chat by id
const getChatbyChatId = (chat_id) => {
    return http.get(`/chats/${chat_id}`);
};

// get chat by participants
const getChatByParticipants = (data) => {
    return http.get('/chats/participants', data);
};

// create new chat
const createChat = (data) => {
    return http.post('/chats', data);
};

// update chat by id
const updateChat = (id, data) => {
    return http.put(`/chats/${id}`, data);
};

// delete chat by id
const deleteChat = (id) => {
    return http.delete(`/chats/${id}`);
};

// add a participant to a chat
const addParticipant = (data) => {
    return http.put('/chats/addParticipant', data);
};

// delete a participant from a chat
const deleteParticipant = (data) => {
    return http.put('/chats/deleteParticipant', data);
};

// add a message to a chat
const addMessage = (data) => {
    return http.put('/chats/addMessage', data);
};

// delete a message from a chat
const deleteMessage = (data) => {
    return http.put('/chats/deleteMessage', data);
};

const ChatService = {
    getAllChats,
    getChatbyChatId,
    getChatByParticipants,
    createChat,
    deleteChat,
    addParticipant,
    deleteParticipant,
    addMessage,
    deleteMessage
};

export default ChatService;