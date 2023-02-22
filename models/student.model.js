import mongoose from 'mongoose';

mongoose.pluralize(null);

const Student = mongoose.model('student', new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  guardians: {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    relation: {
      type: String
    }
  },
  attendance: {
    overall: [
      {
        sub_code: {
          type: String,
          required: true
        },
        attendance: {
          type: Number,
          required: true
        }
      }
    ],
    todays_attendance: {
      date: Date,
      value: [
        {
          sub_code: {
            type: String,
            required: true
          },
          time: {
            type: String,
            required: true
          },
          attendance: {
            type: Boolean,
            required: true
          },
          type: {
            type: String,
            enum: ['L', 'T', 'P']
          }
        }
      ]
    }
  }
}));

export default Student;