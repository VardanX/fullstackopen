import axios from "axios";
const baseURL = `/api/persons`;

const getContacts = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

const createContact = (contactObject) => {
    const request = axios.post(baseURL, contactObject);
    return request.then(response => response.data);
};

const deleteContact = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data)
}

const updateContact = (id, updatedContact) => {
    const request = axios.put(`${baseURL}/${id}`, updatedContact);
    return request.then(response => response.data)
}

export { getContacts, createContact, deleteContact, updateContact};
