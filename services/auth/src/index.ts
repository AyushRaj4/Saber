import express from "express";
const app = express();
app.use(express.json());

app.post("/signup", (req, res) => {
  // TODO: validate, hash, save, return JWT
  res.status(201).json({ msg: "signup stub" });
});

app.post("/login", (req, res) => {
  res.json({ token: "fake-jwt" });
});

app.listen(4000, () => console.log("auth listening on 4000"));
