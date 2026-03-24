
export const createNoteSchema={
body:{
  type: 'object',
  required: ['title'],
  properties:{
    title: {type: 'string'},
    content: { type: 'string'}
  }
},
response:{
  201:{
    type: 'object',
    properties:{
      id:{type: 'string'},
      title: { type: 'string'},
      content: { type: 'string'},
      createdAt: { type : 'string'},
      updatedAt: { type: 'string'}
    }
  }
}

};

export const createQuerystringSchema={
querystring:{
  type: 'object',
  properties:{
    q: {type: 'string'}
  }
},
response:{
   200:{
    type: 'array',
    items:{
    type:'object',
     properties:{
      id:{type: 'string'},
      title: { type: 'string'},
      content: { type: 'string'},
      createdAt: { type : 'string'},
      updatedAt: { type: 'string'}
    }
   }
   }
}
};