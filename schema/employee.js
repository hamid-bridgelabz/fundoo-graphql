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

mongoose.Promise = Promise;
// Mongoose Schema definition
var Employee = mongoose.model('employee', new Schema({
  employeeObjectId: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    trim: true,
    default: ""
  },
  middleName: { // No earlier existance, New implementation - 11th April 2017
    type: String,
    trim: true,
    required: false,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    required: false,
    default: ""
  },
  academic:[{
    isDiploma: {
      type: Boolean,
      default: false
    },
    isDegree: {
      type: Boolean,
      default: false
    },
    qualification: {
      type: String,
      trim: true,
      default: ""
    },
    university: {
      type: String,
      trim: true,
      default: ""
    },
    collage: {
      type: String,
      trim: true,
      default: ""
    },
    discipline: {
      type: String,
      trim: true,
      default: ""
    },
    aggregatePercentage: {
      type: Number,
      default: 0
    },
    finalYearPercentage: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    yearOfPassing: {
      type: Date,
      default: null
    },
    comments: {
      type: String,
      default: ""
    }
  }],
  verified:{
    type:Boolean,
    default:false
  }

}))

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
mongoose.createConnection(process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT, function (error) {
  if (error) console.error(error)
  else console.log('mongo connected')
})
/** END */

var EmployeeBankType = new GraphQLObjectType({
  name: 'bankDetails',
  fields: () => ({
    bankName: {
      type: GraphQLString,
      description: 'Employee first name'
    },
    accountNumber:{
      type: GraphQLString,
      description: 'Employee last name'
    },
    ifscCode:{
      type: GraphQLString,
      description: 'Employee middle name'
    },
    panNumber: {
      type: GraphQLString,
      description: 'PAN Number name'
    },
    payStipend: {
      type: GraphQLBoolean,
      description: 'Employee pay'
    }
  })
});
var EmployeeOPAcedmicType = new GraphQLObjectType({
name: 'acedmicOPDetails',
  fields: () => ({
      isDiploma: {
            type: GraphQLBoolean,
            description:"isDiploma or not"
          },
          isDegree: {
            type: GraphQLBoolean,
            default:false,
            description:"isDegree or not"
          },
          qualification: {
            type: GraphQLString,
            description: "course name "
          },
          university: {
            type: GraphQLString,
            description:"university name"
          },
          collage: {
            type: GraphQLString,
            description:"collage name"
          },
          discipline: {
            type: GraphQLString,
            description:"discipline eg:CS, COMP,MECH"
          },
          aggregatePercentage: {
            type: GraphQLFloat,
            description:"aggregate Percentage"
          },
          finalYearPercentage: {
            type: GraphQLFloat,
            description:"final year Percentage"
          },
          startDate: {
            type: GraphQLDate,
            description :"start Date"
          },
          endDate: {
            type: GraphQLDate,
            description :"end date"
          },
          yearOfPassing: {
            type: GraphQLString,
            description:"year of passing"
          },
          comments: {
            type: GraphQLString,
            description : "comments"
          }
      })
});
var EmployeeINAcedmicType = new GraphQLInputObjectType({
  name: 'acedmicINDetails',
  fields: () => ({
      isDiploma: {
            type: GraphQLBoolean,
            description:"isDiploma or not"
          },
          isDegree: {
            type: GraphQLBoolean,
            description:"isDegree or not"
          },
          qualification: {
            type: GraphQLString,
            description: "course name "
          },
          university: {
            type: GraphQLString,
            description:"university name"
          },
          collage: {
            type: GraphQLString,
            description:"collage name"
          },
          discipline: {
            type: GraphQLString,
            description:"discipline eg:CS, COMP,MECH"
          },
          aggregatePercentage: {
            type: GraphQLFloat,
            description:"aggregate Percentage"
          },
          finalYearPercentage: {
            type: GraphQLFloat,
            description:"final year Percentage"
          },
          startDate: {
            type: GraphQLDate,
            description :"start Date"
          },
          endDate: {
            type: GraphQLDate,
            description :"end date"
          },
          yearOfPassing: {
            type: GraphQLString,
            description:"year of passing"
          },
          comments: {
            type: GraphQLString,
            description : "comments"
          }
      })
  });
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
    // bank:{
    //  name: 'Bank Details',
    //   type: EmployeeBankType
    // },
    academic:{
      name:"academic details",
      type : new GraphQLList(EmployeeINAcedmicType)
    }
  },
  resolve: (root, args) => {
    console.log(JSON.stringify(args,0,4));
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


// var MutationDestroy = {
//   type: TodoType,
//   description: 'Destroy the todo',
//   args: {
//     id: {
//       name: 'Todo Id',
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   },
//   resolve: (root, args) => {
//     return new Promise((resolve, reject) => {
//       TODO.findById(args.id, (err, todo) => {
//         if (err) {
//           reject(err)
//         } else if (!todo) {
//           reject('Todo NOT found')
//         } else {
//           todo.remove((err) => {
//             if (err) reject(err)
//             else resolve(todo)
//           })
//         }
//       })
//     })
//   }
// }

// var MutationToggleAll = {
//   type: new GraphQLList(TodoType),
//   description: 'Toggle all todos',
//   args: {
//     checked: {
//       name: 'Todo Id',
//       type: new GraphQLNonNull(GraphQLBoolean)
//     }
//   },
//   resolve: (root, args) => {
//     return new Promise((resolve, reject) => {
//       TODO.find((err, todos) => {
//         if (err) {
//           reject(err)
//           return
//         }
//         TODO.update({
//           _id: {
//             $in: todos.map((todo) => todo._id)
//           }
//         }, {
//           completed: args.checked
//         }, {
//           multi: true
//         }, (err) => {
//           if (err) reject(err)
//           else promiseListAll().then(resolve, reject)
//         })
//       })
//     })
//   }
// }

// var MutationClearCompleted = {
//   type: new GraphQLList(TodoType),
//   description: 'Clear completed',
//   resolve: () => {
//     return new Promise((resolve, reject) => {
//       TODO.find({completed: true}, (err, todos) => {
//         if (err) {
//           reject(err)
//         } else {
//           TODO.remove({
//             _id: {
//               $in: todos.map((todo) => todo._id)
//             }
//           }, (err) => {
//             if (err) reject(err)
//             else resolve(todos)
//           })
//         }
//       })
//     })
//   }
// }

// var MutationSave = {
//   type: TodoType,
//   description: 'Edit a todo',
//   args: {
//     id: {
//       name: 'Todo Id',
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     title: {
//       name: 'Todo title',
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   },
//   resolve: (root, args) => {
//     return new Promise((resolve, reject) => {
//       TODO.findById(args.id, (err, todo) => {
//         if (err) {
//           reject(err)
//           return
//         }

//         if (!todo) {
//           reject('Todo NOT found')
//           return
//         }

//         todo.title = args.title
//         todo.save((err) => {
//           if (err) reject(err)
//           else resolve(todo)
//         })
//       })
//     })
//   }
// }

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployee: MutationAddEmployee
  }
})
// ,
//     toggle: MutationToggle,
//     toggleAll: MutationToggleAll,
//     destroy: MutationDestroy,
//     clearCompleted: MutationClearCompleted,
//     save: MutationSave
module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
