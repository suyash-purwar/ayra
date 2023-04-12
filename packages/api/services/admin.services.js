import { Student } from "@ayra/lib/db/index.js";
import * as metaApi from "./../apis/meta.api.js";

export const postUMC = async (id, reason, conclusion) => {
  const student = await Student.findOne({ id }, 'name contact guardians.name');
  const msg = `
Respected ${student.guardians.name},

It is being brought to your attention that an indisciple case has been filed against your child, ${student.name} for not adhereing to university's guidelines.

Reason for Indiscipline Case: ${reason}

Punishment/Fine: ${conclusion}

For any queries, contact Security Office.
Contact: +91 9747273623
  `
  await metaApi.sendTextMessage(student.contact, msg);
};