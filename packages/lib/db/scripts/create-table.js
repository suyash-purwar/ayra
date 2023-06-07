import HOD from '../models/hod.model.js';
import Section from '../models/section.model.js';

await HOD.sync();
await Section.sync();

// import Attedance from '../models/attendance.model.js';
// import Course from '../models/course.model.js';
// import Department from '../models/department.model.js';
// import HostelLeave from '../models/hostel-leave.model.js';
// import Hostel from '../models/hostel.model.js';
// import Mentor from '../models/mentor.model.js';
// import OverallAttendance from '../models/overall-attendance.model.js';
// import Result from '../models/result.model.js';
// import Student from '../models/student.model.js';
// import Subject from '../models/subject.model.js';
// import UMC from '../models/umc.model.js';
// import Warden from '../models/warden.model.js';
// import CourseSubject from '../models/course-subject.model.js';
// import HourSlot from '../models/hour-slot.model.js';
// import Query from '../models/query.model.js';

// await Query.sync({ force: true });11
// await Attedance.sync({ alter: true });
// await Course.sync({ alter: true });
// await Department.sync();
// await HostelLeave.sync();
// await Hostel.sync({ alter: true });
// await Mentor.sync();
// await OverallAttendance.sync({ alter: true });
// await Result.sync({ force: true });
// await Student.sync({ alter: true });
// await Subject.sync()
// await UMC.sync();
// await Warden.sync({ alter: true });
// await CourseSubject.sync();
// await HourSlot.sync();
