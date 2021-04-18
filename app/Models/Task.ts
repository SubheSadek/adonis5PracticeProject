import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// import User from './User'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public user_id: number
  
  @column()
  public task_name: string
  
  @column()
  public task_title: string
  
  @column()
  public task_desc: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  // @belongsTo(() => User)
  // public user:BelongsTo<typeof User>
  
}
