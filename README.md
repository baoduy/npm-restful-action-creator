# Restful-Action-Creator
```cmd
npm i restful-action-creator
```
[![CircleCI](https://circleci.com/gh/baoduy/Restful-Action-Creator.svg?style=svg)](https://circleci.com/gh/baoduy/Restful-Action-Creator)
[![codecov](https://codecov.io/gh/baoduy/Restful-Action-Creator/branch/develop/graph/badge.svg)](https://codecov.io/gh/baoduy/Restful-Action-Creator)
[![Greenkeeper badge](https://badges.greenkeeper.io/baoduy/Restful-Action-Creator.svg)](https://greenkeeper.io/)
[![PeerDependencies](https://img.shields.io/david/peer/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator?type=peer)
[![Dependencies](https://img.shields.io/david/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator)
[![DevDependencies](https://img.shields.io/david/dev/baoduy/Restful-Action-Creator.svg)](https://david-dm.org/baoduy/Restful-Action-Creator?type=develop)

## How It Work?
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
const GetCustomers = async (id: number) => {
     const response = await instance.get('/Customers/' + id);
     return response.data;
}
```
>*I'm using [Axios](https://github.com/axios/axios) as a helper for all Rest call this is great library and saving alot of effots when working with Rest on Javascript application development.*
Review the code above, All the metnods look like similar, except the endpint and parameters.

### 2. What Restful-Action-Creator can help.
1. It allow to defined a Global API instance at **RestfulCreator.ts** which shall be share to all controllers.
```javascript
//File RestfulCreator.ts
import RestfulCreator from 'restful-action-creator';
export default RestfulCreator({
  baseURL: 'http://localhost/api/'
});
```
2. Define the mathed for each controller.
```javascript
import RestfulCreator from './RestfulCreator';
const CustomerApi = RestfulCreator.create('CoreData/Customers');

export default {
    //1. Get All Customers
    get:() => api.get(),
    //3. Get Customer by Id
    getById: (id: number) => CustomerApi.get({pathParams: id}),
    //11. Soft Delete Customer
    archive: (id: number) => CustomerApi.delete({pathParams: [id, 'Archive']}),
    //5. Hard Delete Customer
    delete:(customer: any) => CustomerApi.delete({
        pathParams: customer.id, 
        data: customer }),
    //2. Create New Customer
    create: (customer: any) => CustomerApi.post(customer),
    //4. Update Customer.
    update: (customer: any) => CustomerApi.put({ 
        pathParams: customer.id, 
        data: customer }),
    //7. Create or Update Department
    createOrUpdateDepartment: (id: number, department: any) => CustomerApi.put({ 
        pathParams: [id, 'Departments'], 
        data: department }),
    //8. Delete Department
    deleteDeprtment: (customerId: number, department: any) => CustomerApi.delete({
        pathParams: [customerId, 'Departments', department.id],
        data: department  }),
    //9. Create Customer Note.
    createOrUpdateNote: (id: number, note: any) => CustomerApi.put({ 
        pathParams: [id, 'Notes'], 
        data: note }),
    //10. Delete Customer Note
    deleteNote: (customerId: number, note: any) => CustomerApi.delete({
      pathParams: [customerId, 'Notes', note.id],
      data: note
    })
};
```
With this helper library and just a few line of codes I can create all 11 actions accordinglty to the Restfull API above.

### 3. How PathParams works?
There is a new property named **pathParams** had been instroduced in this library which allow to build the path paremter of the endpoint.

So, example: 
when get all customers we using the endpoint */CoreData.Customers/*. However, then get a single Customer by Id we need to use */CoreData.Customers/1* which 1 is customer id. I call this is path paremter.

The **pathParams** can be a object, array or any primitive value.
Example:
pathParams: {id:1,type:'archive'} => the url: */CoreData.Customers/1/archive*
pathParams: [2,'Departments'] => the url: */CoreData.Customers/2/Departments*
pathParams: 10 => the url: */CoreData.Customers/10*

# Source Code
This libray fully developed by using TypeScript which you can download from [here](https://github.com/baoduy/restful-action-creator) and it has 100% coved by unit tests.


