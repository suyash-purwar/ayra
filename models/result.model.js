import mongoose from 'mongoose';

mongoose.pluralize(null);

const Result = mongoose.model('result', new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  overall_cgpa: {
    type: String
  },
  semester_result: [
    {
      semester: {
        type: Number,
        // required: true
      },
      tgpa: {
        type: Number,
        // required: true
      },
      marks: [
        {
          sub_code: {
            type: String,
            // required: true
          },
          grade: {
            type: String,
            enum: ['A', 'B', 'C', 'D', 'E', 'F'],
            // required: true
          },
          value: {
            CA: {
              type: Number,
              // required: true,
            },
            MTE: {
              type: Number,
              // required: true
            },
            ETE: {
              type: Number,
              // required: true
            },
            ATTENDANCE: {
              type: Number
            }
          },
          total_marks: {
            type: Number
          }
        }
      ]
    }
  ]
}));

export default Result;