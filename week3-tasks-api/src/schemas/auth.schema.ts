
export const registerSchema={
  body:{
    type: "object",
    required: ["email","name","password"],
    properties:{
      email : {type: 'string', format:'email'},
      name: { type: 'string'},
      password: { type:'string', minLength:8}
    }
  },
  response:{
    201:{
      type:"object",
      properties:{
      id: { type: 'number'},
      email : {type: 'string'},
      name: { type: 'string'},
      }
    },
  }
};

export const loginSchema={
  body:{
    type: "object",
    required: ["email","password"],
    properties:{
      email: { type: 'string', format: 'email'},
      password: { type: 'string'}
    }
  },
  response:{
    200:{
      type: "object",
      properties:{
        token: { type: 'string'},
        user:{
          type: 'object',
          properties:{
              id: { type: 'number'},
              email : {type: 'string'},
              name: { type: 'string'},
          }

        }

      }
    },
    401:{
      type: "object",
      properties:{
        message: { type: 'string'},
        error: { type: 'string'}
      }
    }
  }
}