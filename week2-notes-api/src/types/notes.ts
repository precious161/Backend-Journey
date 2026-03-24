
export interface Note{
  id:string
  title: string
  content?: string
  createdAt: string
  updatedAt: string
}

export interface createNote{
  title:string
  content?: string
}

export interface qQuery{
  q?: string
}
