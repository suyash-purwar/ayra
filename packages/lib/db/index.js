import Student from './models/student.model.js';
import Hostel from "./models/hostel.model.js";
import Subject from "./models/subject.model.js";
import Mentor from './models/mentor.model.js';
import Department from './models/department.model.js';
import Course from './models/course.model.js';
import OverallAttendance from "./models/overall-attendance.model.js";
import Attendance from "./models/attendance.model.js";
import HourSlot from "./models/hour-slot.model.js";
import Result from './models/result.model.js';

import sequelize from './connect.js';

export {
  Student,
  Hostel,
  Subject,
  Mentor,
  Department,
  Course,
  OverallAttendance,
  Attendance,
  HourSlot,
  Result
};

export default sequelize;