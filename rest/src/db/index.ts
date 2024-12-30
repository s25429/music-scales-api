import type { Instrument, Note, Scale, Tuning } from 'types/api'
import type { InstrumentDoc, NoteDoc, ScaleDoc, TuningDoc } from 'types/db'

import { CrudCollection } from './crud'
import model from './model'

export default {
  notes: new CrudCollection<Note, NoteDoc>('notes', model.Notes),
  instruments: new CrudCollection<Instrument, InstrumentDoc>('instruments', model.Instruments),
  tunings: new CrudCollection<Tuning, TuningDoc>('tunings', model.Tunings),
  scales: new CrudCollection<Scale, ScaleDoc>('scales', model.Scales),
}