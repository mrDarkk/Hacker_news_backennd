# Milestone-6: Hackers read news too you know

## Learning Competencies

At the end of this milestone you will learn

- Reading and understanding code
- Backend vs Frontend
- Building dynamic webapps using Express
- Understanding the databases: Mongodb

## Problem Statement:

Woohoo! Look like we're doing some real web app development now. Isn't this a lot more fun!? Working with actual pages and interactivity and users and profiles and databases and bugs and errors and crashes (OK! Maybe the last 3 aren't that fun).

With this MS, we will be building a fully featured webapp. What we will build is a clone of the [Y Combinator](http://www.ycombinator.com/)'s news site c

## Paths/EndPoints:

### \ (home)
[DEMO](https://hackernews002.herokuapp.com/)

### /api/user (public api)

- POST /register - user can register

- POST /login - user can login 

- GET /getNews - get all news

- GET /news/:Id - get single news with id


###  /api/admin (only admin route only logged in user can access)

-  / - after login 
-  POST /addNews - new news add
- PUT /news/:Id - update news with id
- DELETE /news/:Id  - delete news  with id

