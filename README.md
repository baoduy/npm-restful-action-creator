# Restful-Action-Creator

```cmd
npm i restful-action-creator
```

![publishsize](https://badgen.net/packagephobia/publish/restful-action-creator)
![BundleSize](https://badgen.net/bundlephobia/min/restful-action-creator)
[![CircleCI](https://circleci.com/gh/baoduy/restful-action-creator.svg?style=svg)](https://circleci.com/gh/baoduy/restful-action-creator)
[![codecov](https://codecov.io/gh/baoduy/Restful-Action-Creator/branch/develop/graph/badge.svg)](https://codecov.io/gh/baoduy/Restful-Action-Creator)
[![PeerDependencies](https://img.shields.io/david/peer/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator?type=peer)
[![Dependencies](https://img.shields.io/david/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator)
[![DevDependencies](https://img.shields.io/david/dev/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator?type=develop)

## How It Work ?

Let's review the Rest API below which has the:

- Base URL: http://localhost
- The endpoint: /api/CoreDate/Customers
- 11 Actions that allow manipulating the customer information includes Departments and Notes.
  ![RestApi](https://raw.githubusercontent.com/baoduy/restful-action-creator/develop/docs/SampleResApi.PNG)

### 1. Develop Client Actions Helper for SPA application

For each actions of the Api above we need to develop a method which calling the API and return the value as the sample below.

BEFORE

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
};
//2. Post Customer
const PostCustomer = async (customer: any) => {
  const response = await instance.post('/Customers/', customer);
  return response.data;
};
//3. Get Customer By Id
const GetCustomers = async (id: number) => {
  const response = await instance.get('/Customers/' + id);
  return response.data;
};
//4. Others
...
```

> _I'm using [Axios](https://github.com/axios/axios) as a helper for all Rest call this is a great library and saving a lot of efforts when working with Rest on Javascript application development._

Review the code above, All the methods look like similar, except the endpoint URL and parameters.

### 2. What Restful-Action-Creator can help.

As you know each Web API will have a base URL with multi endpoint and each endpoint representative for a data type with multi actions (get, post, put, delete, ...) allow the consumer working with that data.

This library had been developed allow to simulate exactly the same hierarchy above.

1. I defined a Global API instance for the Web API in **RestfulCreator.ts** which shall be shared to all endpoints development later.

AFTER

```javascript
//File RestCreator.ts
import RestClient from 'restful-action-creator';
export default RestClient({
  baseURL: 'http://localhost/api/'
});
```

2. For each endpoint I will create separate as below.

```javascript
//The CustomerApi.ts
//import the creator above.
import RestCreator from './RestCreator';
//Create endpoint for Customer.
const CustomerApi = RestCreator.create('CoreData/Customers');

export default {
  //1. Get All Customers
  get: () => api.get(),
  //2. Create New Customer
  create: (customer: any) => CustomerApi.post(customer),
  //3. Get Customer by Id
  getById: (id: number) => CustomerApi.get({ pathParams: id }),
  //4. Update Customer.
  update: (customer: any) =>
    CustomerApi.put({
      pathParams: customer.id,
      data: customer
    }),
  //5. Hard Delete Customer
  delete: (customer: any) =>
    CustomerApi.delete({
      pathParams: customer.id,
      data: customer
    }),
  //6. Update a Department
  createOrUpdateDepartment: (customerId: number, department: any) =>
    CustomerApi.post({
      pathParams: [customerId, 'Departments'],
      data: department
    }),
  //7. Create a new Department
  createOrUpdateDepartment: (customerId: number, department: any) =>
    CustomerApi.put({
      pathParams: [customerId, 'Departments'],
      data: department
    }),
  //8. Delete Department
  deleteDeprtment: (customerId: number, department: any) =>
    CustomerApi.delete({
      pathParams: [customerId, 'Departments', department.id],
      data: department
    }),
  //9. Create Customer Note.
  createOrUpdateNote: (id: number, note: any) =>
    CustomerApi.put({
      pathParams: [id, 'Notes'],
      data: note
    }),
  //10. Delete Customer Note
  deleteNote: (customerId: number, note: any) =>
    CustomerApi.delete({
      pathParams: [customerId, 'Notes', note.id],
      data: note
    }),
  //11. Soft Delete Customer
  archive: (id: number) => CustomerApi.delete({ pathParams: [id, 'Archive'] })
};
```

The **CustomerApi** have a full list of all actions mentioned above, However, they are just common methods and may cause confusing to the developer who uses this instance to call the API.

Instead, I wrapped the instance and create the exposing of the list of actions available for each endpoint.

As you see, with this helper library and just a few lines of codes, I can create all 11 actions accordingly to the Restful API above.

CONSUMMER

```javascript
import CustomerApi from 'CustomerApi';

const listOfCustomer = await CustomerApi.get();
const customer = await CustomerApi.getBById(1);
```

### 3. Benefits

The benefits when putting all related API into a single module is:

1. Consolidated the endpoint definition and actions into a single module.
2. Just call the methods with parameters for all subsequent use.
3. Easier for maintaining if any endpoint or parameters got changed.
4. Standardized the coding for all API communication methods.

### 4. How PathParams works?

There is a new property named **pathParams** had been introduced in this library which allows building the path URL of the endpoint.

So, example:
when getting all customers we using the endpoint _/CoreData.Customers/_. However, then get a single Customer by Id we need to use _/CoreData.Customers/1_ which 1 is customer id. I call this is path parameter.

The **pathParams** can be an object, array or any primitive value.
Example:
pathParams: {id:1,type:'archive'} => the url: _/CoreData.Customers/1/archive_
pathParams: [2,'Departments'] => the url: _/CoreData.Customers/2/Departments_
pathParams: 10 => the url: _/CoreData.Customers/10_

## Handling Errors

You can handle the error of all requests by handling the **errorHandler** of **RestClient** as below

```javascript
export default RestClient({
  baseURL: 'http://localhost/api/',
  errorHandler: error =>
    Promise.reject({
      error: error.message,
      errorData: error.response && error.response.data
    })
});
```

## Supporting Features

This library internally using **axios** library for all Web API communication so that, it supporting all feature of axis provided [here](https://github.com/axios/axios).

## Source Code

This library fully developed by using TypeScript which you can download from [here](https://github.com/baoduy/restful-action-creator) and it has 100% unit tests coved.

**Hope the library use full.**

[drunkcoding](http://drunkcoding.net)
