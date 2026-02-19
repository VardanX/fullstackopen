import axios from "axios";
const baseURL = `http://localhost:3001/persons`;

const getContacts = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

const createContact = (contactObject) => {
    const request = axios.post(baseURL, contactObject);
    return request.then(response => response.data);
};

export  {getContacts, createContact};
