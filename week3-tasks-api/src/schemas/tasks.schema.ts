const errorResponse = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    error: { type: 'string' }
  }
};

export const createTaskSchema = {
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string', enum: ['OPEN', 'IN_PROGRESS', 'DONE'] },
      dueDate: { type: 'string', format: 'date-time' },
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      }
    },
    400: errorResponse,
    401: errorResponse
  }
};


export const getTasksSchema = {
  querystring: {
    type: 'object',
    properties: {
      status: { type: 'string', enum: ['OPEN', 'IN_PROGRESS', 'DONE'] }
    }
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' },
          title: { type: 'string' },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      }
    },
    401: errorResponse
  }
};


export const getTaskByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    },
    401: errorResponse,
    403: errorResponse,
    404: errorResponse
  }
};

export const updateTaskSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string', enum: ['OPEN', 'IN_PROGRESS', 'DONE'] }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    },
    400: errorResponse,
    401: errorResponse,
    403: errorResponse,
    404: errorResponse
  }
};

export const deleteTaskSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  response: {
    204: { type: 'null' },
    401: errorResponse,
    403: errorResponse,
    404: errorResponse
  }
};