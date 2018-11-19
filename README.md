# Restful-Action-Creator

[![CircleCI](https://circleci.com/gh/baoduy/Restful-Action-Creator.svg?style=svg)](https://circleci.com/gh/baoduy/Restful-Action-Creator)
[![codecov](https://codecov.io/gh/baoduy/Restful-Action-Creator/branch/develop/graph/badge.svg)](https://codecov.io/gh/baoduy/Restful-Action-Creator)
[![Greenkeeper badge](https://badges.greenkeeper.io/baoduy/Restful-Action-Creator.svg)](https://greenkeeper.io/)
[![PeerDependencies](https://img.shields.io/david/peer/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator?type=peer)
[![Dependencies](https://img.shields.io/david/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator)
[![DevDependencies](https://img.shields.io/david/dev/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator?type=develop)

## 1. How It Work?
Let's review the Rest endpiont below which have the:
- Base URL: http://localhost
- The end point: /api/CoreDate/Customers
- 11 Actions which allow to manipulate the customer information includes Departments and Notes.
![RestApi](https://raw.githubusercontent.com/baoduy/restful-action-creator/develop/docs/SampleResApi.PNG)

### 1. Develop Clinet Actions Helper for SPA application
Assume, I using React JS Framework here to develop a SPA application. However this component will work for all (Angular, Vue, PreactJs, ...) frameworks.

For each actions above we need to develop a method which calling the API and return the value as below. 
```javascript
const axios = require('axios');
//Create instance
const instance = axios.create({
  baseURL: 'http://localhost/api/'
});
//1. Get Customers
const GetCustomers = async () => {
     const response = await instance.get('/Customers');
     return response.data;
}
//2. Post Customer
const PostCustomer = async (customer:any) => {
     const response = await instance.post('/Customers/', customer);
     return response.data;
}
//3. Get Customer By Id
const GetCustomers = async (id:int) => {
     const response = await instance.get('/Customers/' + id);
     return response.data;
}
```
>*I'm using [Axios](https://github.com/axios/axios) as a helper for all Rest call this is great library and saving alot of effots when working with Rest on Javascript application development.*
