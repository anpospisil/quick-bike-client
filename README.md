# QUICK BIKE :bike:

Click :point_right: [HERE](https://quick-bike.netlify.app/about) :point_left: to check out the deployed version!

## Introduction

Hello There! My name is Andrew. This is my portfolio project named 'Quick Bike'. Please, keep in mind that this is a MVP, not a final version. You can check out my "To Do" list [here](https://github.com/users/anpospisil/projects/1) to see the progress I've made and features that will be added in future.


## The Concept

This main idea of this project is to create a web-based app for short-term bike rental. Users can create an account, reserve a bike using a map interface and lock/unlock their bike in-app.

## Contents

- [App Demo](https://github.com/anpospisil/quick-bike-client#App-Demo)
- [Technology Used](https://github.com/anpospisil/quick-bike-client#technology-used)
- [Goals of this project](https://github.com/anpospisil/quick-bike-client#goals-of-this-project)
- [User stories](https://github.com/anpospisil/quick-bike-client#user-stories)
- [Wireframes & UML](https://github.com/anpospisil/quick-bike-client#wireframes-and-uml)
- [Git Workflow](https://github.com/anpospisil/quick-bike-client#git-workflow)
- [Server Repo](https://github.com/anpospisil/quick-bike-server)

## App Demo

![image](https://github.com/anpospisil/quick-bike-client/blob/master/attachments/signUp.png)
![image](https://github.com/anpospisil/quick-bike-client/blob/master/attachments/login.png)
![image](https://github.com/anpospisil/quick-bike-client/blob/master/attachments/user.png)
![image](https://github.com/anpospisil/quick-bike-client/blob/master/attachments/selectbike.png)
![image](https://github.com/anpospisil/quick-bike-client/blob/master/attachments/bikeLocked.png)



## Technology Used

- [React](https://github.com/anpospisil/quick-bike-client/blob/master/src/pages/Bikes/index.tsx)
- [Redux](https://github.com/anpospisil/quick-bike-client/tree/master/src/store)
- [TypeScript](https://github.com/anpospisil/quick-bike-client/tree/master/src/types) ⭐️
- [React-Google-Maps](https://github.com/anpospisil/quick-bike-client/blob/master/src/components/Map.tsx) ⭐️
- [React Bootstrap](https://github.com/anpospisil/quick-bike-client/blob/master/src/pages/UserProfile/index.tsx)
- [Express](https://github.com/anpospisil/quick-bike-server/blob/development/index.js)
- [Sequelize](https://github.com/anpospisil/quick-bike-server/tree/development/models)
- [Balsamiq](https://balsamiq.cloud/sivxjco/p7hyx0j) ⭐️

⭐️ New technologies learned during this project.

## Goals of this project

The goal of this project is to build a full-stack app using knowledge gained during the bootcamp and incorporating new technologies learned using official documentations and googling.

- Practice full-stack development
- Apply knowledge gained from the bootcamp
- Learn and Apply new technology independently
- Showcase development process through wireframes, user stories and UML
- Practice proper commits & branching on github

## User Stories

- User Stories

  - As a person taking a day trip to a large city, I want to reserve a bike for the day.
  - As a person who doesn’t memorize addresses, I would like to view available bikes on a map depending on the postal code I input, so I don’t have to spend a lot of time searching for bikes.
  - As someone who loses things easily, I want a simple way to unlock/lock my Quick Bike from the App so I don’t have to fiddle with keys or locking mechanisms.
  - As a person who values their privacy and security, I want to have a dedicated profile that requires login info so that only I can see my trip and payment info.
  - As a cost-conscious user of Quick Bike, I want to see my invoices organized by week, month and year so I can budget accordingly and have a record for tax purposes.

  This mvp is still a work in progress. Some features still need to be implemented and revised.

## Wireframes and UML

  - [Quick Bike Wireframes](https://balsamiq.cloud/sivxjco/p7hyx0j)
  - [UML](https://github.com/anpospisil/quick-bike-client/blob/master/attachments/qb-uml.png)

## Git Workflow

In this project I try to:

- Use descriptive commit messages
- Name branches according to feature
- Commit frequently
- Push features to development rather than master

👇 Click below links to view 👀 commit history for frontend & backend

- [Frontend Features](https://github.com/anpospisil/quick-bike-client/branches/yours)
- [Backend Features](https://github.com/anpospisil/quick-bike-server/branches)

## How to Install this?

- clone the app
- cd into the project
- Install dependencies using `npm install`
- start development server using `npm run start`

## Server Repo

- The server side of this project is an Express server connected to a Sequelize database. [Click here for more details](https://github.com/anpospisil/quick-bike-server)
