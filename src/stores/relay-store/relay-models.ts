import { Instance, types } from 'mobx-state-tree'

export const EventModel = types.model('Event').props({
  content: types.frozen(),
  created_at: types.number,
  kind: types.number,
  id: types.identifier,
  pubkey: types.string,
  sig: types.string,
  tags: types.frozen(),
})

export interface Event extends Instance<typeof EventModel> {}
