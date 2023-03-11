import axios from "axios";

const instance = axios.create({
  //The API (cloud function) url
  // baseURL: "https://us-central1-clone-1a014.cloudfunctions.net/api",

  baseURL: "http://127.0.0.1:5001/clone-1a014/us-central1/api",
});

export default instance
//sk_test_51MbcfbJd4DMJRgl5FTlc8Al8sQl9DYj6MRinwi1fMzYtjQBncY4RBYnLdi0n7DfWEjQEMn1S21dSeRjt7Vmu7bqa00T3HRzxlP


// http://127.0.0.1:5001/clone-1a014/us-central1/api

