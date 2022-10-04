# What is this?

An MVP for "The 100Devs WebDev Database - A Community-Taught Experience". Envisioned as a social media site to share links to tips, tricks, tools, interview prep, job postings, and everything else related to learning to code and get a job the #100Devs way. 

---

# Screenshots

<img src="https://i.imgur.com/I738ARv.png" width=400 />
<img src="https://i.imgur.com/AM4Ppgj.png" width=400 />
<img src="https://i.imgur.com/WmA1Mo6.png" width=400 />
<img src="https://i.imgur.com/Cy6qiM5.png" width=400 />

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Optimizations / Features to Add

As an MVP, the bare minimum functions of the app are working. However, if we had had more time, there are several things we would have liked to have done, including: 
- ANKI feature: grab a random post, only show the ankiQuestion portion from the database, when you are satisfied with answering the question, press button to load the rest of post. "Poor man's ANKI". 
- Comments: add comments to posts so that people can talk about good and bad aspects of the post, with threaded comments ideally. 

---

# Install all the dependencies or node packages used for development via Terminal

Use the command `npm install` 

---

# To start your server

Use the command `npm start`  

---

# Required files to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`