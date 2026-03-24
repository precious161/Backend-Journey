
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