import { Student } from '@ayra/lib/db/index.js';
import { Op } from 'sequelize';

const authenticate = async (req, res, next) => {
  const message = req.body.entry[0].changes[0].value;

  // This condition is in place so that
  // the identity of only whatsapp client is checked.
  // Whatsapp status requests don't need to be authenticated.
  if (message.statuses) return next();

  // Authenticate messages from the whatsapp client
  let recipient = message.contacts[0].wa_id;
  const student = await Student.findOne({
    where: {
      [Op.or]: [
        { fatherContact: recipient },
        { motherContact: recipient }
      ]
    },
  });
  
  // Ideally 401 status code should've been sent.
  // Status 200 is sent so that whatsapp server does not
  // keep polling our server for the response
  if (!student) {
    console.log("You are not authorized");
    return res.sendStatus(200);
  }
  
  delete student.dataValues.createdAt;
  delete student.dataValues.updatedAt;
  
  // console.log(student.dataValues);

  req.body.student = student.dataValues;

  next();
};

export default authenticate;