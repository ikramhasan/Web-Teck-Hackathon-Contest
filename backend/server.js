const app = require("./app");

<<<<<<< HEAD
app.listen(5000, () => {
=======
app.listen(process.env.PORT || 5000, () => {
>>>>>>> e965d5cd628247aae70b6ad1b330706db5fa5c09
  console.log("Server running on port 5000");
});
