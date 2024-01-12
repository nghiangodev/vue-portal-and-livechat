import callApi from "../../services/index";

const userService = {
    // Call api login user
    loginUser(email, password) {
        let data = new FormData();
        data.append('email', email);
        data.append('password', password);
        return callApi('/api/login', 'POST', '', data);
    },

};

export default userService;
