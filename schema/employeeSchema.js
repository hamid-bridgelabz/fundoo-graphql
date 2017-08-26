var mongoose = require('mongoose')
var Schema = mongoose.Schema

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


module.exports = {
	Employee:Employee
};