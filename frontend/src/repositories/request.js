import axios from "axios";

const updateRequest = async (id, data) =>
	axios.put(`${process.env.REACT_APP_BACKEND_URL}/requests/${id}`, data);

const createRequest = async (data) => {
	axios.post(`${process.env.REACT_APP_BACKEND_URL}/requests`, data);
};

const deleteRequest = async (id) =>
	axios
		.delete(`${process.env.REACT_APP_BACKEND_URL}/requests/${id}`)
		.then((res) => res.data);

const getAllReqs = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/requests`)
		.then((res) => res.data);

const getReq = (id) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/requests/${id}`)
		.then((res) => res.data);

// eslint-disable-nextline
export { updateRequest, createRequest, deleteRequest, getAllReqs, getReq };
