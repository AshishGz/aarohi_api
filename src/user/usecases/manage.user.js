import bcrypt from "bcrypt";

import {isEmpty, uuid} from "../../platforms/utils/common.js";
import Boom from "@hapi/boom";
import userModel from "../user.model.js";


export const add = async (payload) => {
    try {
        const {email, password, role, name, profile_picture,business_state,name_nepali,phone_number,cohort_id} = payload ?? {};
        const isDuplicate = await userModel.query().select('*').where('email', email);


        if (!isEmpty(isDuplicate)) {
            throw Boom.notFound("Email already exists. Please try with another email.");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await userModel.query().insert({
            id: uuid(),
            email,
            profile_picture,
            name,
            role,
            business_state,
            name_nepali,
            phone_number,
            cohort_id,
            password: hashedPassword,
            create_date: new Date().toISOString(),
            update_date: new Date().toISOString(),
        });


        return {
            status: 200, success: true, message: "User Added Successfully!!",
        };
    } catch (err) {
        throw err;
    }
};

export const update = async (id, payload) => {
  try {
    const { name, profile_picture } = payload ?? {};

    const existingUser = await userModel.query().findById(id);
    if (isEmpty(existingUser)) {
      throw Boom.notFound("User not found.");
    }

    const updates = {

      profile_picture,
      name,

      update_date: new Date().toISOString(),
    };


    await userModel.query().findById(id).patch(updates);

    return {
      status: 200,
      success: true,
      message: "User updated successfully!",
    };
  } catch (err) {
    throw err;
  }
};
export const remove = async (id) => {
  try {
    const existingUser = await userModel.query().findById(id);
    if (isEmpty(existingUser)) {
      throw Boom.notFound("User not found.");
    }

    await userModel.query().deleteById(id);

    return {
      status: 200,
      success: true,
      message: "User deleted successfully!",
    };
  } catch (err) {
    throw err;
  }
};
export const changeRole = async (id, newRole) => {
    try {
        const existingUser = await userModel.query().findById(id);
        if (isEmpty(existingUser)) {
            throw Boom.notFound("User not found.");
        }

        await userModel.query().findById(id).patch({
            role: newRole,
            update_date: new Date().toISOString(),
        });

        return {
            status: 200,
            success: true,
            message: "User role updated successfully!",
        };
    } catch (err) {
        throw err;
    }
};

export const updatePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await userModel.query().findOne({ email });

        if (isEmpty(user)) {
            throw Boom.notFound("User not found.");
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw Boom.unauthorized("Old password does not match.");
        }

        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        await userModel.query().patchAndFetchById(user.id, {
            password: hashedNewPassword,
            update_date: new Date().toISOString(),
        });

        return {
            status: 200,
            success: true,
            message: "Password updated successfully!",
        };
    } catch (err) {
        throw err;
    }
};
export const list = async (pageNumber = 1, limit = 10, role = null) => {
    try {
        const offset = (pageNumber - 1) * limit;

        const query = userModel.query();

        if (role) {
            query.where('role', role);
        }

        const [users, total] = await Promise.all([
            query.clone()
                .select(
                    'userInfo.id',
                    'userInfo.email',
                    'userInfo.name',
                    'userInfo.role',
                    'userInfo.profile_picture',
                    'userInfo.create_date',
                    'userInfo.lastactivityat',
                    'userInfo.business_state',
                    'userInfo.name_nepali',
                    'userInfo.cohort_id',
                    'userInfo.phone_number',
                    'cohorts.name as cohort_name'
                )
                .leftJoin('cohorts', 'userInfo.cohort_id', 'cohorts.id')
                .offset(offset)
                .limit(limit)
                .orderBy('userInfo.create_date', 'desc'),
            query.clone().count('userInfo.id as count').first()
        ]);

        return {
            status: 200,
            success: true,
            data: users,
            pagination: {
                total: total.count,
                page: pageNumber,
                limit,
                totalPages: Math.ceil(total.count / limit),
            },
        };
    } catch (err) {
        throw err;
    }
};
export const getById = async (id) => {
    try {
        const user = await userModel.query().select('id', 'email', 'name', 'role', 'profile_picture', 'create_date','lastactivityat','business_state','name_nepali','cohort_id','phone_number').findById(id);

        if (isEmpty(user)) {
            throw Boom.notFound("User not found.");
        }

        // Optional: exclude password from the response
        const { password, ...safeUser } = user;

        return {
            status: 200,
            success: true,
            data: safeUser,
        };
    } catch (err) {
        throw err;
    }
};

export const getUserStats = async () => {
    const now = new Date();
    const past7Days = new Date(now.setDate(now.getDate() - 7)).toISOString();

    const [totalUsers, activeUsers, mentors, mentees] = await Promise.all([
        userModel.query().count('id as count').first(),
        userModel.query().where('lastactivityat', '>=', past7Days).count('id as count').first(),
        userModel.query().where('role', 'mentor').count('id as count').first(),
        userModel.query().where('role', 'mentee').count('id as count').first(),
    ]);

    return {
        totalUsers: parseInt(totalUsers.count, 10),
        activeUsers: parseInt(activeUsers.count, 10),
        mentors: parseInt(mentors.count, 10),
        mentees: parseInt(mentees.count, 10),
    };
};






