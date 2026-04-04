
export const createTaskSchema={
  body:{
    type:'object',
    required:['title'],
    properties:{
      title: { type: 'string'},
      description: { type: 'string'},
      status: {
        type :'string',
        enum: ['OPEN','IN_PROGRESS','DONE']
      },
      dueDate:{ type: 'string',format:'date-time'},
    }
  },
  response:{
    201:{
      type:'object',
       properties:{
         id: { type: 'integer'},
         title: { type: 'string'},
         description: { type: 'string'},
         status: { type :'string'},
         createdAt: { type: 'string',format:'date-time'},
      }
    },
    404:{
      type: 'object',
      properties:{
        error: { type: 'string'},
        message: { type: 'string'}
      }
    }
  }
};


export const taskParamsSchema={
   params:{
    type: 'object',
    required: ['id'],
    properties:{
      id: { type: 'integer'}
    }
   }
}

export const taskQuerySchema={
  querystring:{
    type:'object',
    properties:{
      status:{ type: 'string',enum:['OPEN','IN_PROGRESS','DONE']}
    }
  }
}

export const updateTaskSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' }
    }
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      status: {
        type: 'string',
        enum: ['OPEN', 'IN_PROGRESS', 'DONE']
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        status: { type: 'string' }
      }
    }
  }
};

export const deleteTaskSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' }
    }
  },
  response: {
    204: {
      type: 'null',
      description: 'Task deleted successfully'
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
};