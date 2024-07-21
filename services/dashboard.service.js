const { sql } = require("../db/config/db.config");
const TaskModel = require("../db/models/Task.model");

const addTask = async (body) => {
  const task = await TaskModel.create(body);
  return task;
};

const getTasks = async (sortOption, searchTerm) => {
    let orderBy;
    switch (sortOption) {
        case 'createdAsc':
            orderBy = 'created_at ASC';
            break;
        case 'createdDesc':
            orderBy = 'created_at DESC';
            break;
        case 'updatedAsc':
            orderBy = 'updated_at ASC';
            break;
        case 'updatedDesc':
            orderBy = 'updated_at DESC';
            break;
        default:
            orderBy = 'created_at DESC';
    }

    const query = `
    SELECT status,
           json_agg(
             json_build_object(
               'description', description,
               'title', title,
               'status', status,
               'id', id,
               'createdAt', created_at,
               'updatedAt', updated_at
             ) ORDER BY ${orderBy}
           ) as cards
    FROM task
    WHERE is_delete = false
      AND (title ILIKE :searchTerm OR description ILIKE :searchTerm)
    GROUP BY status;
    `;
    
    try {
        const results = await sql.query(query, {
            replacements: { searchTerm: `%${searchTerm}%` },
            type: sql.QueryTypes.SELECT
        });
        return results;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

const updateTask = async (body) => {
  const { id, title, description } = body;
  const task = await TaskModel.update(
    {
      title: title,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return task;
};

const updateStatus = async (body) => {
    const { id, status } = body;
    const task = await TaskModel.update(
      {
        status : status
      },
      {
        where: {
          id: id,
        },
      }
    );
    return task;
  };

const deleteTask = async (id) => {
  const task = await TaskModel.update(
    {
      is_delete: true,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return task;
};

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  updateStatus,
  getTasks
};
