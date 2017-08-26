var mongoose = require('mongoose')
var Schema = mongoose.Schema
var graphql = require('graphql')
var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLBoolean = graphql.GraphQLBoolean
var GraphQLID = graphql.GraphQLID
var GraphQLString = graphql.GraphQLString
var GraphQLDate = require('graphql-date')
var GraphQLInt = graphql.GraphQLInt
var GraphQLFloat = graphql.GraphQLFloat
var GraphQLList = graphql.GraphQLList
var GraphQLNonNull = graphql.GraphQLNonNull
var GraphQLSchema = graphql.GraphQLSchema
var GraphQLInputObjectType = graphql.GraphQLInputObjectType
var { EmployeeINAcedmicType,EmployeeOPAcedmicType,EmployeeINBankType,EmployeeBankType } = require("./bank_acedmic")
var {Employee} = require("./employeeSchema")
mongoose.Promise = Promise;
// Mongoose Schema definition

/*
 * I’m sharing my credentials here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * to connect to a local instance of MongoDB use
 * COMPOSE_URI=mongodb://example:example@127.0.0.1:27017/todo
 */
var COMPOSE_URI_DEFAULT = 'mongodb://localhost:27017/graphqlfundoohr'
mongoose.connect(process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT,
  {useMongoClient: true}).catch(function (error) {
  console.error('mongo connection fail::',error);
}).then(function(mongodb) {
  console.log('mongo connected');
  });
/** END */


var EmployeeType = new GraphQLObjectType({
  name: 'employees',
  fields: () => ({
    employeeObjectId: {
      type: GraphQLID,
      description: 'employee Object id'
    },
    firstName: {
      type: GraphQLString,
      description: 'Employee first name'
    },
    lastName:{
      type: GraphQLString,
      description: 'Employee last name'
    },
    middleName:{
      type: GraphQLString,
      description: 'Employee middle name'
    },
    bank:{
      type:EmployeeBankType,
      description:"Employee bank Schema"
    },
    academic:{
      type:new GraphQLList(EmployeeOPAcedmicType),
      description:"Employee academic details"
    },
    verified: {
      type: GraphQLBoolean,
      description: 'Flag to mark if the task is completed'
    }
  })
})

var promiseListAll = () => {
  return new Promise((resolve, reject) => {
    Employee.find((err, todos) => {
      if (err) reject(err)
      else resolve(todos)
    })
  })
}

var QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    employeeList: {
      type: new GraphQLList(EmployeeType),
      resolve: () => {
        return promiseListAll()
      }
    }
  })
})

var MutationAddEmployee = {
  type: EmployeeType,
  description: 'Add Employee',
  args: {
    firstName: {
      name: 'Employee first name',
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      name: 'Employee Last Name',
      type: new GraphQLNonNull(GraphQLString)
    },
    middleName:{
      name: 'Middle Name',
      type: new GraphQLNonNull(GraphQLString)
    },
    bank:{
     name: 'Bank Details',
      type: EmployeeINBankType
    },
    academic:{
      name:"academic details",
      type : new GraphQLList(EmployeeINAcedmicType)
    }
  },
  resolve: (root, args) => {
    var newEmployee = new Employee(args);
    newEmployee.employeeObjectId = newEmployee._id
    return new Promise((resolve, reject) => {
      newEmployee.save(function (err) {
        if (err) reject(err)
        else resolve(newEmployee)
      })
    })
  }
}
var MutationUpdateEmployee = {
  type: EmployeeType,
  description: 'Add Employee',
  args: {
    employeeObjectId:{
      name:"Employee ID",
      type : new GraphQLNonNull(GraphQLID)
    },
    firstName: {
      name: 'Employee first name',
      type: GraphQLString
    },
    lastName: {
      name: 'Employee Last Name',
      type: GraphQLString
    },
    middleName:{
      name: 'Middle Name',
      type: GraphQLString
    },
    bank:{
     name: 'Bank Details',
      type: EmployeeINBankType
    },
    academic:{
      name:"academic details",
      type : new GraphQLList(EmployeeINAcedmicType)
    }
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      Employee.findOneAndUpdate({_id:args.employeeObjectId},args,{"new":true},function (err,data) {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
}




var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployee: MutationAddEmployee,
    updateEmployee: MutationUpdateEmployee
  }
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
