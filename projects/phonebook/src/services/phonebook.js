import axios from "axios";
const baseUrl = "/api/persons";
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then((response) => response.data);
};

const phonebookService = {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
};

export default phonebookService;
