require('dotenv').config();
const express = require('express');

const Member = require('../models/database');

const MulterUpload = require('../multerUploads');
const EmployeeModel = require('../../models/firm/employeeModel');

/** image deletion packages, for duplicate image */
const fs = require("fs");
const { promisify } = require("util");
const deleteImageFile = promisify(fs.unlink);
/** image deletion packages, for duplicate image */

const router = express.Router();


/////////////////////////
//   create employee   //
/////////////////////////

router.post('/createMember', MulterUpload.any(), async (req, res) => {
    try {
        const { name, address, taluka, district, pin, mobile, email, gender, blood, qualification, reference, what_you_can_do, company, aadhar } = await req.body;
        const avatar = (await req.file) ? await req.file.filename : `defaultImage.png`;

        const isMemberExist = (await Member.findOne(mobile));

        if (isMemberExist.length > 0) {
            if (req.file) {
                await deleteImageFile(req.file.path);
            }
            return res.status(500).json({
                success: false,
                info: `oops, member already exist !`,
                data: isMemberExist[0].member_id
            });
        } else {
            const member = await Member.save(
                name, address, taluka, district, pin, mobile, email, gender, blood, qualification, reference, what_you_can_do, company, avatar, aadhar
            )

            if (emp_id > 0) {
                return res.status(200).json({
                    success: true,
                    info: `created new member !`,
                    data: emp_id
                });
            } else {
                return res.status(500).json({
                    success: false,
                    info: `oops, member not created !`,
                    data: emp_id
                });
            }
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
});



/////////////////////////
//  employ searchlist  //
/////////////////////////

router.post('/searchEmployee', async (req, res) => {
    try {
        const { queryString } = await req.body;

        const employeesList = (await EmployeeModel.searchEmployee(queryString)).rows;

        if (employeesList.length > 0) {
            return res.status(200).json({
                success: true,
                info: `results matching employee !`,
                data: employeesList
            });
        } else {
            return res.status(500).json({
                success: false,
                info: `oops, employee not found !`,
                data: employeesList
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            info: `error : ${err.message}`,
            data: []
        });
    }
});




module.exports.router = router;