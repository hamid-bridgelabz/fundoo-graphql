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

var EmployeeINBankType = new GraphQLInputObjectType({
  name: 'bankINDetails',
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


module.exports = {
	EmployeeINAcedmicType:EmployeeINAcedmicType,
	EmployeeOPAcedmicType:EmployeeOPAcedmicType,
	EmployeeINBankType:EmployeeINBankType,
	EmployeeBankType:EmployeeBankType
}