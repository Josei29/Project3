import axios from "axios";

const API = {
    login:function(User) {
        return axios.post("/login", User)
    },

    create: function(newUser) {
        return axios.post("/api/user", newUser);
    },

    getName: function(id) {
        // console.log("api", id)
        return axios.get(`/api/user/${id}`);
    },

    addNewItem: function(data) {
        // console.log("API.js", data);
        return axios.post("/api/addNewItem", data);
    },

    addNewSpecial: function(data) {
        // console.log("API.js", data);
        return axios.post("/api/addNewSpecial", data)
    },

    getBudgetItem: function(item) {
        return axios.get("/api/getBudgetItem", item);
    },

    sendMoney: function(data) {
        return axios.post("/api/sendMoney", data);
    },

    deleteBudget: function(item) {
        return axios.post("/api/deleteBudget", item)
    }, 

    deleteSpecial: function(item) {
        return axios.post("/api/deleteSpecial", item)
    }
}

export default API