import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);

const Long = mongoose.Schema.Types.Long;

const Student = mongoose.model('Student', new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  guardians: {
    name: {
      type: "String",
      required: true
    },
    contact: {
      type: Long,
      required: true,
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