import axios from "axios";

const getAll = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const addPerson = (person) => {
  return axios
    .post("http://localhost:3001/persons", person)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`);
};

const updatePerson = (id, person) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, person)
    .then((response) => response.data);
};

const phonebookService = {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
};

export default phonebookService;
