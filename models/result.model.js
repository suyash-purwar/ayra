import mongoose from 'mongoose';

const Result = mongoose.model('Result', new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  overall_cgpa: {
    type: String
  },
  semester_result: [
    {
      semester: {
        type: Number,
        required: true
      },
      tgpa: {
        type: Number,
        required: true
      },
      marks: [
        {
          sub_code: {
            type: String,
            required: true
          },
          grade: {
            type: String,
            enum: ['A', 'B', 'C', 'D', 'E', 'F'],
            required: true
          },
          value: {
            CA: {
              type: Number,
              required: true,
            },
            MTE: {
              type: Number,
              required: true
            },
            ETE: {
              type: Number,
              required: true
            },
            ATTENDANCE: {
              type: Number,
              required: true
            }
          },
          total_marks: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ]
}));

export default Result;