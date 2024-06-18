#CBT PROJECT
This is an expressjs and mongodb project that allows teachers to create and edit exams for students to take.
You can create either a student or an admin account.
As an admin, you can create, edit and host exams for students to take and see their results when they log in.

#SETUP AND INSTALLATION
--install all the dependecies by running npm install in the command line
--create  a .env file in the root directory and setup the following environment variables:
-MONGO_URI_STRING-(uri to a mongodb database either local or cloudbased)
-JWT_SECRET-(jsonwebt token secret string)
-IP_ADDRESS-(optional)
if you set up the ip adress variable, the server will run using your ip adress and the website can be hosted locally on your ip.


